// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  title: {fontSize: '42px', lineHeight: '60px',color: 'rgb(65,177,177)',},
  paragraph: {fontSize: '28px', lineHeight: '40px', color: 'rgb(65,177,177)',},
});

@withStyles(styles)
export default class ControlPanel extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  render() {
    console.log('ControlPanel Screen rendered');
    
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom className={classes.title}>
          Hello, HTML!
        </Typography>
        <Typography gutterBottom noWrap className={classes.paragraph}>
          TODO: Improve React rendering performance
        </Typography>
        <Typography gutterBottom noWrap className={classes.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
    );
  }
}
