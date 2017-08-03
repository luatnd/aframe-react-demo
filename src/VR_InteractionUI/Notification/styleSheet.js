import { withStyles, createStyleSheet } from 'material-ui/styles';

export default createStyleSheet(theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}));
