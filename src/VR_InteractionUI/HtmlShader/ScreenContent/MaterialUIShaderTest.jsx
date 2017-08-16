// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


import IconAvatars from './MuiComponentExamples/IconAvatars';
import Badge from './MuiComponentExamples/Badge';
import MediaControlCard from './MuiComponentExamples/MediaControlCard';
import RecipeReviewCard from './MuiComponentExamples/RecipeReviewCard';
import Chips from './MuiComponentExamples/Chips';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function MaterialUIShaderTest(props) {
  const classes = props.classes;
  
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs>
  
          <IconAvatars/>
          <Badge/>
          <Chips/>
          
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            
            <MediaControlCard/>
            
          </Paper>
        </Grid>
        <Grid item xs>
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