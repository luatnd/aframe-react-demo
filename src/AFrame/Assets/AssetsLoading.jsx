// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import ConsoleLogger from '../../Helper/ConsoleLogger';

//const styleSheet = createStyleSheet({
//  root: {
//    width: '100%',
//    marginTop: 30,
//  },
//});

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
    console.log('this.props: ', this.props);
    
    const {classes, assetLoaded, assetTotal, assetCurrentItem} = this.props;
    //const currentPercent = assetCurrentLoadedBytes / assetCurrentTotalBytes * 100;
    const totalPercent = Math.floor(assetLoaded / assetTotal * 100);
    
    return (
      <div className={`${classes.root} testTest`} style={{margin: "40% auto", minWidth:"200px", width:"75%"}}>
        <Typography type="body1" gutterBottom>Loading assets ... {assetCurrentItem? `(${assetCurrentItem.id})`: ''}</Typography>
        {/*<LinearProgress className="currentProgress" mode="determinate" value={currentPercent} />*/}
        <LinearProgress className="totalProgress" mode="determinate" value={totalPercent} />
      </div>
    );
  }
}
