import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_CircleTable_dae from "../../../assets/obj/CircleTable/CircleTable.dae"

export class Workspace extends React.Component {

  render() {
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">
          <Entity collada-model="#obj_CircleTable_dae" position="0 0 0" rotation="0 0 0" scale="1 1 1"/>
        </Entity>

        <Entity className="circleScreen">
          
          <Entity collada-model="#obj_ironman_dae" position="0 0 -5" rotation="-90 0 0" scale="0.05 0.05 0.05">
            {/*<a-animation attribute="rotation" to="-90 360 0" dur="10000" repeat="indefinite"/>*/}
          </Entity>

          <Entity className="baseCircle">base Circle</Entity>
          <Entity className="displays">displays</Entity>
        </Entity>
      </Entity>
    );
  }
}

export const renderAssets = () => {
  return <Entity key="Workspace">
    <a-asset-item id="obj_ironman_dae" src="static/obj/IronMan/Ironman.dae"/>
    <a-asset-item id="obj_CircleTable_dae" src={obj_CircleTable_dae}/>
  </Entity>
}