import React from 'react';
import 'aframe';
import 'aframe-always-fullscreen-component';
import 'platform';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import '@gladeye/aframe-preloader-component'; // TODO: Add new type=material-ui for this component
//import './Components/AssetsLoading'; // TODO: make aframe-react compoent for tracking this info
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

import ConsoleLogger from '../Helper/ConsoleLogger';
import {setSceneInstance} from './MySceneRedux';
import getDispatchMapper from '../base/redux/dispatch';

import {AssetsLoading} from './Assets/AssetsLoading';
import {FloorAndWall} from './FloorAndWall/FloorAndWall';
import {PlaceholderFloor} from './FloorAndWall/PlaceholderFloor';
import {Workspace} from './Workspace/Workspace';
import {BackWall} from './Decorator/BackWall';
import {FrontSea} from './Decorator/FrontSea';
import {Center} from './Decorator/Center';
import {Sky} from './Sky/Sky';
import {Light} from './Light/Light';

import {Assets} from './Assets/Assets';

/**
 * Aframe Scene
 *
 * TODO: Build another boiler plate base on webpack 2
 */

@connect(
  state => ({}),
  getDispatchMapper({
    setSceneInstance
  })
)
export class MyScene extends React.Component {
  static propTypes = {
    setSceneInstance: PropTypes.func,
  }

  state = {
    assetsLoading: true,
    assetLoaded: 0,
    assetTotal: 1,
    assetCurrentItem: null,
    assetCurrentLoadedBytes: 0,
    assetCurrentTotalBytes: 1,
  }
  
  /**
   * NOTE: react ele and aframe ele is distinct, so plz carefully when get ele from react `ref`
   */
  cameraInstance = null;
  sceneInstance = null;
  
  componentWillMount () {
    var extras = require('aframe-extras');
    extras.registerAll();
  }

  componentDidMount = () => {
    this.trackCameraCollide();

    this.props.setSceneInstance(this.sceneInstance);
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
      
      console.log('\n[Camera] Player has collided with body #' + e.detail.body.id);
      console.log('-------- Touched the: ', targetEle.className ? targetEle.localName + '.' + targetEle.className : targetEle);
      console.log('-------- Touched position: ', `x: ${touchedPos.x.toFixed(4)}, y: ${touchedPos.y.toFixed(4)}, z: ${touchedPos.z.toFixed(4)}`);
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
    const {assetsLoading, assetLoaded, assetTotal, assetCurrentItem, assetCurrentLoadedBytes, assetCurrentTotalBytes} = this.state;

    return (
      <Scene physics="debug: true"
             always-fullscreen
             //preloader="type:bootstrap"
             //assets-progress="debug: true"
             platform="all"
             light="defaultLightsEnabled: false"
             vr-mode-ui="enabled: false" // hide the default vr button
             ref={reactEle => this.sceneInstance = reactEle}
      >
        <Assets timeout="30000"
                updateAssetsCurrentInfo={this.updateAssetsCurrentInfo}
                updateAssetsLoadingInfo={this.updateAssetsLoadingInfo}
                updateAssetsLoadingStatus={this.updateAssetsLoadingStatus}
        />
  
        
        <Entity className="camera" ref={reactEle => this.cameraInstance = reactEle}
                camera="userHeight: 2; fov: 80;" // Assuming I'm 1.8m height, And the normal human fov is ~80
                //look-controls // Can look around by mouse / turn your head
                //wasd-controls // Can use keyboard to move
                position="0 2 0" // Initial standing position
                velocity

                kinematic-body="radius:0.5" // The kinematic-body component isn't compatible with wasd-controls (from DonMcCurdy)
                //kinematic-body
                jump-ability
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
