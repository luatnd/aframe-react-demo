import React from 'react';
import 'aframe';
import 'aframe-always-fullscreen-component';
import 'platform';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../base/redux/dispatch';

//import '@gladeye/aframe-preloader-component'; // TODO: Add new type=material-ui for this component
//import './Components/AssetsLoading'; // TODO: make aframe-react compoent for tracking this info
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

import ConsoleLogger from '../Helper/ConsoleLogger';
import {setSceneInstance, updateCameraStatus, CameraStatus, setSceneEnterVRCallBack} from './MySceneRedux';
import {showDialog} from '../VR_InteractionUI/Dialog/DialogRedux';

import {AssetsLoading} from './Assets/AssetsLoading';
import FloorAndWall from './FloorAndWall/FloorAndWall';
import {PlaceholderFloor} from './FloorAndWall/PlaceholderFloor';
import {Workspace} from './Workspace/Workspace';
import {BackWall} from './Decorator/BackWall';
import {FrontSea} from './Decorator/FrontSea';
import {Center} from './Decorator/Center';
import Sky from './Sky/Sky';
import {Light} from './Light/Light';

//import Assets from './Assets/Assets';
import Assets from 'aframe-react-assets';
import { registeredAssets } from './Assets/AssetsRegister';

/**
 * Aframe Scene
 *
 * TODO:
 *    * Build another boiler plate base on webpack 2
 *    * Migrate camera to a new component
 *    * Asset status to Redux
 *    * Show screen content on ready
 */

let globalCamYPos = 100;
let globalCamXRot = -90;

@connect(
  state => {
    const {stats} = state.appSetting.options;
  
    return {stats}
  },
  getDispatchMapper({
    setSceneInstance,
    setSceneEnterVRCallBack,
    updateCameraStatus,
    showDialog,
  })
)
export class MyScene extends React.Component {
  static propTypes = {
    setSceneEnterVRCallBack: PropTypes.func,
  }

  state = {
    assetsLoading: true,
    assetLoaded: 0,
    assetTotal: 1,
    assetCurrentItem: null,
    assetCurrentLoadedBytes: 0,
    assetCurrentTotalBytes: 1,
    
    cameraPhysically: true,
    cameraPos: `0 ${globalCamYPos} 0`,
    cameraRot: `${globalCamXRot} 0 0`,
  }
  
  /**
   * NOTE: react ele and aframe ele is distinct, so plz carefully when get ele from react `ref`
   */
  cameraInstance = null;
  sceneInstance = null;
  cameraFallenNotice = false;
  
  componentWillMount () {
    var extras = require('aframe-extras');
    extras.registerAll();
  }

  componentDidMount () {
    this.trackCameraCollide();
    this.trackCameraPosition();

    //this.props.setSceneInstance(this.sceneInstance);
    //this.props.setSceneEnterVRCallBack(this.sceneInstance.el.enterVR);
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
      //console.log('touchedPos: ', touchedPos);
      
      const targetEle = detail.body.el;
      
      const className = targetEle.className || targetEle.getAttribute('classname') || targetEle.getAttribute('id');

      console.log(
        '[Camera] Player has collided with: #' + e.detail.body.id,
        className ? targetEle.localName + '.' + className : targetEle,
        ` at x: ${touchedPos.x.toFixed(4)}, y: ${touchedPos.y.toFixed(4)}, z: ${touchedPos.z.toFixed(4)}`
      );
    });
  }

  resetCamera = (wasFallen = true) => {
    this.setState({cameraPhysically: false});
    
    setTimeout(()=> {
      this.setState({cameraPhysically: true});
      
      if (wasFallen) {
        this.cameraFallenNotice = false;
      }
      
      globalCamYPos = 2;
      globalCamXRot = 45;
      
      this.setState({
        cameraPos: `0 ${globalCamYPos} 0`,
        cameraRot: `${globalCamXRot} 0 0`,
      });
      this.props.updateCameraStatus(CameraStatus.onFloor);
    }, 42); // 1/24 frames
  }

  trackCameraPosition = () => {
    if (!this.cameraInstance) {
      return;
    }
    const DELTA = 8; // NOTE: User falling down very fast
    const CONSIDER_FALlING_YPOS_TOP = 20; // User falling down to 4m then he stand on the floor
    const CONSIDER_FALlING_YPOS = -100;
    
    // NOTE: addEventListener for aFrame element, not React element, so that do not forget `.el`
    this.cameraInstance.el.addEventListener('componentchanged', (e) => {
      if (e.detail.name === 'position' && !this.cameraFallenNotice) {
        let y = e.detail.newData.y;

        if (y < CONSIDER_FALlING_YPOS) {
          
          this.cameraFallenNotice = true;
          this.props.updateCameraStatus(CameraStatus.fallen); // Why error ???
          this.props.updateCameraStatus(CameraStatus.fallen); // Why error ???

          // TODO: Ask before reset --> Need confirm before reset
          this.props.showDialog({
            message: <span>But you've just done a teleport to initial position</span>
          });
          
          this.resetCamera();
        } else if (CONSIDER_FALlING_YPOS_TOP - DELTA < y && y < CONSIDER_FALlING_YPOS_TOP + DELTA) {
          this.resetCamera();
        }
      }
    });
  }

  updateAssetsLoadingStatus = (status) => {
    this.setState({
      assetsLoading: status
    });
  }

  updateAssetsLoadingInfo = ({assetLoaded, assetTotal, assetCurrentItem}) => {
    this.setState({assetLoaded, assetTotal, assetCurrentItem});
  }
  updateAssetsCurrentInfo = ({assetCurrentLoadedBytes, assetCurrentTotalBytes}) => {
    this.setState({assetCurrentLoadedBytes, assetCurrentTotalBytes});
  }
  
  render() {
    ConsoleLogger.log('render', 'MyScene');
    
    const TEST = false;
  
    return TEST ? this.renderTest() : this.renderProduction();
  }
  

  renderProduction() {
    const {
      assetsLoading, assetLoaded, assetTotal, assetCurrentItem, assetCurrentLoadedBytes, assetCurrentTotalBytes,
      cameraPos, cameraRot
    } = this.state;
    
    const camPhysicalEnabled = this.state.cameraPhysically;
    const camPhysicalAttr = camPhysicalEnabled ? {'kinematic-body': "radius:0.5", 'jump-ability': true} : {};
    
    const {stats} = this.props;

    return (
      <Scene physics="debug: false"
             stats={stats}
             always-fullscreen
             //preloader="type:bootstrap"
             //assets-progress="debug: true"
             platform="all"
             light="defaultLightsEnabled: false"
             vr-mode-ui="enabled: true" // show the default vr button --> We'll hide it later
             ref={reactEle => this.sceneInstance = reactEle}
      >
        <Assets assets={registeredAssets}
                timeout={4e4}
                interval={200}
                currentInfoHandle={this.updateAssetsCurrentInfo}
                loadingInfoHandle={this.updateAssetsLoadingInfo}
                loadingStatusHandle={this.updateAssetsLoadingStatus}
        />
  
        
        <Entity className="camera" ref={reactEle => this.cameraInstance = reactEle}
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
                keyboard-controls
                touch-controls
                hmd-controls
                mouse-controls
        >
          <a-cursor material="color: #ccc; shader: flat"/>
          {/* TODO: Make near/far limit, current: Can not click the box if more than 5m far */}
        </Entity>
  
        <PlaceholderFloor visible={false}/>
  
        
        {assetsLoading
          ? <AssetsLoading
              classes={{root: "assert-loading"}}
              {...{assetLoaded, assetTotal, assetCurrentItem, assetCurrentLoadedBytes, assetCurrentTotalBytes}}
            />
          : <Entity>
          
            {/*<!--
            Copy and modified from the Default lighting injected by A-Frame.
              Ambient #666 is white color with low intensive
              
            -->*/}
            <a-entity light="type: ambient; color: #666"/>
            <a-entity light="type: directional; color: #666; intensity: 0.5" position="-0.5 10 1"/>
  
  
            <Sky/>
          
            <Light/>
      
            <FloorAndWall/>
      
            <Workspace/>
      
            <Entity className="decorator">
              <BackWall/>
              <FrontSea/>
              <Center/>
            </Entity>
          </Entity>
        }
      
      </Scene>
    );
  }

  
  
  

  /**
   * For testing some line of code, especially when you try a new package, you must ensure it work here
   */
  renderTest() {
    return (
      <Scene
        physics class="fullscreen" canvas="" inspector="" keyboard-shortcuts
      >
        {/*<!-- Player -->*/}
        <a-entity camera="userHeight: 1.6" universal-controls="" kinematic-body="" position="" rotation="" scale="" visible="" velocity="" gamepad-controls="" keyboard-controls="" touch-controls="" hmd-controls="" mouse-controls=""></a-entity>
    
        {/*<!-- Ground -->*/}
        <a-grid static-body="" position="" rotation="" scale="" visible="" geometry="" material=""></a-grid>
    
        {/*<!-- Obstacles -->*/}
        <a-box color="#39BB82" width="15" height="5" depth="3" position="8 2.5 -5" static-body="" rotation="" scale="" visible="" material="" geometry=""></a-box>
        <a-box color="#39BB82" width="15" height="5" depth="3" position="8 2.5 5" static-body="" rotation="" scale="" visible="" material="" geometry=""></a-box>
    
        {/*<!-- Lighting -->*/}
        <a-light type="ambient" color="#bbb" position="" rotation="" scale="" visible="" light=""></a-light>
        <a-light color="#ccc" position="0 30 0" distance="100" intensity="0.4" type="point" rotation="" scale="" visible="" light=""></a-light>
        <a-light color="#ccc" position="3 10 -10" distance="50" intensity="0.4" type="point" rotation="" scale="" visible="" light=""></a-light>
      </Scene>
    );
  }
}
