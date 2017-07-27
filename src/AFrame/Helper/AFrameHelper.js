import 'aframe';
import 'babel-polyfill';
import React from 'react';
import {Entity} from 'aframe-react';

import Helper3D from '../../Helper/Helper3D/Helper3D';

export default class AFrameHelper {
  
  /**
   * Input a list of points in Oxyz cordinate, preview them as a line connected all of them
   *
   * @param shapePoints
   * @returns {XML}
   */
  static previewShapePoints = (shapePoints) => {
    const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'magenta'];
    
    let lines = {
      //line__0: "start: 1, 1.2, 3; end: 2, 1.2, 2.5; color: red;static-body:'shape:box'",
      //line__1: "start: 2, 1.2, 2.5; end: 2.5, 1.2, 1.8; color: yellow;static-body:'shape:box'",
      //line__2: "start: 2.5, 1.2, 1.8; end: 3, 1.2, 0; color: green; static-body:'shape:box'",
    };
    
    let prevPoint = null;
    shapePoints.forEach((point, i) => {
      // Ignore first point
      if (prevPoint == null) {
        prevPoint = point;
        return;
      }
      
      let color = COLORS[Math.floor(Math.random() * COLORS.length)];
      let start = `${prevPoint.x}, ${prevPoint.y}, ${prevPoint.z}`;
      let end   = `${point.x}, ${point.y}, ${point.z}`;
      
      lines[`line__${i}`] = `start: ${start}; end: ${end}; color: ${color}`;
      
      prevPoint = point;
    });
    
    return <a-entity {...lines} />
  }
  
  
  /**
   * Shape points is point collection that make a line to prevent user go through
   * Base on those point, fn will make a short walls (that is boxes)  to prevent user go through
   *
   * If circle and some basic requirement, refer to: https://www.npmjs.com/package/aframe-layout-component
   *
   * NOTE: This was use for XZ plane only, so you can see the Y number is const.
   *
   * @param {string} className
   * @param {Object[]} shapePoints
   * @param {number} staticWallHeight
   * @param {number} staticWallDepth
   * @param {boolean} visible
   */
  static makeStaticBodyWall_for_XZplane = (className = 'exampleWall', shapePoints, staticWallHeight = 1, staticWallDepth = 0.1, visible = false) => {

    let boxes = [];
    
    /**
     * @var {{x: x, y:y, z:z}} point
     */
    let startP = null;
    shapePoints.forEach((endP, i) => {
      // Ignore first point
      if (startP == null) {
        startP = endP;
        return;
      }
  
      let staticWidth = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.z - startP.z, 2)); // Formula: Length of a line connected by 2 point
      const alphaRad = Math.atan2(startP.z - endP.z, startP.x - endP.x);
      let alpha = Helper3D.toDeg(alphaRad);
  
      /**
       * Because shape is hull or box, there are some small gap, lit, aperture between boxes, user still can try to go through it
       * So I intend to increase the box width for safely ensure that noone can crossover the wall
       */
      staticWidth += 0.2;
      
      /**
       * Revert in this case because Aframe use another coordinate than Mathematic
       * Fore more detail why I change alpha: https://en.wikipedia.org/wiki/Atan2
       */
      alpha = 180 - alpha;
  
      let px = (startP.x + endP.x) / 2,
        py = staticWallHeight / 2,
        pz = (startP.z + endP.z) / 2;
      let rx = 0,
        ry = alpha,
        rz = 0;
  
      boxes.push(<a-box key={i} className={className}
        static-body="shape:hull"
        color="tomato" material={`transparent: true; opacity: ${visible ? 1 : 0}`}
        width={staticWidth} height={staticWallHeight} depth={staticWallDepth}
        position={`${px} ${py} ${pz}`}
        rotation={`${rx} ${ry} ${rz}`}
      />);

      startP = endP;
    });
  
    return <Entity>{boxes}</Entity>
  }

}