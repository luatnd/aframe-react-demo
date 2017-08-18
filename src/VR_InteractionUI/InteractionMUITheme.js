import { createMuiTheme } from 'material-ui/styles';

/**
 * Overwrite Material theme to glassy feeling.
 * Apply for all VR_InteractionUI
 *
 * NOTE: Be carefully to DRY
 */
const glassyDarkStyle = {
  color: '#cacaca',
  backgroundColor: 'rgba(0,0,0,0.6)',
};

export default createMuiTheme({
  overrides: {
    
    MuiButton: {
      // Name of the styleSheet
      root: {
        ...glassyDarkStyle,
      },
    },
    
    MuiSnackbarContent: {
      root: glassyDarkStyle,
    },

    MuiListItemSecondaryAction: {
      root: {
        top: '24px'
      }
    }
  },
});