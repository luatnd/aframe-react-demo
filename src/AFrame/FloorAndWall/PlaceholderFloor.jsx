import 'aframe';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

/**
 * Why I need a Placeholder floor?
 * Because Aframe physical system still in development, and I'm using React,
 * when asset loading, camera has appear as a kinematic body but floor and wall is still hidden because of assets load.
 * So that I need an placeholder floor
 * And The floor help user to increase he height, because I decrease kinematic radius down to 0.5,
 * so player might have 1m height if I don't use a invisible floor
 */
export class PlaceholderFloor extends React.Component {
  render() {
    const {visible = false} = this.props;
    return (
      <Entity {...this.props} className="FloorAndWall">
        <Entity className="invisiblePlaceHolderFloor floor" static-body="shape:box"
                geometry="primitive: box; width: 25; height: 0.5; depth:25"
                position="0 -0.05 0"
                material={`transparent: true; opacity: ${visible ? 1 : 0}`}/>
      </Entity>
    );
  }
}
