import React from 'react';

import {assertRenders} from './AssetsRegister';

/**
 * NOTE: <a-assets> must be a child of a <a-scene>.
 * So that I create this component to manage all assets
 *
 * TODO: Change to redux, can bind asset into this asset component
 * TODO: Build an NPM aframe asset management base on redux
 */
export class Assets extends React.Component {
  render() {
    return (
      <a-assets ref={}>
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
