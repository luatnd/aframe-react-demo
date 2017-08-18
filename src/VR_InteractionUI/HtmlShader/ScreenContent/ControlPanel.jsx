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
          • Use your keyboard ◀ ▶ ▲ ▼ and mouse to move<br/>
          • You have an small circle cursor at the center of screen,<br/>
            help you interact with objects with mouse click, try to find it<br/>
          • Press ESC to show mouse cursor<br/>
          • Press space to jump<br/>
        </Typography>
        
        
        
        <Typography gutterBottom noWrap className={classes.paragraph}>
          TODO: Improve React rendering performance via Pure Component
        </Typography>
        <Typography gutterBottom noWrap className={classes.paragraph}>
          TODO: Improve animation performance: Do animation when needed only
        </Typography>
      </div>
    );
  }
}
