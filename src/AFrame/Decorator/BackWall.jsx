import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

import obj_Drone166_img from '../../../assets/obj/Drone166/Drone1.png';

export class BackWall extends React.Component {
  
  render() {
    return (
      <Entity {...this.props} className="decoratorLocation backWallRight" position="13 0 13">
        {/*<a-image className="obj_Drone166_img" src="#obj_Drone166_img"*/}
                 {/*position="0 2.8 -2.5" rotation="0 -120 0" width="5" height="5"/>*/}

        {/*<Entity className="drone166_text" position="-1.5 4 -0.51" rotation="0 180 0">*/}
          {/*<a-text value="Drone 166" width="15" color="#dedede"/>*/}
          {/*<a-text value="[Oblivion]" width="15" color="#dedede" position="0 -1 0"/>*/}
        {/*</Entity>*/}
      </Entity>
    );
  }
}


export const Assets = [
  <img id="obj_Drone166_img" src={obj_Drone166_img} alt="obj_Drone166_img"/>
]