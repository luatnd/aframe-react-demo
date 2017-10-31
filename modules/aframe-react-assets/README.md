[![npm](https://badge.fury.io/js/aframe-react-assets.svg)](https://www.npmjs.com/package/aframe-react-assets)

### Introduce
A React component for smart managing your AFrame VR assets. You can declare your assets at your React component.

If you need an example of Aframe with React, I've made a real demo for Aframe, include implementation of this package.
Just take a look at https://github.com/luatnd/aframe-react-demo

### The problem why you need to use this package

##### TL;DR
> `Aframe assets manager system` require you too put all your assets inside _only one_ `<a-assets>` tag in your app AND a <a-assets> must be the direct child of `<a-scene>`.
But when you break your very big layout into so many nested React components, you need to find a way to put your assets at your components to ensure **_component oriented_** spirit of React while stay being conflict with `Aframe assets manager system`. Using `aframe-react-assets` is a good solution for you. 

You can skip the detail and jump to [How](#how) section if you aren't interested in the detail of problem.


##### Detail of the problem

<details>

This is a good HTML section for Aframe, 
we'll take about migrating the `Sky` section and its relate assets in to React component:

```html
<a-scene>
     <!-- Aframe Asset management system. -->
    <a-assets>
    
        <!-- <Sky/> React component's assets: -->
        <img id="sky" src="assets/img/sky.jpg" alt="Sky Component's asset #sky"/>
        <video id="videoMilkyWay" src="assets/img/videoMilkyWay.mp4"/>

        <!-- Other Component Assets -->
        <a-asset-item id="horse-obj" src="horse.obj"></a-asset-item>
        <a-asset-item id="horse-mtl" src="horse.mtl"></a-asset-item>
        <a-mixin id="giant" scale="5 5 5"></a-mixin>
        <audio id="neigh" src="neigh.mp3"></audio>
        <img id="advertisement" src="ad.png">
        <video id="kentucky-derby" src="derby.mp4"></video>
    </a-assets>

    <a-entity class="camera" camera=""></a-entity>
    
    <Entity>
    
        <!-- This will be <Sky/> Component -->
        <Entity className="theSky">
            <a-sky className="sky" src="#sky" rotation="0 0 0"/>
            <!-- ... more content ... -->
            <!-- ... more content ... -->
            <!-- ... more content ... -->
        </Entity>
        <!--End Sky component-->


        <Light/>
        <FloorAndWall/>
        
        <Entity className="advertise">
            <a-plane src="#advertisement"></a-plane>
            <a-sound src="#neigh"></a-sound>
            <a-entity geometry="primitive: plane" material="src: #kentucky-derby"></a-entity>
            <a-entity mixin="giant" obj-model="obj: #horse-obj; mtl: #horse-mtl"></a-entity>
        </Entity>

    </Entity>
</a-scene>
```

So if you create Aframe with React, you need to divide your Aframe HTML into some small component.

```html
<Entity className="theSky">
    <a-sky className="sky" src="#sky" rotation="0 0 0"/>
    <!-- ... more content ... -->
    <!-- ... more content ... -->
    <!-- ... more content ... -->
</Entity>
``` 
into this:
```html
<Sky/>
```

So what about the Sky assets ?
```html
<img id="sky" src="assets/img/sky.jpg" alt="Sky Component's asset #sky"/>
<video id="videoMilkyWay" src="assets/img/videoMilkyWay.mp4"/>
```

AFrame recommend you to put your assets "**inside**" the <a-assets> 
_(You might read the TL;DR section again)_

You can **not** do like this:

Sky.jsx:
```jsx harmony
<Entity className="theSky">
    {/* Aframe do not recommend you put your assets here: */}
    <img id="sky" src="assets/img/sky.jpg" alt="Sky Component's asset #sky"/>
    <video id="videoMilkyWay" src="assets/img/videoMilkyWay.mp4"/>

    <a-sky className="sky" src="#sky" rotation="0 0 0"/>
    <!-- ... more content ... -->
    <!-- ... more content ... -->
    <!-- ... more content ... -->
</Entity>
```

Because:
1. AFrame assets manager system rules, Read the [TL;DR](#tldr)
2. If your react component was re-render, browser will re-make a new request to load assets _again_. 
   This is redundant. Imagine your component contain 10 assets, and component will be re-render every second. How bad that will be ?
3. Use Aframe asset manager system is a most efficient way to use your assets 

</details>

### How
How to use this plugin

**0.. Install plugin**
```shell
yarn add aframe-react-assets
```

**1.. Declare your `static Assets` array at your component:**

```jsx harmony
import imgSky from "assets/img/sky.jpg";
import videoMilkyWay from "assets/img/videoMilkyWay.mp4";

export default class Sky extends React.Component {
  static Assets = [
    <img id="sky" src={imgSky} alt="sky"/>,
    <video id="videoMilkyWay" src={videoMilkyWay}/>
  ];
  
  render() {
    return (
      <Entity {...this.props}>
        <a-sky className="sky" src="#sky" rotation="0 0 0"/>
      </Entity>
    );
  }
}
```

**2.. Create an `rootAssets.js` like this:**

rootAssets.js
```jsx harmony
export default {
  // [ComponentName:string]: Your declared Assets array
  Sky:          require('../Sky/Sky').default.Assets,
  FloorAndWall: require('../FloorAndWall/FloorAndWall').default.Assets,
  Workspace:    require('../Workspace/Workspace').default.Assets,
  BackWall:     require('../Decorator/BackWall').default.Assets,
  FrontSea:     require('../Decorator/FrontSea').default.Assets,
  Center:       require('../Decorator/Center').default.Assets,
  Light:        require('../Light/Light').default.Assets,
};
```

**3.. Use `Assets`:**

MyScene.jsx:
```jsx harmony
import {Entity, Scene} from 'aframe-react';
import Assets from 'aframe-react-assets';
import rootAssets from 'path/to/rootAssets.js';

export default class MyScene extends React.Component {
  render () {
    return <Scene>
      {/* Use assets here */}
      <Assets 
        assets={rootAssets}
        timeout={4e4}
        interval={200}
        debug={true}
        onLoad={this.updateAssetsLoadingStatus}
        onLoadingBySize={this.updateAssetsCurrentInfo}
        onLoadingByAmount={this.updateAssetsLoadingInfo}
      />
             
      <Entity camera="userHeight: 2; fov: 80;"/>
      <Entity>
         <Sky/>
         <Light/>  
         <FloorAndWall/>
         <Workspace/>

         <Entity className="decorator">
           <BackWall/>
           <FrontSea/>
           <Center/>
         </Entity>
         
       </Entity>
     </Scene>
  }
}
```
### Assets Props

##### assets: object
* See `rootAssets.js` above 

##### timeout: number
* Stop loading pending/waiting assets and consider the loading was all successful when this value was reached, in milliseconds.
* @default 30000

##### interval: number
 * The interval duration in milliseconds that this component will do update via `event handle` on*() bellow
 * Example: onLoadingByAmount() will be triggered each 200ms (default)
 *
 * @default 200
 
##### debug: boolean
 * Turn on console.log this component activities

##### onLoad(`status: boolean`): void
 * When `<a-assets/>` was start loading its assets: `onLoad(true)` was triggered.
 * When all assets was loaded or exceed `timeout` props: `onLoad(false)` was triggered.
 
##### onLoadingBySize(`{assetCurrentLoadedBytes: number, assetTotalBytes: number}`): void
 * onLoadingBySize was triggered each `interval` milliseconds. See `interval` props.
 * You can calculate current progress by percent: 
    `const currentPercent = assetCurrentLoadedBytes / assetTotalBytes * 100;`
 * NOTE: TODO: This feature has not completed yet;
 * NOTE: Choose and use only one onLoading*() handle, because they're using same interval manager

##### onLoadingByAmount(`{assetLoaded: number, assetTotal: number, assetCurrentItem: object}`):void
 * onLoadingByAmount was triggered each `interval` milliseconds. See `interval` props.
 * Update loading info every `interval` milliseconds
    * `assetLoaded`: Number of successfully loaded assets,
    * `assetTotal`: Total amount of all your assets,
    * `assetCurrentItem`: The current loaded assets, value is the html element
* NOTE: Choose and use only one onLoading*() handle, because they're using same interval manager


### Contribution
You're very welcome. This package is an just quick initial idea, for a production app, this plugin is lacking:
* Track how many bytes assets was loaded (there was a draft version inside this package)
* Code splitting support
