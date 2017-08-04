import { withStyles, createStyleSheet } from 'material-ui/styles';

export default createStyleSheet(theme => ({
  controlBtnContainer: {
    position: 'absolute', right: '20px', top: '20px',
    background: "transparent",
    zIndex: 9999,
  },
  controlBtn: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,.25)',
    fontSize: '36px',
    marginLeft: '15px',
    padding: '6px 9px',
    minWidth: '36px',
    color: 'white',
  },
  
  controlIcon: {}, // Defined here
  
  '@media (min-width: 1024px)': {
    controlIcon: {}, // NOTE: It's a bug that you must define it here to be included bellow
    controlBtn: {
      '& svg$controlIcon': {
        width: '36px',
        height: '36px',
      },
    }
  }
}));
