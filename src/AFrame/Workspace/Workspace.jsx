import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

export class Workspace extends React.Component {

  render() {
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">Circle table</Entity>
        <Entity className="circleScreen">
          
          <Entity collada-model="#obj_ironman_dae" position="0 0 -5" rotation="-90 0 0" scale="0.05 0.05 0.05">
            {/*<a-animation attribute="rotation" to="-90 360 0" dur="10000" repeat="indefinite"/>*/}
          </Entity>
          {/*<Entity collada-model="#obj_ironman_dae" position="0 0 5" rotation="-90 0 0" scale="0.05 0.05 0.05"/>*/}

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
  </Entity>
}