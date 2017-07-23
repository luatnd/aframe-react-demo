import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_Drone166_dae from "../../../assets/obj/Drone166/Drone166x.dae";

export class Center extends React.Component {

  render() {
    
    return (
      <Entity {...this.props} className="decoratorLocation center" position="0 0 0">
        {/*<Entity collada-model="#obj_Drone166_dae" position="5 1.5 -3" rotation="0 0 0"/>*/}
        {/*<Entity collada-model="#obj_Drone166_dae" position="5 1.5 2" rotation="0 180 0"/>*/}
        {/*<Entity collada-model="#obj_Drone166_dae" position="-5 1.5 2" rotation="0 180 0"/>*/}
        
        <Entity collada-model="#obj_Drone166_dae" position="-5 -5 -5" rotation="0 0 0">
          <a-animation delay="3000" dur="10000" attribute="position" from="-5 1.5 -20" to="-5 1.5 1.5" repeat="indefinite" direction="alternate" />
          <a-animation delay="11000" dur="2000"  attribute="rotation" to="0 180 0"  repeat="indefinite" direction="alternate" />
        </Entity>
      </Entity>
    );
  }
}


export const renderAssets = () => {
  return <Entity key="Center">
    <a-asset-item id="obj_Drone166_dae" src={obj_Drone166_dae}/>
  </Entity>
}