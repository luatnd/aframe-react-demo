import { createAction, handleActions, combineActions } from "redux-actions";
import { combineReducers } from 'redux';


export const CameraStatus = {
  onFloor: 'onFloor',
  fallen: 'fallen',
};

const cameraInitialState:any = {
  //position: null,
  status: CameraStatus.onFloor,
}

/**
 * Naming rule (<mean required> [mean optional]):
 * Format:      <Action> [Addition]  <ReducerName>   [Addition of Reducer]
 * Example:     HIDE                  NOTIFICATION
 * Example:     SET                   NOTIFICATION    ATTRS
 * Example:     SHOW      TEXT        NOTIFICATION
 */

/**
 * NOTE: Do not use setSceneInstance because it very heavily to redux, extremely bad effect to performance and buggy
 */
//export const setSceneInstance = createAction('SET SCENE INSTANCE', (instance:Element) => instance);
export const setSceneEnterVRCallBack = createAction('SET ENTER_VR CALLBACK', (callback:() => void) => callback);
export const updateCameraStatus:any = createAction('UPDATE CAMERA STATUS', (status:string) => status);

export const sceneReducer = combineReducers({
  enterVR: handleActions({
    [setSceneEnterVRCallBack as any]: (state, {payload}) => (payload),
  }, null),

  camera: handleActions({
    [updateCameraStatus]: (state, {payload}) => ({status: payload}),
  }, {...cameraInitialState}),

});