import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import imgFloorWooden from "../../../assets/img/wooden_panels-1280x720.jpg";

export class FloorAndWall extends React.Component {
  static renderAssets = () => (
    <Entity key="FloorAndWall">
      <img id="floorWooden" src={imgFloorWooden} alt="sky"/>
    </Entity>
  )
  
  render() {
    return (
      <Entity {...this.props} className="FloorAndWall" style={{color:"red", background: "white", fontSize: "20em"}}>
        
        <Entity className="floor"
                geometry="primitive: plane; width: 25; height: 25;"
                position="0 0 0"
                rotation="-90 0 0"
                material={`shader: flat; src: #floorWooden; repeat: 5 5`}/>
        <Entity className="backWall"
                geometry="primitive: box; width: 25; height: 10;"
                position="0 -0 13"
                rotation="180 180 0"
                material={`shader: flat; src: #floorWooden; repeat: 5 2`}/>
        <Entity className="leftWall"
                geometry="primitive: box; width: 25; height: 5; depth:0.5"
                position="-12.5 -2.2 0"
                rotation="180 90 0"
                material={`shader: flat; src: #floorWooden; repeat: 5 1`}/>
        <Entity className="rightWall"
                geometry="primitive: box; width: 25; height: 5; depth:0.5"
                position="12.5 -2.2 0"
                rotation="180 90 0"
                material={`shader: flat; src: #floorWooden; repeat: 5 1`}/>
      </Entity>
    );
  }
}
