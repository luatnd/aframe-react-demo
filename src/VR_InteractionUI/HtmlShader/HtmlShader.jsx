import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => ({
  aHiddenContainer: {
    "width": "100%", "height": "100%",
    "position": "fixed",
    "left": "0", "top": "0",
    "zIndex": "-99",
    "overflow": "hidden",
    opacity: 0,
    padding: 0,
  },
  screenContent_0: {
    margin:0,
    width: '1000px', height: '430px',
    "background": "orange",
    "color": "rgb(65,177,177)",
  },
}));


/**
 * TODO: Can register HTML shader in component, like I did with assets-item component
 */
@withStyles(styleSheet)
export class HtmlShader extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  render() {
    const {classes} = this.props;
    
    return (
      <div className={classes.aHiddenContainer}>
        <div id="screenContent_0" className={classes.screenContent_0}>
          <h1>Hello, HTML!</h1>
          <p>This is a long text This is a long text This is a long text This is a long text This is a long
            text This is a long text This is a long text This is a long text This is a long text
            This is a long text This is a long text This is a long
          </p>
        </div>
      </div>
    );
  }
}
