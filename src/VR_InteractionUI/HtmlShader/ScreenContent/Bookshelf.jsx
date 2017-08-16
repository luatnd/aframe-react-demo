// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import Typography from 'material-ui/Typography';

import imgBookshelf from '../../../../assets/img/bookshelf.png';





function TabContainer(props) {
  return (
    <div style={{ padding: 20 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};





class Bookshelf extends Component {
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <div className={classes.root}>
        <Typography type="display1" gutterBottom style={{marginTop: 0, color: 'rgb(65,177,177)'}}>Bookshelf</Typography>
        
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Developer" style={{borderBottom: '4px solid orange'}}/>
            <Tab label="Personal" />
            <Tab label="Other Books" />
          </Tabs>
        </AppBar>
        
        {value === 0 &&
        <TabContainer>
          <img src={imgBookshelf} className={classes.img} alt="imgBookshelf"/>
        </TabContainer>}
        
      </div>
    );
  }
}

Bookshelf.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 10,
    backgroundColor: 'transparent',
    
    '& $img': {
      height: 330,
    }
  },
  
  img: {},
  
};
export default withStyles(styles)(Bookshelf);