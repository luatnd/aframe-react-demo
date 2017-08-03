/**
 *
 */

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('assets-progress', {
  schema: {
    target: {type: 'selector', default: '#preloader-modal'}, //the html target selector
    label:  {type: 'string', default: '#preloader-modal .progress-label'}, //html class of label in preloader - used to set the percentage
    debug:  {type: 'boolean', default: false}, //whether or not to enable logging to console
  },
  
  totalAssetCount: 1,
  
  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    
    var data = this.data;  // Component property values.
    var el = this.el;  // Reference to the component's entity.
    
    if (this.data.debug) {
      console.log('[assets-progress] Initialized preloader');
    }
    
    document.querySelector('a-assets').addEventListener('loaded', () => {
      if (this.data.debug) {
        console.info('[assets-progress] All assets loaded');
      }
      
      this.triggerProgressComplete();
    });
    
    var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');
    
    this.totalAssetCount = assetItems.length;
    
    //this.watchPreloadProgress(assetItems);
    
    //if (this.data.disableVRModeUI) {
    //  this.el.setAttribute('vr-mode-ui', 'enabled', 'false');
    //}
  },
  
  triggerProgressComplete: function () {
    
    if (this.data.type === 'bootstrap')
      $(this.data.bar).addClass('progress-bar-success');
    
    this.drawProgress(100);
  },
  
  updateInfo: function(){
    
  },
  
});