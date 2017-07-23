import React from 'react';
import 'aframe';
import 'aframe-always-fullscreen-component';
import 'platform';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';

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
    const {assetsLoading} = this.state;

    return (
      <Scene always-fullscreen platform="all">
        <Assets updateAssetsLoadingStatus={this.updateAssetsLoadingStatus}/>

        {assetsLoading
          ? "Loading..."
          : <Entity>
            <Entity className="camera"
                    camera="userHeight: 1.8; fov: 80;" // Assuming I'm 1.8m height, And the normal human fov is ~80
                    look-controls // Can look around by mouse / turn your head
                    wasd-controls // Can use keyboard to move
                    position="0 0 0" // Initial standing position
            />
      
            <Sky/>
      
            <FloorAndWall/>
      
            <Workspace/>
      
            {/*<Entity className="decorator">*/}
              {/*<BackWall/>*/}
              {/*<FrontSea/>*/}
              {/*<Center/>*/}
            {/*</Entity>*/}
          </Entity>
        }
      
      </Scene>
    );
  }
}
