import React from 'react';
import PropTypes from 'prop-types';

const defaultTimeout = 30000;
const defaultInterval = 200;

/**
 * NOTE: <a-assets> must be a child of a <a-scene>.
 * So that I create this component to manage all assets
 */
export default class Assets extends React.Component {
  static propTypes = {
    /**
     * Asset list
     */
    assets: PropTypes.object,
    
    /**
     * Stop loading assets and run the app when this value was reached, in milliseconds.
     * @default 30000
     */
    timeout: PropTypes.number,
    
    /**
     * The interval duration in milliseconds that this component will do update via props *Handle() bellow
     * Example: loadingInfoHandle() will be run each 200ms (default)
     *
     * @default 200
     */
    interval: PropTypes.number,
    
    /**
     * Turn on console.log this component activities
     */
    debug: PropTypes.bool,
    
    /**
     * loadingStatusHandle(status:boolean): A event handle callback: Was called with
     *    status=true when <assets/> was start loading,
     *    status=false when all assets was loaded
     */
    loadingStatusHandle: PropTypes.func,
  
    /**
     * currentInfoHandle({assetCurrentLoadedBytes, assetTotalBytes})
     * assetCurrentLoadedBytes
     * assetTotalBytes
     * You can calculate current progress by percent: const currentPercent = assetCurrentLoadedBytes / assetTotalBytes * 100;
     */
    currentInfoHandle: PropTypes.func,
  
    /**
     * loadingInfoHandle({assetLoaded, assetTotal, assetCurrentItem})
     * Update loading info every `interval` milliseconds
     *  assetLoaded: Number of successfully loaded assets,
     *  assetTotal: Total amount of all your assets,
     *  assetCurrentItem: The current loaded assets, value is the html element
     */
    loadingInfoHandle: PropTypes.func,
  };
  
  assetsInstance = null;
  total = 0;
  current = 0;
  assetCurrentItem;
  
  idleTimestamp = 0;
  
  shouldComponentUpdate() {
    // Because we bind event to element so that do not re-render this component
    return false;
  }
  
  componentDidMount() {
    ConsoleLogger.log('Assets Component mounted', 'Assets');
    //console.log('assetsInstance.fileLoader: ', this.assetsInstance.fileLoader);
    //if (this.assetsInstance.fileLoader) {
    //  const mng = this.assetsInstance.fileLoader.manager;
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
    
    this.assetsInstance.addEventListener('loaded', () => {
      // Force too complete
      this.props.loadingInfoHandle({
        assetLoaded: this.total,
        assetTotal: this.total,
        assetCurrentItem: this.assetCurrentItem,
      });
      setTimeout(this.props.loadingStatusHandle(false), 1000);
      
      
      ConsoleLogger.log('All assets were loaded', 'Assets');
      //console.info('And THREE.Cache', THREE.Cache);
    });
  }
  
  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    //this.nv.removeEventListener("nv-enter", this.handleNvEnter);
  }
  
  static getCurrUnixMili() {
    return (new Date()).getTime();
  }
  
  countLoadedAssetItem = (e) => {
    //console.log('countLoadedAssetItem this.current: ', this.current, e, e.target);
    
    this.current++;
    this.assetCurrentItem = e.target;
    
    if (this.props.debug && e.target) {
      console.info('[Assets] loaded: ', e.target);
    }
    
    let currentUnix = Assets.getCurrUnixMili();
    const {interval = defaultInterval} = this.props;
    if (currentUnix - interval > this.idleTimestamp) {
      this.idleTimestamp = currentUnix;
      
      if (this.props.debug) {
        ConsoleLogger.log('Attempt to updateAssetsLoadingInfo', 'Assets');
      }
      
      this.props.loadingInfoHandle({
        assetLoaded: this.current,
        assetTotal: this.total,
        assetCurrentItem: this.assetCurrentItem,
      })
    }
  }
  
  updateProgress = (e) => {
    //console.log('xhr: ', e);
    
    let currentUnix = Assets.getCurrUnixMili();
    const {interval = defaultInterval} = this.props;
    if (currentUnix - interval > this.idleTimestamp) {
      this.idleTimestamp = currentUnix;
      this.props.currentInfoHandle({
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
      this.total += componentAssets.length;
      
      return <a-entity key={key}>
        {componentAssets.map(item => React.cloneElement(
          item,
          {
            key: item.props.id ? item.props.id : ConsoleLogger.getUnix(),
            //ref: ele => this.assetItems.push(ele),
            ...this.getBindingProps(item), // Bind event listener for this elements
          }
        ))}
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
      <a-assets {...{timeout}} ref={ele => this.assetsInstance = ele}>
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