// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress } from 'material-ui/Progress';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../../VR_InteractionUI/InteractionMUITheme';


export class AssetsLoading extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    assetLoaded: PropTypes.number,
    assetTotal: PropTypes.number,
    assetCurrentItem: PropTypes.object,
    //assetCurrentLoadedBytes: PropTypes.number,
    //assetCurrentTotalBytes: PropTypes.number
  };
  
  render() {
    const {classes, assetLoaded, assetTotal, assetCurrentItem} = this.props;
    //const currentPercent = assetCurrentLoadedBytes / assetCurrentTotalBytes * 100;
    const totalPercent = Math.floor(assetLoaded / assetTotal * 100);
    
    return (
      <div className={`${classes.root} testTest`} style={{display: 'flex', alignItems: 'center', width: "80%", maxWidth: "480px", margin: "0 auto", height: "100%"}}>
      <div style={{width: '100%'}}>
        <h3 style={{
          color: 'rgba(0, 0, 0, 0.54)',
          margin: '1em 0 0.7em',
          fontSize: '24px',
          fontWeight: '400',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          lineHeight: '32px',
        }}>Loading assets... {assetCurrentItem? <span style={{fontSize:"smaller"}}>{`(${assetCurrentItem.id})`}</span>: ''}</h3>
  
        <MuiThemeProvider theme={theme}>
          <div>
            {/*<LinearProgress className="currentProgress" mode="determinate" value={currentPercent} />*/}
            <LinearProgress className="totalProgress" mode="determinate" value={totalPercent} style={{marginTop: "30px"}}/>
          </div>
        </MuiThemeProvider>
      </div>
      </div>
    );
  }
}
