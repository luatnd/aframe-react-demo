import React from 'react';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import SettingsApplicationsIcon from 'material-ui-icons/SettingsApplications';
import CloseIcon from 'material-ui-icons/Close';

/**
 * A set of addition button on device screen,
 * Buttons stay beside Enter VR button
 */
export default class ControlButton extends React.Component {
  state = {
    open:    false,
    message: null,
  };
  
  handleClick = () => {
    this.setState({open: true});
  };
  
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({open: false});
  };
  
  render() {
    
    const msg = <span id="message-id">Note archived</span>;
    
    return (
      <div className="AdditionControlButton" style={{position: 'absolute', bottom: "21px", right: "100px", height: "52px", background: "rgba(0,0,0,.35)"}}>
        
        <Button id="btnAppSetting" onClick={this.handleClick} className="">
          <SettingsApplicationsIcon />
          <br/>
          <span>Setting</span>
        </Button>
        
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{'aria-describedby': 'message-id',}}
          message={msg}
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
