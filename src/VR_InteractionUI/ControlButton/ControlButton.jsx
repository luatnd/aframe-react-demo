import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Translate, Localize, I18n } from 'react-redux-i18n';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import SettingsApplicationsIcon from 'material-ui-icons/SettingsApplications';
import CloseIcon from 'material-ui-icons/Close';
import NetworkWifiIcon from 'material-ui-icons/NetworkWifi';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { showTextNotification, showAvatarNotification } from "../Notification/NotificationRedux";

import styleSheet from './styleSheet';

/**
 * A set of addition button on device screen,
 * Buttons stay beside Enter VR button
 */
@withStyles(styleSheet)
@connect(
  state => {},
  dispatch => bindActionCreators({
    showTextNotification,
    showAvatarNotification,
  }, dispatch)
)
export default class ControlButton extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  handleClick = () => {
    this.props.showTextNotification(I18n.t("controlButton.appSettingMsg"));
  };
  
  handleClick2 = () => {
    this.props.showAvatarNotification(<Translate value="controlButton.fooSettingMsg"/>);
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
      </div>
    );
  }
}
