import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

//import obj_E45_dae from '../../../assets/obj/E-45-Aircraft/E 45 Aircraft_Luat.dae';

export class FrontSea extends React.Component {

  render() {
    return (
      <Entity {...this.props} className="decoratorLocation frontSea" position="0 0 -15">
        
        {/*<Entity collada-model="#obj_E45_dae" position="-10 0.5 -5" rotation="0 0 0"/>*/}
        
      </Entity>
    );
  }
}

export const Assets = [
  //<a-asset-item id="obj_E45_dae" src={obj_E45_dae}/>
]