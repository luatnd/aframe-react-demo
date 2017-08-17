import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

//import { ReduxInputReducer } from 'components/ReduxInput/ReduxInputRedux';
import { i18nReducer } from "react-redux-i18n";
import { notificationReducer } from "../../VR_InteractionUI/Notification/NotificationRedux";
import { dialogReducer } from "../../VR_InteractionUI/Dialog/DialogRedux";
import { appSettingReducer } from "../../VR_InteractionUI/AppSetting/AppSettingRedux";
import { sceneReducer } from "../../AFrame/MySceneRedux";

export const rootReducer = reduceReducers(
  //ReduxInputReducer,
  combineReducers({
    i18n:         i18nReducer,
    //auth: authReducer,
    scene: sceneReducer,
    notification: notificationReducer,
    dialog: dialogReducer,
    appSetting: appSettingReducer,
  })
);

export const ignorePersistReducers = [
  'notification',
  'dialog',
  'scene',
];