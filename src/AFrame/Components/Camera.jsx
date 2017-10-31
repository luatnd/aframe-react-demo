import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../../base/redux/dispatch';
import { Entity } from 'aframe-react';

import ConsoleLogger from '../../Helper/ConsoleLogger';
import { setSceneInstance, updateCameraStatus, setSceneEnterVRCallBack } from '../MySceneRedux';
import { showDialog } from '../../VR_InteractionUI/Dialog/DialogRedux';


const globalCamYPos = 100;
const globalCamXRot = -90;
const camNatureYPos = 2;
const camNatureXRot = 0;

@connect(
  state => ({}),
  getDispatchMapper({
    updateCameraStatus,
    showDialog,
  })
)
export default class Camera extends React.PureComponent {
  static propTypes = {
  
  }
  
  state = {
    cameraPhysically: false,
    cameraPos: `0 ${globalCamYPos} 0`,
    cameraRot: `${globalCamXRot} 0 0`,
    needInitialAnimate: true,
    timestamp:0,
  }
  
  /**
   * NOTE: react ele and aframe ele is distinct, so plz carefully when get ele from react `ref`
   */
  cameraInstance = null;
  cameraCanReset = true; // Avoid calling multiple camera reset
  
  setStateWithTimestamp = (state) => {
    this.setState({...state, timestamp: new Date().getTime()})
  }
  
  componentDidMount() {
    this.trackCameraCollide();
    this.trackCameraPosition();
  }

  componentWillUnMount() {
    this.cameraInstance.el.removeEventListener('collide');
    this.cameraInstance.el.removeEventListener('componentchanged');
  }
  
  trackCameraCollide = () => {
    if (!this.cameraInstance) {
      return;
    }
    
    // NOTE: addEventListener for aFrame element, not React element, so that do not forget `.el`
    // Read more about this listener: https://github.com/donmccurdy/aframe-physics-system#collision-events
    this.cameraInstance.el.addEventListener('collide', (e) => {
      let detail = e.detail;
      
      const touchedPos = detail.contact.ni;
      const targetEle = detail.body.el;
      const className = targetEle.className || targetEle.getAttribute('classname') || targetEle.getAttribute('id');
      
      console.log(
        '[Camera] Player has collided with: #' + e.detail.body.id,
        className ? targetEle.localName + '.' + className : targetEle,
        ` at x: ${touchedPos.x.toFixed(4)}, y: ${touchedPos.y.toFixed(4)}, z: ${touchedPos.z.toFixed(4)}`
      );
    });
  }
  
  setAframeElePhysic = (enable) => {
    if (!this.cameraInstance) {
      console.log("this.cameraInstance null");
      return;
    }
    
    if (enable) {
      this.cameraInstance.el.setAttribute('kinematic-body', "radius:0.5");
      this.cameraInstance.el.setAttribute('jump-ability', true);
    } else {
      this.cameraInstance.el.removeAttribute('kinematic-body');
      this.cameraInstance.el.removeAttribute('jump-ability');
    }
  }
  
  setEleComponentAttr = (component, attribute, value) => {
    const data = this.cameraInstance.el.components[component].data;
    data[attribute] = value;
  }
  
  /**
   * TODO: Change to handle all by Aframe
   */
  resetCamera = (wasFallen = true) => {
    if (this.cameraCanReset) {
      this.cameraCanReset = false; // Disallow another attempt
    } else {
      return;
    }
  
    this.setAframeElePhysic(false);
    this.setEleComponentAttr('position', 'y', camNatureYPos);
    this.setEleComponentAttr('rotation', 'x', camNatureXRot);
    
    if (wasFallen) {
      // TODO: Ask before reset --> Need confirm before reset
      this.props.showDialog({
        message: <span>But you've just done a teleport to initial position</span>
      });
    }
    
    this.setStateWithTimestamp({
      needInitialAnimate: false,
      cameraPhysically: false,
      cameraPos: `0 ${camNatureYPos} 0`,
      cameraRot: `${camNatureXRot} 0 0`,
    });
    
    setTimeout(() => {
      ConsoleLogger.log('settimeout', 'resetCamera', 'color:red');
      
      this.cameraCanReset = true;  // Re-allow another attempt
  
      this.setEleComponentAttr('position', 'y', camNatureYPos);
      this.setEleComponentAttr('rotation', 'x', camNatureXRot);
      
      // Camera fall to fast
      this.setAframeElePhysic(true);
      this.setState({
        cameraPhysically: true,
      });
      
      
    }, wasFallen ? 600 : 300); // 1/24 frames
  }
  
  trackCameraPosition = () => {
    if (!this.cameraInstance) {
      return;
    }
    
    const CONSIDER_FALLING_TOP_Y_TOP = 3; // User falling down to 4m-20m then he stand on the floor
    const CONSIDER_FALlING_YPOS = -100;
    
    // NOTE: addEventListener for aFrame element, not React element, so that do not forget `.el`
    this.cameraInstance.el.addEventListener('componentchanged', (e) => {
      
      // Track position
      if (e.detail.name === 'position') {
        let y = e.detail.newData.y;
        console.log("y: ", y);
        
        if (this.state.needInitialAnimate && y < CONSIDER_FALLING_TOP_Y_TOP) {
          ConsoleLogger.log('Camera reach the physical zone', 'MyScene: Camera');
          this.resetCamera(false);
        }
        
        else if (this.cameraCanReset && y < CONSIDER_FALlING_YPOS) {
          ConsoleLogger.log('Camera fallen, attempt to restore the initial position', 'MyScene: Camera', 'color:green');
          this.resetCamera(true);
        }
      }
      // End track position
    });
  }
  
  render() {
    ConsoleLogger.log('render', 'Camera', 'color:purple');
    
    const {cameraPos, cameraRot, needInitialAnimate, cameraPhysically} = this.state;
    
    console.log("cameraPhysically: ", cameraPhysically);
    if (this.cameraInstance) {
      console.log("this.cameraInstance.el.components.position.data: ", this.cameraInstance.el.components.position.data);
    }
    
    const camPhysicalAttr = cameraPhysically ? {'kinematic-body': "radius:0.5", 'jump-ability': true} : {};
    
    return (
      <Entity
        className="camera" ref={reactEle => this.cameraInstance = reactEle}
        camera="userHeight: 2; fov: 80;" // Assuming I'm 1.8m height, And the normal human fov is ~80
        //look-controls // Can look around by mouse / turn your head
        //wasd-controls // Can use keyboard to move
        position={cameraPos} // Initial standing position
        rotation={cameraRot}
        //velocity
        
        {...camPhysicalAttr}
        
        //kinematic-body="radius:0.5" // The kinematic-body component isn't compatible with wasd-controls (from DonMcCurdy)
        //kinematic-body
        universal-controls // replace look-controls and wasd-controls
        //gamepad-controls
        //keyboard-controls
        touch-controls
        hmd-controls
        mouse-controls
      >
        <a-cursor material="color: #ccc; shader: flat"/>
        {/* TODO: Make near/far limit, current: Can not click the box if more than 5m far */}
        
        {needInitialAnimate && [
          <a-animation attribute="position" key="position"
                       from={`0 ${globalCamYPos} 0`} to={`0 ${camNatureYPos} 0`}
                       delay="0" dur="8000" repeat="0" direction="normal"
          />,
          <a-animation attribute="rotation" key="rotation"
                       from={`${globalCamXRot} 0 0`} to={`${camNatureXRot} 0 0`}
                       delay="4000" dur="4000" repeat="0" direction="normal"
          />,
        ]}
      </Entity>
    );
  }
}
