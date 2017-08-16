/**
 * EnterVRButton is using for replacing default Aframe enter VR button, because the default btn UI is suck.
 * You need an custom button if you wanna add some more button right beside the VR button
 */

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import styleSheet from './styleSheet';

@withStyles(styleSheet)
@connect(
  state => {
    const {enterVR} = state.scene;
    
    return {enterVR};
  }
)
export default class EnterVRButton extends React.Component {
  aframeEnterVrBtn = null;
  
  componentDidMount = () => {
    var myInterval = setInterval(() => {
      this.aframeEnterVrBtn = document.querySelector('.a-enter-vr .a-enter-vr-button');
      
      if (this.aframeEnterVrBtn.localName) {
        clearInterval(myInterval);
  
        this.aframeEnterVrBtn.style.opacity = 0;
        this.aframeEnterVrBtn.style.position = 'absolute';
        this.aframeEnterVrBtn.style.bottom = '-100px';
      }
    }, 500);
  }

  enterVR = (e) => {
    if (this.aframeEnterVrBtn) {
      this.aframeEnterVrBtn.click();
    } else {
      console.warn("Aframe is not ready for VR mode");
    }
    return;
    
    if (this.props.enterVR) {
      this.props.enterVR();
    } else {
      console.warn("Scene element is not ready");
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Button id="btnEnterVR"
              onClick={this.enterVR}
              className={`a-enter-vr-button ${classes.controlBtn}`}    // .a-enter-vr-button for inheriting the Aframe VR button UI
      >
        <svg className={classes.controlIconVR}/>
      </Button>
    );
  }
}
