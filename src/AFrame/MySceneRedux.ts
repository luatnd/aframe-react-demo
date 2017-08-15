import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


interface NotificationType {
  sceneInstance:Element,
}

const initialState:NotificationType = {
  sceneInstance: null,
}

/**
 * Naming rule (<mean required> [mean optional]):
 * Format:      <Action> [Addition]  <ReducerName>   [Addition of Reducer]
 * Example:     HIDE                  NOTIFICATION
 * Example:     SET                   NOTIFICATION    ATTRS
 * Example:     SHOW      TEXT        NOTIFICATION
 */
export const setSceneInstance = createAction('SET SCENE INSTANCE', (instance:Element) => instance);

export const sceneReducer = combineReducers({
  instance: handleActions({
    [setSceneInstance as any]: (state, {payload}) => {console.log("handle");return payload},
  }, {...initialState}),
});