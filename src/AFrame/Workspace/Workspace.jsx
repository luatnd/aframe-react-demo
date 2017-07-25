import 'aframe';
import 'babel-polyfill';
//import 'aframe-layout-component';
//import '../../AframeCustom/CircleLayout/CircleLayout';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_CircleTable_dae from "../../../assets/obj/CircleTable/CircleTable.dae";
import obj_Monitor_obj from "../../../assets/obj/Monitor/my_moninitor.obj";
import obj_Monitor_mtl from "../../../assets/obj/Monitor/my_moninitor.mtl";

export class Workspace extends React.Component {
  
  workspace = {
    circleTable: {
      height:        1.1,
      radiusOutSide: 4.5,
      radiusInSide:  3.0,
    },
    screen:      {
      initialLength:       1.5, // Screen in 3d model is very large, it's 8 meters screen width, so we scale it down but need to calculate the screen width after scale
      scaleFactor:         0.8, // Screen in 3d model is very large, need to scale it down
      screensCircleRadius: 3.6, // From center of workspace to screen, O-x-y plane. Screens are on 1 circle on circle table, so that is on 1 circle, with radius is ...
    },
  }
  
  /**
   * Auto Calculate position + rotation of screen from center of workspace: 0 0 0 cordinate
   * Then return Entity
   * @param screenPosition IS the relative position of the screen, 0 mean center screen, 1 mean the next screen clockwise, -1 mean the before.
   * @return React.Component
   */
  getNthScreen = (screenPosition) => {
    const screenMargin = 0.2;
    //const deg2rad = Math.PI/180;
    const rad2deg = 180/Math.PI;

    const screensCircleRadius = this.workspace.screen.screensCircleRadius;
    const tableHeight = this.workspace.circleTable.height;
    const ssf = this.workspace.screen.scaleFactor;
    const screenRealWidth = this.workspace.screen.initialLength * this.workspace.screen.scaleFactor;
    
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
    
    console.log('alphaToRotateDeg: ', alphaToRotateDeg);
    
    ry = alphaToRotateDeg;

    // Render ......
    const position = `${px} ${py} ${pz}`;
    const scale = ssf + ' ' + ssf + ' ' + ssf;
    const rotation = `${rx} ${ry} ${rz}`;
    
    return <Entity rotation={rotation}>
      <Entity obj-model="obj: #obj_Monitor_obj; mtl: #obj_Monitor_mtl" {...{position, scale}}/>
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
  
  render() {
    
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">
          <Entity collada-model="#obj_CircleTable_dae" position="0 0 0" rotation="0 0 0" scale="1 1 1"/>
        </Entity>
        
        <Entity
          className="baseCircle"> {/* Is the invisible circle that put screen and anything on, we will rotate this instead of rotate the table */}
          
          <Entity
            className="CircleTableSurfaceOverwrite"/> {/* Is the visible circle table surface: If you wanna another table surface instead of currently BlackCarbon */}
          
          <Entity className="screensCircle">
            {this.getNthScreen(0)}
            {this.getNthScreen(1)}
            {this.getNthScreen(2)}
            {this.getNthScreen(-1)}
            {this.getNthScreen(-2)}
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
  </Entity>
}