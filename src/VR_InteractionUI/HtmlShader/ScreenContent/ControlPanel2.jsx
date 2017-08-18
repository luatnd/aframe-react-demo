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
  
  list: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

@withStyles(styles)
export default class ControlPanel2 extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  render() {
    console.log('ControlPanel2 Screen rendered');
    
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        <Typography type="title" gutterBottom className={classes.title}>
          Hello mobile user,
        </Typography>
        <Typography gutterBottom noWrap className={classes.paragraph}>
          Mobile UX is very bad, I'll put Mobile UX improvement it into TODO list<br/>
          • Touch screen to go forward<br/>
          • Some cursor interactions are not properly working because it's touch move<br/>
          &nbsp;&nbsp;instead of touch to interact<br/>
        </Typography>
      </div>
    );
  }
}
