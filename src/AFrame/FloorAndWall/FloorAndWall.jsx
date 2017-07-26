import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import imgFloorWooden from "../../../assets/img/wooden_panels-1280x720.jpg";
import imgBronze from "../../../assets/img/bronze.jpg";
import imgMetalSheetDecor from "../../../assets/img/metal-sheet-decor.jpg";
import imgCarbonYellow from "../../../assets/img/carbon-yellow.jpg";

export class FloorAndWall extends React.Component {
  render() {
    return (
      <Entity {...this.props} className="FloorAndWall" style={{color:"red", background: "white", fontSize: "20em"}}>
        
        <Entity static-body className="floor"
                geometry="primitive: plane; width: 25; height: 25;"
                position="0 0 0"
                rotation="-90 0 0"
                material={`shader: flat; src: #imgCarbonYellow; repeat: 15 10`}/>
        <Entity className="backWall" static-body
                geometry="primitive: box; width: 25; height: 10;"
                position="0 -0 12.5"
                rotation="180 180 0"
                material={`shader: flat; src: #imgMetalSheetDecor; repeat: 5 2`}/>
        <Entity className="leftWall" static-body
                geometry="primitive: box; width: 25; height: 5; depth:0.5"
                position="-12.5 -2.2 0"
                rotation="180 90 0"
                material={`shader: flat; src: #imgMetalSheetDecor; repeat: 5 1`}/>
        <Entity className="rightWall" static-body
                geometry="primitive: box; width: 25; height: 5; depth:0.5"
                position="12.5 -2.2 0"
                rotation="180 90 0"
                material={`shader: flat; src: #imgMetalSheetDecor; repeat: 5 1`}/>
      </Entity>
    );
  }
}

export const renderAssets = () => {
  return <Entity key="FloorAndWall">
    <img id="floorWooden" src={imgFloorWooden} alt="floorWooden"/>
    <img id="imgBronze" src={imgBronze} alt="imgBronze"/>
    <img id="imgMetalSheetDecor" src={imgMetalSheetDecor} alt="imgMetalSheetDecor"/>
    <img id="imgCarbonYellow" src={imgCarbonYellow} alt="imgCarbonYellow"/>
  </Entity>
}