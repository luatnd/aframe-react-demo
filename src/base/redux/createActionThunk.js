import mapValues from "lodash/mapValues";
import { createAction, handleActions, combineActions } from "redux-actions";

export const clearThunk = createAction('CLEAR THUNK');

/** IdentityFunction */
const Identity = state => state;

/** Create a thunk action
 * Dispatch 2 action
 * - `${type}__STARTED` instantly at the beginning of the action
 * - `${type}__ENDED` receive a promise and dispatch when promise resolve or reject (redux-promise),
 * payloadCreator can be used to generate the promise from input.
 * 
 * - Set `injectState` to true will pass the current state to the payloadCreator function.
 * 
 * Eg.
 
  const fetchExhibitors = createActionThunk(
    "FETCH EXHIBITORS LIST",
    exhibitorsService.getExibitorsList
  );

  dispatch(fetchExhibitors(1))

 * 1. Dispatch `FETCH EXHIBITORS LIST__STARTED` at the beginning of the action.
 * 2. Create a promise `const promise = exhibitorsService.getExibitorsList(1)`.
 * 3. Wait until the promise resolve or reject
 * 4. Dispatch `FETCH EXHIBITORS LIST__ENDED` with the payload returned by the promise.
 */
export const createActionThunk = (type, payloadCreator, metaCreator, injectState = false) => {
  const started = createAction(`${type}__STARTED`);
  const ended   = createAction(`${type}__ENDED`, payloadCreator, metaCreator);

  const action = (...args) => {
    return (dispatch, getState) => {
      dispatch(started(...args));
      return dispatch(ended(...args, injectState ? getState() : undefined));
    }
  };

  action.started = started;
  action.ended = ended;

  return action;
}

/** Action State Handling
 * The state of a thunk action includes:
 * - `fetching`: boolean, is true if the action is running.
 * - `fetchError`: any, is the error returned by the promise.
 * 
 * 1. `thunkHanlder(...actionThunks)`: The reducer that handle the thunk action and assign values.
 * 2. `actionStateInitial`: Initial value for the reducer
 * 
 * Other form of thunkHanlder when the state is a Dictionary of independent items.
 * 1. `thunkDictionaryHandler(getDictIndex, ...actionThunks)`: Only assign values to an item of the state, identified by `getDictIndex(action) => number|string`.
 * 2. `thunkDictionaryAllHandler(...actionThunks)`: Assign values to every single item of the state.
 * 
 * Use these as follow:
 * 
  combineReducers({
    actionState : handleActions({
      ...thunkHandler(myThunkAction1, myThunkAction2),
    }, {
      ...actionStateInitial
    }),
    // other reducers
  })
 */
export const actionStateInitial = {
  fetching: false,
  fetchError: null,
}

export const thunkHandler = (...actionThunks) => {
  const started = combineActions(...actionThunks.map(action => action.started))
  const ended = combineActions(...actionThunks.map(action => action.ended))
  return {
    [clearThunk]: state => ({
      ...actionStateInitial
    }),
    [started]: state => ({
      fetching: true,
      fetchError: null,
    }),
    [ended]: {
      next: (state, action) => ({
        fetching: false,
        fetchError: null,
      }),
      throw: (state, action) => ({
        fetching: false,
        fetchError: action.payload,
      })
    }
  }
}

export const thunkDictionaryHandler = (getDictIndex, ...actionThunks) => {
  const started = combineActions(...actionThunks.map(action => action.started))
  const ended = combineActions(...actionThunks.map(action => action.ended))
  return {
    [clearThunk]: state => ({}),
    [started]: (state, action) => {
      let index = getDictIndex(action);
      return {
        ...state,
        [index]: {
          fetching: true,
          fetchError: null,
        }
      }
    },
    [ended]: {
      next: (state, action) => {
        let index = getDictIndex(action);
        return {
          ...state,
          [index]: {
            fetching: false,
            fetchError: null,
          }
        }
      },
      throw: (state, action) => {
        let index = getDictIndex(action);
        return {
          ...state,
          [index]: {
            fetching: false,
            fetchError: action.payload,
          }
        }
      }
    }
  }
}

export const thunkDictionaryAllHandler = (...actionThunks) => {
  const started = combineActions(...actionThunks.map(action => action.started))
  const ended = combineActions(...actionThunks.map(action => action.ended))
  return {
    [clearThunk]: state => ({}),
    [started]: (state, action) => {
      return mapValues(state, () => ({
        fetching: true,
        fetchError: null,
      }))
    },
    [ended]: {
      next: (state, action) => {
        return mapValues(state, () => ({
          fetching: false,
          fetchError: null,
        }))
      },
      throw: (state, action) => {
        return mapValues(state, () => ({
          fetching: false,
          fetchError: action.payload,
        }))
      }
    }
  }
}

/** Pagination Handling
 * The pagination of a thunk action includes:
 * `count`: number, The total amount of items.
 * `next`: string, The string to next page.
 * `num_page`: number, The amount of page.
 * `previous`: string, The string to previous page.
 * 
 * 1. `thunkPaginationHandler`: The reducer that handle the thunk action and assign values.
 * 2. `paginationInitial`: Initial value for the reducer
 * 
 * Use these as follow:
 * 
  combineReducers({
    pagination : handleActions({
      ...thunkPaginationHandler(myThunkAction),
    }, {
      ...paginationInitial
    }),
    // other reducers
  })
 */
export const thunkPaginationHandler = (...actionThunks) => {
  const ended = combineActions(...actionThunks.map(action => action.ended))
  return {
    [clearThunk]: state => ({ ...paginationInitial }),
    [ended]: {
      next: (state, action) => {
        if (!action.payload) return state;
        const pagination = action.payload.pagination;
        return {
          count:    pagination.count,
          next:     pagination.next,
          num_page: pagination.num_page,
          previous: pagination.previous,
        }
      },
    }
  }
}

export const paginationInitial = {
  count:    0,
  next:     null,
  num_page: 1,
  previous: null,
}

export const paginationThunkReducers = ({
  key,
  fetchAction,
  fetchActionNext,
  handler,
  initialtState = {},
  listActionHanlders = {},
  otherActionStateActions = [],
}) => {
  return {
    pagination: handleActions({
      ...thunkPaginationHandler(
        fetchAction,
        fetchActionNext
      ),
    }, {
      ...paginationInitial
    }),
    actionState: handleActions({
      ...thunkHandler(
        fetchAction,
        fetchActionNext,
        ...otherActionStateActions
      ),
    }, {
      ...actionStateInitial
    }),
    [key]: handleActions({
      [combineActions(
        fetchAction.ended,
        fetchActionNext.ended
      )]: handler,
      ...listActionHanlders
    }, initialtState)
  }
}