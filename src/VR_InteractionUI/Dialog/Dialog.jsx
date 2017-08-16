// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../../base/redux/dispatch';
import { hideDialog } from './DialogRedux';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


@connect(
  state => ({options: state.dialog.options}),
  getDispatchMapper({
    hideDialog,
  })
)
export default class AlertDialog extends Component {
  static propTypes = {
    options: PropTypes.object,
    hideDialog: PropTypes.func,
  }
  
  handleRequestClose = () => {
    this.props.hideDialog();
  };
  
  render() {
    const {options} = this.props;
    
    return (
      <Dialog open={options.open} onRequestClose={this.handleRequestClose}>
        
        <DialogTitle>
          {"Hahaha you've fallen"}
        </DialogTitle>
        
        <DialogContent>
          {/*TODO: Make a avatar right here*/}
          <DialogContentText>{options.message}</DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleRequestClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      
      </Dialog>
    );
  }
}