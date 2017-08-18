// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../../base/redux/dispatch';
import { withStyles } from 'material-ui/styles';
import { hideAppSetting } from './AppSettingRedux';
import SettingList from './SettingList/SettingList';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


const styles = theme => ({
  transBg: {
    background: 'rgba(255,255,255,0.7)',
  },
});


@withStyles(styles)
@connect(
  state => ({options: state.appSetting.options}),
  getDispatchMapper({
    hideAppSetting,
  })
)
export default class AppSetting extends Component {
  static propTypes = {
    classes: PropTypes.object,
    options: PropTypes.object,
    hideAppSetting: PropTypes.func,
  }
  
  handleRequestClose = () => {
    this.props.hideAppSetting();
  };
  
  render() {
    const {options, classes} = this.props;
    
    return (
      <Dialog open={options.open} onRequestClose={this.handleRequestClose}>
        <DialogContent className={classes.transBg}>
          <SettingList/>
        </DialogContent>
        <DialogActions className={classes.transBg}>
          <Button onClick={this.handleRequestClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}