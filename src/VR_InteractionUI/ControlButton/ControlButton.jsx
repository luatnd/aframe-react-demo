import React from 'react';
import PropTypes from 'prop-types';
import { Translate, Localize, I18n } from 'react-redux-i18n';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import SettingsApplicationsIcon from 'material-ui-icons/SettingsApplications';
import CloseIcon from 'material-ui-icons/Close';
import NetworkWifiIcon from 'material-ui-icons/NetworkWifi';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import styleSheet from './styleSheet';

/**
 * A set of addition button on device screen,
 * Buttons stay beside Enter VR button
 */
@withStyles(styleSheet)
export default class ControlButton extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    open:    false,
    message: null,
  };
  
  handleClick = () => {
    this.setState({open: true, message: <Translate value="controlButton.appSettingMsg"/>});
  };

  handleClick2 = () => {
    this.setState({open: true, message: <Translate value="controlButton.fooSettingMsg"/>});
  };
  
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({open: false});
  };
  
  render() {
    const {classes} = this.props;
    
    return (
      <div className={classes.controlBtnContainer}>
        <Button id="btnFooSetting" onClick={this.handleClick} className={classes.controlBtn}>
          <NetworkWifiIcon className={classes.controlIcon}/>
        </Button>
        
        <Button id="btnAppSetting" onClick={this.handleClick2} className={classes.controlBtn}>
          <SettingsApplicationsIcon className={classes.controlIcon}/>
        </Button>
        
        
        {/* TODO: Move this Snack to another Component */}
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{'aria-describedby': 'message-id',}}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleRequestClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      
      </div>
    );
  }
}
