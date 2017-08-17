// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../../base/redux/dispatch';
import { hideAppSetting, setStatsValue } from './AppSettingRedux';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


@connect(
  state => ({options: state.appSetting.options}),
  getDispatchMapper({
    hideAppSetting,
    setStatsValue,
  })
)
export default class AppSetting extends Component {
  static propTypes = {
    options: PropTypes.object,
    hideAppSetting: PropTypes.func,
  }
  
  handleRequestClose = () => {
    this.props.hideAppSetting();
  };
  
  handleStatsClick = () => {
    this.props.setStatsValue(!this.props.options.stats);
  };
  
  render() {
    const {options} = this.props;
    
    return (
      <Dialog open={options.open} onRequestClose={this.handleRequestClose}>
        
        <DialogTitle>App Setting</DialogTitle>
        
        <DialogContent>
          <h1>Copy the android setting UI</h1>
          <h1 onClick={this.handleStatsClick}>Stats: {options.stats ? 'On' : 'Off'}</h1>
          <h1>FPS: [number=24]</h1>
          <h1>Droid166: On/Off</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={this.handleRequestClose}>Close</Button>
        </DialogActions>
      
      </Dialog>
    );
  }
}