// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import getDispatchMapper from '../../../base/redux/dispatch';
import { setStatsValue } from '../AppSettingRedux';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});


@withStyles(styles)
@connect(
  state => ({options: state.appSetting.options}),
  getDispatchMapper({
    setStatsValue,
  })
)
export default class SettingList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.object,
    setStatsValue: PropTypes.func,
  };
  
  handleStatsClick = () => {
    this.props.setStatsValue(!this.props.options.stats);
  };

  handleDroneClick = () => {
    console.log('TODO: Turn on Drone166: ');
    //this.props.setStatsValue(!this.props.options.stats);
  };
  
  render() {
    const {classes, options} = this.props;
    
    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          
          <ListItem>
            <ListItemText primary="Stats" secondary="Show AFrame debugging stats"/>
            <ListItemSecondaryAction>
              <Switch checked={options.stats} onClick={this.handleStatsClick}/>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Drone 166" secondary="Show your Drone 166 robo, that flying on the left side"/>
            <ListItemSecondaryAction>
              <Switch checked={true} onClick={this.handleDroneClick} disabled/>
            </ListItemSecondaryAction>
          </ListItem>

        </List>
      </div>
    );
  }
}