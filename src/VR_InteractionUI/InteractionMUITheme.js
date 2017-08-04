import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

/**
 * Overwrite Material theme to glassy feeling.
 * Apply for all VR_InteractionUI
 */
export default createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        //color: 'white',
      },
    },
  },
});