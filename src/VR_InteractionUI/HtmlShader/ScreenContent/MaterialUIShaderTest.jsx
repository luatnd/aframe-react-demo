// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import IconAvatars from './MuiComponentExamples/IconAvatars';
import Badge from './MuiComponentExamples/Badge';
import MediaControlCard from './MuiComponentExamples/MediaControlCard';
import RecipeReviewCard from './MuiComponentExamples/RecipeReviewCard';
import Chips from './MuiComponentExamples/Chips';
import LinearDeterminate from './MuiComponentExamples/LinearDeterminate';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: '8px 16px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#ddd',
  },
});

function MaterialUIShaderTest(props) {
  const classes = props.classes;
  
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        
        <Grid item xs={8}>
          <Grid container spacing={24}>
            
            <Grid item xs>
  
              <Typography type="display1" gutterBottom style={{marginTop: 0, color: 'rgb(65,177,177)'}}>Material UI Compatible Test</Typography>
              
              <IconAvatars/>
              <Badge/>
              <Chips/>
    
            </Grid>
    
            <Grid item xs>
              <Paper className={classes.paper}>
        
                <MediaControlCard/>
      
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <LinearDeterminate/>
            </Grid>
            
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{padding: '1px 16px'}}>
                <p>Material UI SVG icon was broken ¯\_(ツ)_/¯ | TODO: Try the FontAwesome!</p>
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>
        
        <Grid item xs={4}>
          <RecipeReviewCard/>
          
        </Grid>
      </Grid>
      
      <Grid container spacing={24}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

MaterialUIShaderTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIShaderTest);