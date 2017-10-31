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
import Camera from './Components/Camera';

//import Assets from './Assets/Assets';
import Assets from 'aframe-react-assets';
import registeredAssets from './Assets/AssetsRegister';

/**
 * Aframe Scene
 *
 * TODO:
 *    * Build another boiler plate base on webpack 2
 *    * Migrate camera to a new component
 *    * Asset status to Redux
 *    * Show screen content on ready
 */

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
  }
  
  /**
   * NOTE: react ele and aframe ele is distinct, so plz carefully when get ele from react `ref`
   */
  sceneInstance = null;
  
  componentWillMount () {
    const extras = require('aframe-extras');
    extras.registerAll();
  }

  componentDidMount () {
    //this.props.setSceneInstance(this.sceneInstance);
    //this.props.setSceneEnterVRCallBack(this.sceneInstance.el.enterVR);
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
    ConsoleLogger.log('render', 'MyScene', 'color:orange');
    
    const TEST = false;
  
    return TEST ? this.renderTest() : this.renderProduction();
  }
  

  renderProduction() {
    const {
      assetsLoading, assetLoaded, assetTotal, assetCurrentItem, assetCurrentLoadedBytes, assetCurrentTotalBytes
    } = this.state;
    
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
                onLoad={this.updateAssetsLoadingStatus}
                onLoadingBySize={this.updateAssetsCurrentInfo}
                onLoadingByAmount={this.updateAssetsLoadingInfo}
        />
  
        
        <Camera/>
  
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
