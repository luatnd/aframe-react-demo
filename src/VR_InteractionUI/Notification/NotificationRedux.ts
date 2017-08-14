import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


interface NotificationType {
  open:boolean,
  type:'text' | 'avatar',
  message:string,
  duration:number,
}


const initialState:NotificationType = {
  open: true,
  type: 'text',
  message: '',
  duration: 6000,
}


export const setAttr:any = createAction('SET NOTIFICATION ATTRS', (option:NotificationType) => option);
export const updateAttr:any = createAction('UPDATE NOTIFICATION ATTR', (option:NotificationType) => option);
export const showTextNotification:any = createAction('SHOW TEXT NOTIFICATION', (message:string) => message);
export const showAvatarNotification:any = createAction('SHOW AVATAR NOTIFICATION', (message:string) => message);

export const notificationReducer = combineReducers({
  options: handleActions({

    [setAttr]: (state, action) => ({...initialState, ...action.payload}),
    [updateAttr]: (state, action) => ({...state, ...action.payload}),

    [combineActions(
      showTextNotification,
      showAvatarNotification
    )]: (state, action) => {
      console.log('state, action: ', state, action);

      const message = action.payload;

      return {...state, message}
    },

  }, {...initialState}),
});