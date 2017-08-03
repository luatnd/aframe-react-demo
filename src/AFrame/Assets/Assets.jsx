import React from 'react';
import PropTypes from 'prop-types';

import ConsoleLogger from '../../Helper/ConsoleLogger';
import {registeredAssets} from './AssetsRegister';

/**
 * NOTE: <a-assets> must be a child of a <a-scene>.
 * So that I create this component to manage all assets
 *
 * TODO: Change to redux, can bind asset into this asset component
 * TODO: Build an NPM aframe asset management base on redux
 */
export class Assets extends React.Component {
  static propTypes = {
    updateAssetsLoadingStatus: PropTypes.func,
    updateAssetsCurrentInfo: PropTypes.func,
    updateAssetsLoadingInfo: PropTypes.func,
  };
  
  assetsInstance = null;
  //assetItemInstances = {}; // ref to all asset items
  assetItemComponents;
  
  total = 0;
  current = 0;
  assetCurrentItem;
  
  tmpInterval;
  
  componentDidMount() {
    ConsoleLogger.log('Assets Component mounted', 'Assets');
    //console.log('assetsInstance.fileLoader: ', this.assetsInstance.fileLoader);
    
    this.assetsInstance.addEventListener('loaded', () => {

      this.props.updateAssetsLoadingStatus(false);
      
      ConsoleLogger.log('All assets were loaded', 'Assets');
      //console.info('And THREE.Cache', THREE.Cache);
    });
  
    this.assetItemComponents = Object.keys(registeredAssets).map((key) => {
      const componentAssets = registeredAssets[key];
      this.total += componentAssets.length;
      
      return <a-entity key={key}>
        {componentAssets.map(component => React.cloneElement(
          component,
          {
            key: component.props.id ? component.props.id : ConsoleLogger.getUnix(),
            //ref: ele => this.assetItems.push(ele),
            ...this.getBindingProps(component),
          }
        ))}
      </a-entity>
    });
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    //this.nv.removeEventListener("nv-enter", this.handleNvEnter);
  }
  
  countLoadedAssetItem = (e) => {
    return;
    
    //console.log('countLoadedAssetItem this.current: ', this.current, e, e.target);
  
    this.current++;
    this.assetCurrentItem = e.target;
    
    if (e.target) {
        console.info('[Assets] loaded: ', e.target);
    }
  
    this.tmpInterval = setTimeout(this.props.updateAssetsLoadingInfo({
      assetLoaded: this.current,
      assetTotal: this.total,
      assetCurrentItem: this.assetCurrentItem,
    }), 200);
    
  }
  
  updateProgress = (e) => {
    //console.log('xhr: ', e);
    
    this.tmpInterval = setTimeout(this.props.updateAssetsCurrentInfo({
      assetCurrentLoadedBytes: e.detail.loadedBytes,
      assetCurrentTotalBytes:  e.detail.totalBytes ? e.detail.totalBytes : e.detail.loadedBytes
    }), 200);
  }
  
  getBindingProps = (component) => {
    function getId (component) {
      return component.props.id ? component.props.id : ConsoleLogger.getUnix();
    }
    
    let eventName;

    switch(component.type){
      case 'a-asset-item':
        eventName = 'loaded'; // aframe / threejs event
        return {
          ref: ele => {
            //this.assetItemInstances[getId(component)] = ele;
            ele.addEventListener('loaded', this.countLoadedAssetItem);

            //ele.addEventListener('progress', this.updateProgress);
          },
        };
        
      case 'img':
        eventName = 'onLoad'; // js event
        return {
          [eventName]: this.countLoadedAssetItem,
          //ref: ele => this.assetItemInstances[getId(component)] = ele,
        };
        
      case 'audio':
      case 'video':
        eventName = 'onLoadeddata'; // js event
        //eventName = 'loadeddata'; // aframe event
        return {
          [eventName]: this.countLoadedAssetItem,
          //ref: ele => this.assetItemInstances[getId(component)] = ele,
        };
      
      default:
        console.warn('Un-recognize asset type: ', component.type);
        return {}
    }
  }
  
  render() {
    const {timeout} = this.props;

    return (
      <a-assets {...{timeout}} ref={ele => this.assetsInstance = ele}>
        {this.assetItemComponents}
      </a-assets>
    );
  }
}
