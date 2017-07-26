import 'aframe';
import 'babel-polyfill';
//import 'aframe-layout-component';
//import '../../AframeCustom/CircleLayout/CircleLayout';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_CircleTable_dae from "../../../assets/obj/CircleTable/CircleTable.dae";
import obj_Monitor_obj from "../../../assets/obj/Monitor/my_moninitor.obj";
import obj_Monitor_mtl from "../../../assets/obj/Monitor/my_moninitor.mtl";
import obj_Keyboard_obj from "../../../assets/obj/Monitor/my_keyboard.obj";
import obj_Keyboard_mtl from "../../../assets/obj/Monitor/my_keyboard.mtl";



export class Workspace extends React.Component {
  
  workspace = {
    circleTable: {
      height:        1.0,
      radiusOutSide: 4.5,
      radiusInSide:  3.0,
    },
    screen:      {
      initialWidth:        1.5, // Screen in 3d model is very large, it's 8 meters screen width, so we scale it down but need to calculate the screen width after scale
      scaleFactor:         1, // Screen in 3d model is very large, need to scale it down
      screensCircleRadius: 4, // From center of workspace to screen, O-x-y plane. Screens are on 1 circle on circle table, so that is on 1 circle, with radius is ...
    },
    keyboard:    {
      initialWidth:   0.46,
      initialHeight:  0.15,
      customY:  0.025,
      screenDistance: 0.6, // Keyboard distance from the screen center to keyboard
    }
  }
  
  componentDidMount () {
    this.registerCursorListenner();
  }
  
  /**
   * Auto Calculate position + rotation of screen from center of workspace: 0 0 0 cordinate
   * Then return Entity
   * @param screenPosition IS the relative position of the screen, 0 mean center screen, 1 mean the next screen clockwise, -1 mean the before.
   * @param withKeyBoard If true then include a keyboard for this screen
   * @return React.Component
   */
  getNthScreen = (screenPosition, withKeyBoard = false) => {
    const screenMargin = 0.2;
    //const deg2rad = Math.PI/180;
    const rad2deg = 180/Math.PI;

    const screensCircleRadius = this.workspace.screen.screensCircleRadius;
    const tableHeight = this.workspace.circleTable.height;
    const ssf = this.workspace.screen.scaleFactor;
    const screenRealWidth = this.workspace.screen.initialWidth * this.workspace.screen.scaleFactor;
    
    const screen_0th = {
      px: 0,
      py: tableHeight, // default
      pz: -screensCircleRadius, // default
      rx: 0, // always 0
      ry: 0, // always change // default
      rz: 0, // always 0
    }
    
    let {px, py, pz, rx, ry, rz} = screen_0th;
  
    /**
     * tan{-1} ( 0.6 / 3,6 )
     * Call O is the center point of screensCircle
     * Call C is the center point of the screen
     * Call R is the right point of the screen
     *
     * var ratio   = Math.tan( myDegrees * deg2rad );
     * var degrees = Math.atan( ratio ) * rad2deg;
     */
    
    const anglesRad_of_COR = Math.atan((screenRealWidth + screenMargin)/ screensCircleRadius); // Why not divide by 2 ????
    const anglesDeg_of_COR = anglesRad_of_COR * rad2deg;
    
    const alphaToRotateDeg = anglesDeg_of_COR * 2 * screenPosition;
    
    //console.log('alphaToRotateDeg: ', alphaToRotateDeg);
    
    ry = alphaToRotateDeg;

    // Render ......
    const position = `${px} ${py} ${pz}`;
    const scale = ssf + ' ' + ssf + ' ' + ssf;
    const rotation = `${rx} ${ry} ${rz}`;

    const keyboardDistance = this.workspace.keyboard.initialHeight + this.workspace.keyboard.screenDistance;
    
    return <Entity rotation={rotation}>
      <Entity obj-model="obj: #obj_Monitor_obj; mtl: #obj_Monitor_mtl" {...{position, scale}}/>
      {withKeyBoard && <Entity obj-model="obj: #obj_Keyboard_obj; mtl: #obj_Keyboard_mtl"
                               position={`${px} ${py+this.workspace.keyboard.customY} ${(pz + keyboardDistance)}`}/>}
    </Entity>
  }

  /**
   * Rotate a point some radian angles around the center of coordinate (O point)
   *
   */
  rotate2DByO = ({x, y}, a) => {
    const newX = x * Math.cos(a) - y * Math.sin(a);
    const newY = x * Math.sin(a) + y * Math.cos(a);
    
    return {newX, newY};
  }
  
  makeStaticBodyLines = (shapePoints = [
    [0, 0, 0],
    [1, 1, 1]
  ]) => {
    {/*return <a-entity static-body*/}
      {/*line__0="start: 0, 1, 0; end: 2 0 -5; color: red"*/}
      {/*line__1="start: -2, 4, 5; end: 0 4 -3; color: yellow"*/}
      {/*line__2="start: -12, 1, -2; end: 12, 1, -2; color: green"*/}
    {/*/>;*/}
    return <Entity>
      <a-box static-body="shape: box;" color="tomato" depth="0.1" height="2" width="20" position="0 1.0 -4" material="transparent: true; opacity: 0.9"/>
    </Entity>
  }

  registerCursorListenner () {
    // Component to change to random color on click.
    let AFRAME = AFRAME || window.AFRAME;
  
    AFRAME.registerComponent('cursor-listener', {
      init: function () {
        var COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'magenta'];
        this.el.addEventListener('click', function (evt) {
          var randomIndex = Math.floor(Math.random() * COLORS.length);
          this.setAttribute('material', 'color', COLORS[randomIndex]);
          console.log('I was clicked at: ', evt.detail.intersection.point);
        });
      }
    });
  }
  
  render() {
    
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">
          <Entity collada-model="#obj_CircleTable_dae" position="0 0 0" rotation="0 0 0" scale="1 1 1"/>
          
          {/*
            Show case: How to prevent move through a mesh:
            Aframe-extra: static-body + dynamic-body will consider all geomeotry and 3d model as an box (it's bounding box)
             So that for the circle / sphere, you need to create a static-body path to prevent user move through, instead of set circle is static body
           */}
          {this.makeStaticBodyLines([
            [0, 0, 0],
            [1, 1, 1]
          ])}
           
        </Entity>
        
        <Entity
          className="baseCircle"> {/* Is the invisible circle that put screen and anything on, we will rotate this instead of rotate the table */}
          
          <Entity className="CircleTableSurfaceOverwrite"/> {/* Is the visible circle table surface: If you wanna another table surface instead of currently BlackCarbon */}
          
          <Entity className="screensCircle">
            {this.getNthScreen(0, true)}
            {this.getNthScreen(1)}
            {this.getNthScreen(-1)}
            {this.getNthScreen(2)}
            {this.getNthScreen(-2)}
          </Entity>
          
          <Entity className="decorator">
            <a-entity id="box" cursor-listener geometry="primitive: box;width:0.5;height:0.5;depth:0.5;" material="color: blue" position="-2.046 1.2 3.121"></a-entity>
          </Entity>
        
        </Entity>
      </Entity>
    );
  }
}

export const renderAssets = () => {
  return <Entity key="Workspace">
    <a-asset-item id="obj_ironman_dae" src="static/obj/IronMan/Ironman.dae"/>
    <a-asset-item id="obj_CircleTable_dae" src={obj_CircleTable_dae}/>
    <a-asset-item id="obj_Monitor_obj" src={obj_Monitor_obj}/>
    <a-asset-item id="obj_Monitor_mtl" src={obj_Monitor_mtl}/>
    <a-asset-item id="obj_Keyboard_obj" src={obj_Keyboard_obj}/>
    <a-asset-item id="obj_Keyboard_mtl" src={obj_Keyboard_mtl}/>
  </Entity>
}