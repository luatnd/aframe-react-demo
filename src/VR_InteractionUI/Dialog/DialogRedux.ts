import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


interface DialogOptionsType {
  open:boolean,
  message:any, // String or React Component
}


const initialState:DialogOptionsType = {
  open: false,
  message: '',
}

/**
 * Naming rule (<mean required> [mean optional]):
 * Format:      <Action> [Addition]  <ReducerName>   [Addition of Reducer]
 * Example:     HIDE                  NOTIFICATION
 * Example:     SET                   NOTIFICATION    ATTRS
 * Example:     SHOW      TEXT        NOTIFICATION
 */

export const hideDialog:any = createAction('HIDE DIALOG');
export const showDialog:any = createAction('SHOW DIALOG', (options:DialogOptionsType) => options);

export const dialogReducer = combineReducers({
  options: handleActions({
    [hideDialog]: () => initialState,
    [showDialog]: (state, action) => ({
      open: true,
      message: action.payload.message
    }),
  }, {...initialState}),
});