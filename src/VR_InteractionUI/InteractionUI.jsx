import 'babel-polyfill';
import React from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import ControlButton from './ControlButton/ControlButton';
import Notification from './Notification/Notification';
import AlertDialog from './Dialog/Dialog';
import AppSetting from './AppSetting/AppSetting';

import theme from './InteractionMUITheme';

export class InteractionUI extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="web2dInteraction" style={{
          //position: "initial",
          width:      '0',
          height:     '0',
          overflow:   "visible",
          top:        0,
          left:       0,
          background: "transparent"
        }}>
          <ControlButton/>
          <Notification/>
          <AlertDialog/>
          <AppSetting/>
        </div>
      </MuiThemeProvider>
    );
  }
}
