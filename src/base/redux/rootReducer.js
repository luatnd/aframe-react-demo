import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

//import { ReduxInputReducer } from 'components/ReduxInput/ReduxInputRedux';
import { i18nReducer } from "react-redux-i18n";
import { notificationReducer } from "../../VR_InteractionUI/Notification/NotificationRedux";
import { dialogReducer } from "../../VR_InteractionUI/Dialog/DialogRedux";
import { sceneReducer } from "../../AFrame/MySceneRedux";

export const rootReducer = reduceReducers(
  //ReduxInputReducer,
  combineReducers({
    i18n:         i18nReducer,
    //auth: authReducer,
    notification: notificationReducer,
    dialog: dialogReducer,
    scene: sceneReducer,
  })
);

export const ignorePersistReducers = [
  'notification',
  'dialog',
  'scene',
];