import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_ironman_dae from "../../../assets/obj/IronMan/Ironman.dae";

export class Workspace extends React.Component {
  static renderAssets = () => (
    <Entity key="Workspace">
      <a-asset-item id="obj_ironman_dae" src={obj_ironman_dae}/>
    </Entity>
  )

  render() {
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">Circle table</Entity>
        <Entity className="circleScreen">
          
          <Entity collada-model="#obj_ironman_dae" position="0 0 -5" rotation="-90 0 0" scale="0.05 0.05 0.05"/>
          <Entity collada-model="#obj_ironman_dae" position="0 0 5" rotation="-90 0 0" scale="0.05 0.05 0.05"/>

          <Entity className="baseCircle">base Circle</Entity>
          <Entity className="displays">displays</Entity>
        </Entity>
      </Entity>
    );
  }
}
