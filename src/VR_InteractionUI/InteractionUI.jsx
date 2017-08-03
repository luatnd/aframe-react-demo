import 'babel-polyfill';
import React from 'react';
import ControlButton from './ControlButton/ControlButton';
import Notification from './Notification/Notification';
import Dialog from './Dialog/Dialog';

export class InteractionUI extends React.Component {
  render() {
    return (
      <div className="web2dInteraction" style={{
        //position: "initial",
        width: '0',
        height: '0',
        overflow: "visible",
        top: 0,
        left: 0,
        background: "transparent"
      }}>
        <ControlButton/>
        <Notification/>
        <Dialog/>
      </div>
    );
  }
}
