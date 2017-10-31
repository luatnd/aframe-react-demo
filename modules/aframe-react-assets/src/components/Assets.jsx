/**
 * Assets component for managing AFrame assets
 * See more detail here:
 * https://www.npmjs.com/package/aframe-react-assets
 */

import React from 'react';
import PropTypes from 'prop-types';

const defaultTimeout = 30000;
const defaultInterval = 200;


export default class Assets extends React.PureComponent {
  static propTypes = {
    assets: PropTypes.object,
    timeout: PropTypes.number,
    interval: PropTypes.number,
    debug: PropTypes.bool,
    onLoad: PropTypes.func,
    onLoadingBySize: PropTypes.func,
    onLoadingByAmount: PropTypes.func,
  };
  
  
  // Internal state that does not cause re-render.
  iState = {
    assetsInstance: null,
    current: 0,
    total: 0,
    assetCurrentItem: null,
    idleTimestamp: 0,
  };
  
  componentDidMount() {
    ConsoleLogger.log('Assets Component mounted', 'Assets');
    //console.log('iState.assetsInstance.fileLoader: ', this.iState.assetsInstance.fileLoader);
    //if (this.iState.assetsInstance.fileLoader) {
    //  const mng = this.iState.assetsInstance.fileLoader.manager;
    //
    //  mng.onError = function (a, b) {
    //    console.log("mng onError a, b: ", a, b);
    //  }
    //  mng.onLoad = function (a, b) {
    //    console.log("mng onLoad a, b: ", a, b);
    //  }
    //  mng.onProgress = function (a, b) {
    //    console.log("mng onProgress a, b: ", a, b);
    //  }
    //  mng.onStart = function (a, b) {
    //    console.log("mng onStart a, b: ", a, b);
    //  }
    //}
    
    this.iState.assetsInstance.addEventListener('loaded', () => {
      // Force too complete
      this.props.onLoadingByAmount({
        assetLoaded: this.iState.total,
        assetTotal: this.iState.total,
        assetCurrentItem: this.iState.assetCurrentItem,
      });
      setTimeout(this.props.onLoad(false), 1000);
      
      
      ConsoleLogger.log('All assets were loaded', 'Assets');
      //console.info('And THREE.Cache', THREE.Cache);
    });
  }
  
  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    this.iState.assetsInstance.removeEventListener('loaded');
  }
  
  static getCurrUnixMili() {
    return (new Date()).getTime();
  }
  
  countLoadedAssetItem = (e) => {
    //console.log('countLoadedAssetItem this.iState.current: ', this.iState.current, e, e.target);
    
    this.iState.current++;
    this.iState.assetCurrentItem = e.target;
    
    if (this.props.debug && e.target) {
      console.info('[Assets] loaded: ', e.target);
    }
    
    let currentUnix = Assets.getCurrUnixMili();
    const {interval = defaultInterval} = this.props;
    if (currentUnix - interval > this.iState.idleTimestamp) {
      this.iState.idleTimestamp = currentUnix;
      
      if (this.props.debug) {
        ConsoleLogger.log('Attempt to updateAssetsLoadingInfo', 'Assets');
      }
      
      this.props.onLoadingByAmount({
        assetLoaded: this.iState.current,
        assetTotal: this.iState.total,
        assetCurrentItem: this.iState.assetCurrentItem,
      })
    }
  }
  
  /**
   * NOTE: TODO: This feature has not completed yet;
   */
  updateProgress = (e) => {
    //console.log('xhr: ', e);
    
    let currentUnix = Assets.getCurrUnixMili();
    const {interval = defaultInterval} = this.props;
    if (currentUnix - interval > this.iState.idleTimestamp) {
      this.iState.idleTimestamp = currentUnix;
      this.props.onLoadingBySize({
        assetCurrentLoadedBytes: e.detail.loadedBytes,
        assetCurrentTotalBytes: e.detail.totalBytes ? e.detail.totalBytes : e.detail.loadedBytes
      })
    }
  }
  
  /**
   * Try to Attach "loaded" event listener foreach asset items.
   * "loaded" event name was different from each item
   *
   * @param item React element, eg: <img src=""/>
   * @returns {*}
   */
  getBindingProps = (item) => {
    
    let eventName;
    
    switch (item.type) {
      case 'a-asset-item':
        eventName = 'loaded'; // aframe / threejs event
        return {
          // NOTE: This case is an react component, not a pure HTML so that we need to pass eventListener to `ref`
          ref: ele => {
            ele.addEventListener(eventName, this.countLoadedAssetItem);
            //ele.addEventListener('progress', this.updateProgress);
          },
        };
      
      case 'img':
        eventName = 'onLoad'; // js event
        return {
          [eventName]: this.countLoadedAssetItem,
          //ref: ele => this.assetItemInstances[getId(item)] = ele,
        };
      
      case 'audio':
      case 'video':
        eventName = 'onLoadeddata'; // js event
        //eventName = 'loadeddata'; // aframe event
        return {
          [eventName]: this.countLoadedAssetItem,
          //ref: ele => this.assetItemInstances[getId(item)] = ele,
        };
      
      default:
        console.warn('Un-recognize asset type: ', item.type);
        return {}
    }
  }
  
  // TODO: Support asset management with lazy load
  getAssetsList = () => {
    const {assets = []} = this.props;
    
    const assetItemComponents = Object.keys(assets).map((key) => {
      const componentAssets = this.props.assets[key];
      this.iState.total += componentAssets.length;
      
      return <a-entity key={key} className={key}>
        {componentAssets.map(item => item.hasOwnProperty('type')
          ? React.cloneElement(item, {
              key: item.props.id ? item.props.id : ConsoleLogger.getUnix(),
              //ref: ele => this.assetItems.push(ele),
              ...this.getBindingProps(item), // Bind event listener for this elements
            }
          )
          : null // Some user mis-type comment: [ {/*Asset was commented*/} ] ==> [ {} ] , so this is not valid assets
        )}
      </a-entity>
    });
    
    if (this.props.debug) {
      console.log('Component list to add assets: ', assetItemComponents);
    }
    
    return assetItemComponents;
  }
  
  render() {
    const {timeout = defaultTimeout} = this.props;
    
    return (
      <a-assets {...{timeout}} ref={ele => this.iState.assetsInstance = ele}>
        {this.getAssetsList()}
      </a-assets>
    );
  }
}

class ConsoleLogger {
  static getLocaleTimeStr() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = d.getMilliseconds();
    
    return `${h}:${m}:${s}-${ms}`;
  }
  
  static getUnix() {
    return Math.floor(new Date().getTime() / 1e3);
  }
  
  static log(msg, componentName = "") {
    console.log(`[${componentName}] ${msg} at ${this.getLocaleTimeStr()}`);
  }
}