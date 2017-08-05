// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import styleSheet from './styleSheet';


@withStyles(styleSheet)
export default class Notification extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    message: null,
  };
  
  handleClick = () => {
    this.setState({ open: true });
  };
  
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({ open: false });
  };
  
  render() {
    const { classes } = this.props;
    const msg = <span id="message-id">Note archived</span>;
    
    return (
      <div className="notificationContainer" style={{overflow: "visible", position: "absolute"}}>
        
      </div>
    );
  }
}
