import React from 'react';
import 'aframe';
import 'aframe-always-fullscreen-component';
import 'platform';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

var extras = require('aframe-extras');
extras.registerAll();

import {FloorAndWall} from './FloorAndWall/FloorAndWall';
import {Workspace} from './Workspace/Workspace';
import {BackWall} from './Decorator/BackWall';
import {FrontSea} from './Decorator/FrontSea';
import {Center} from './Decorator/Center';
import {Sky} from './Sky/Sky';

import {Assets} from './Assets/Assets';

/**
 * Aframe Scene
 *
 * TODO: Build another boiler plate base on webpack 2
 */
export class MyScene extends React.Component {
  state = {
    assetsLoading: true
  }

  updateAssetsLoadingStatus = (status) => {
    this.setState({
      assetsLoading: status
    });
  }
  
  render() {
    const TEST = false;
  
    return TEST ? this.renderTest() : this.renderProduction();
  }
  

  renderProduction() {
    const {assetsLoading} = this.state;

    return (
      <Scene physics="debug: true" always-fullscreen platform="all" light="defaultLightsEnabled: false">
        <Assets updateAssetsLoadingStatus={this.updateAssetsLoadingStatus}/>

        <Entity className="camera"
                camera="userHeight: 2; fov: 80;" // Assuming I'm 1.8m height, And the normal human fov is ~80
                //look-controls // Can look around by mouse / turn your head
                //wasd-controls // Can use keyboard to move
                position="0 0 0" // Initial standing position
                velocity

                kinematic-body
                universal-controls // replace look-controls
                //gamepad-controls
                keyboard-controls // replace wasd-controls ?
                touch-controls
                hmd-controls
                mouse-controls
        />
        
        {assetsLoading
          ? "Loading assets..."
          : <Entity>
          
            {/*<!--
            Copy and modified from the Default lighting injected by A-Frame.
              Ambient #666 is white color with low intensive
              
            -->*/}
            <a-entity light="type: ambient; color: #666"/>
            <a-entity light="type: directional; color: #666; intensity: 0.5" position="-0.5 10 1"/>
  
  
            <Sky/>
      
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
