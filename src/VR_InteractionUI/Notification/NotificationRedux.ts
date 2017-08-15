import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


interface NotificationType {
  open:boolean,
  type:'text' | 'avatar',
  message:any, // String or React Component
  duration:number,
}


const initialState:NotificationType = {
  open: false,
  type: 'text',
  message: '',
  duration: 6000,
}

/**
 * Naming rule (<mean required> [mean optional]):
 * Format:      <Action> [Addition]  <ReducerName>   [Addition of Reducer]
 * Example:     HIDE                  NOTIFICATION
 * Example:     SET                   NOTIFICATION    ATTRS
 * Example:     SHOW      TEXT        NOTIFICATION
 */
export const setAttr = createAction('SET NOTIFICATION ATTRS', (option:NotificationType) => option);
export const updateAttr:any = createAction('UPDATE NOTIFICATION ATTR', (option:NotificationType) => option);
export const hideNotification:any = createAction('HIDE NOTIFICATION');
export const showTextNotification:any = createAction('SHOW TEXT NOTIFICATION', (message:string) => ({message, type: 'text'}));
export const showAvatarNotification:any = createAction('SHOW AVATAR NOTIFICATION', (message:any) => ({message, type: 'avatar'}));

export const notificationReducer = combineReducers({
  options: handleActions({

    [setAttr as any]: (state, action) => ({...initialState, ...action.payload}),
    [updateAttr]: (state, action) => ({...state, ...action.payload}),
    [hideNotification]: (state, action) => ({...state, open: false}),

    [combineActions(
      showTextNotification,
      showAvatarNotification
    )]: (state, action) => ({
      ...state,
      open: true,
      type: action.payload.type,
      message: action.payload.message
    }),

  }, {...initialState}),
});