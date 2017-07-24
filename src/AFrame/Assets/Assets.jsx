import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {assertRenders} from './AssetsRegister';

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
  };
  
  assetsInstance = null;
  
  componentDidMount = () => {
    console.log('[Assets] Assets Component mounted at ', moment().format('HH[h]mm[m]ss_SSS'));

    this.assetsInstance.addEventListener('loaded', () => {
      this.props.updateAssetsLoadingStatus(false);
      console.log('[Assets] All assets were loaded!', moment().format('HH[h]mm[m]ss_SSS'));
    });

  }
  
  /**
   * TODO:
   *    ADD indicator: https://github.com/aframevr/aframe/issues/423
   */
  render() {
    return (
      <a-assets ref={ele => this.assetsInstance = ele}>
        {Object.keys(assertRenders).map((key) => {
          const renderer = assertRenders[key];
          if (renderer === undefined) {
            console.error(`Missing assetRenderer for ${key}`);
  
            return null;
          } else {
            return renderer();
          }
        })}
      </a-assets>
    );
  }
}
