export default {
  controlBtnContainer: {
    position: 'absolute', right: '25px', bottom: '20px',
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
  controlIconVR: {
    // 24px is the default size of controlIcon
    opacity: 0, width: '24px', height: '24px', lineHeight: '24px'
  },
  
  '@media (min-width: 1024px)': {
    controlIcon: {}, // NOTE: It's a bug that you must define it here to be included bellow
    controlIconVR: {},
    controlBtn: {
      '& svg$controlIcon, & $controlIconVR': {
        width: '36px',
        height: '36px',
        lineHeight: '36px',
      },
    }
  }
};
