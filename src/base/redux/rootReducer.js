import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

//import { ReduxInputReducer } from 'components/ReduxInput/ReduxInputRedux';
import { i18nReducer } from "react-redux-i18n";


export const rootReducer = reduceReducers(
  //ReduxInputReducer,
  combineReducers({
      i18n: i18nReducer,
      //auth: authReducer,
      //toast: toastReducer,
      //tradeshow: tradeShowReducer,
      //exhibitors: exhibitorsReducer,
      //events: eventsReducer,
      //dating: datingReducer,
      //menu: menuReducer,
  })
);
