// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import { hideNotification } from "./NotificationRedux";

import styleSheet from './styleSheet';

const NotificationType = PropTypes.shape({
  open:     PropTypes.bool,
  type:     PropTypes.oneOf(['text', 'avatar']),
  message:  PropTypes.string,
  duration: PropTypes.number,
});


@withStyles(styleSheet)
@connect(
  state => {
    const {options} = state.notification;
    
    return {options};
  },
  dispatch => bindActionCreators({
    hideNotification,
  }, dispatch)
)
export default class Notification extends React.Component {
  static propTypes = {
    classes:          PropTypes.object.isRequired,
    option:           NotificationType,
    hideNotification: PropTypes.func,
  }
  
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.hideNotification();
  };
  
  handleClickClose = () => {
    this.props.hideNotification();
  };
  
  render() {
    const {classes, options} = this.props;
    
    return (
      <div className="notificationContainer" style={{overflow: "visible", position: "absolute"}}>
        
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'left'}}
          open={options.open}
          autoHideDuration={options.duration}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{'aria-describedby': 'message-id',}}
          message={<span id="message-id">{options.message}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClickClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      
      </div>
    );
  }
}
