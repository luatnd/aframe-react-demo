import 'aframe';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

import imgSky from "../../../assets/img/sky.jpg";

export default class Sky extends React.Component {
  static Assets = [
    <img id="sky" src={imgSky} alt="sky"/>,
    //<video id="videoMilkyWay" src={videoMilkyWay}/>
  ];
  
  render() {
    return (
      <Entity {...this.props}>
        <a-sky className="sky" src="#sky" rotation="0 0 0"/>
      </Entity>
    );
  }
}
