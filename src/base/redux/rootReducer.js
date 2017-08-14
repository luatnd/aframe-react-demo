import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

//import { ReduxInputReducer } from 'components/ReduxInput/ReduxInputRedux';
import { i18nReducer } from "react-redux-i18n";
import { notificationReducer } from "../../VR_InteractionUI/Notification/NotificationRedux";

export const rootReducer = reduceReducers(
  //ReduxInputReducer,
  combineReducers({
    i18n:         i18nReducer,
    //auth: authReducer,
    notification: notificationReducer,
  })
);

export const ignorePersistReducers = [
  'notification',
];