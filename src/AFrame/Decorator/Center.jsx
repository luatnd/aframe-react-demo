import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_Drone166_dae from "../../../assets/obj/Drone166/Drone166.dae";

export class Center extends React.Component {
  static renderAssets = () => (
    <Entity key="Center">
      <a-asset-item id="obj_Drone166_dae" src={obj_Drone166_dae}/>
    </Entity>
  )

  render() {
    return (
      <Entity {...this.props} className="decoratorLocation center" position="0 0 0">
        {/*<Entity collada-model={obj_Drone166_dae} position="5 1.5 -3" rotation="0 0 0"/>*/}
        {/*<Entity collada-model={obj_Drone166_dae} position="5 1.5 2" rotation="0 180 0"/>*/}
        <Entity collada-model={'#obj_Drone166_dae'} position="-5 1.5 2" rotation="0 180 0"/>
        <Entity collada-model="#obj_Drone166_dae" position="-5 1.5 -2" rotation="0 0 0"/>
      </Entity>
    );
  }
}
