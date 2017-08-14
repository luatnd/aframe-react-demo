import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
import thunk from "redux-thunk";
import promiseMiddleware from 'redux-promise';
import localForage from "localforage";
//import logger from 'redux-logger'
import { clearThunk } from './createActionThunk';
import { rootReducer, ignorePersistReducers } from './rootReducer';


/** Devtools */
const composeEnhancers = process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: "MY APP",
      actionsBlacklist: []
    })
  : compose;

/** Compose & Middleware */
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,              // redux-thunk
    promiseMiddleware,  // redux-promise
  ),
  autoRehydrate(),      // redux-persist: restore data from storage
);

/**
 * Store creation
 */
export const store = createStore(rootReducer, undefined, enhancer);


/**
 * Load translation
 */
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from "react-redux-i18n";
import { translationsObject } from '../translations/translationsObject'

const DEFAULT_LOCALE = 'en';

syncTranslationWithStore(store);
//store.dispatch(loadTranslations(translationsObject)); // Move to rehydrationPromise section
store.dispatch(setLocale(DEFAULT_LOCALE));

/**
 * Load and save only some key was defined, [] mean no keys was save
 * Because blacklist and white list have some bug so that we use this filer to make blacklist
 */
const getEmptyTransformFilters = (ignoredReducerNames) => {
  return ignoredReducerNames.map(name => createFilter(name, []));
}

export const rehydrationPromise = new Promise(resolve => {
  
  // persistStore<State>(store: Store<State>, persistorConfig?: PersistorConfig, onComplete?: OnComplete<any>): Persistor;
  persistStore(
    store,
    {
      // blacklist: ['toast'],
      // whitelist: ['someTransientReducer'],
      transforms: getEmptyTransformFilters(ignorePersistReducers),
      storage: localForage
    },
    () => {
      /** Callback when rehydration completed */
      console.log("Rehydration complete");
      
      store.dispatch(loadTranslations(translationsObject)); // reload cached lang, and lang translation
      store.dispatch(clearThunk());
      resolve();
    }
  );
});

if (module.hot) {
  module.hot.accept('../translations/translationsObject', () => {
    store.dispatch(loadTranslations(require('../translations/translationsObject').translationsObject));
  });
}
