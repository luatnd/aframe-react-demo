import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import BookShelfScreen from './ScreenContent/Bookshelf';
import MaterialUIShaderTest from './ScreenContent/MaterialUIShaderTest';

const styleSheet = {
  aHiddenContainer: {
    "width": "100%", "height": "100%",
    "position": "fixed",
    "left": "0", "top": "0",
    "zIndex": "-99",
    "overflow": "hidden",
    opacity: 0,
    padding: 0,
  },
  screenContent_x: {
    position:'fixed', top: 0, left:0,
    margin:0,
    padding: '30px',
    width: '1000px', height: '430px', // This is fixed number for all my displays, htmlcontent width: '1000px', height: '430px' equiqvalent to screen size: 2.9m/1.269m
    overflow: 'hidden',
    "background": "transparent",
    "color": "rgb(65,177,177)",
  },
};


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
  
        <div id="screenContent_0" className={`${classes.screenContent_x}`}>
          <h1 style={{margin: 0}}>Hello, HTML!</h1>
          <p>This is a long text This is a long text This is a long text This is a long text This is a long
            text This is a long text This is a long text This is a long text This is a long text
            This is a long text This is a long text This is a long
          </p>
        </div>
  
        <div id="screenContent_2" className={`${classes.screenContent_x}`}>
          <BookShelfScreen/>
        </div>

        <div id="screenContent_m2" className={`${classes.screenContent_x}`}>
          <MaterialUIShaderTest/>
        </div>


      </div>
    );
  }
}
