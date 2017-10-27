import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


interface DialogOptionsType {
  open:boolean,
  stats:boolean,
}


const initialState:DialogOptionsType = {
  open: false,
  stats: false,
}

/**
 * Naming rule (<mean required> [mean optional]):
 * Format:      <Action> [Addition]  <ReducerName>   [Addition of Reducer]
 * Example:     HIDE                  NOTIFICATION
 * Example:     SET                   NOTIFICATION    ATTRS
 * Example:     SHOW      TEXT        NOTIFICATION
 */

export const hideAppSetting:any = createAction('HIDE APP SETTING');
export const showAppSetting:any = createAction('SHOW APP SETTING');
export const setStatsValue:any = createAction('SET STAT VALUE', (val:boolean) => val);

export const appSettingReducer = combineReducers({
  options: handleActions({
    [hideAppSetting]: (state:any, action:any) => ({...state, open: false}),
    [showAppSetting]: (state:any, action:any) => ({...state, open: true}),
    [setStatsValue]: (state:any, {payload}:any) => ({...state, stats: payload}),
  }, {...initialState}),
});