### Introduction
I took a look at Aframe and said wow about it features.

But a question was raised in my mind: **"So what is VR can do right now? Is it suitable for widely production/commerce use?"**

After took a quick research about: ReactVR, Aframe, Three.js, elevr ...

I chose Aframe to make a VR workspace.

Aframe has large amount of demos, its syntax is something look like html, jsx, very familiar.


### Which Aframe's features were demonstrate in this demo

* React Asset Management System (RAMS) —> Specify your asset at your component and then `RAMS` automatically collect this asset into single <a-assets/>
* Lightning in AFrame
* 360deg image sky
* Basic physical handling: User can not go through the wall or any physical object, user can jump
* Basic physical handling for: Floor and wall is box and plane with texture
* Physical system handling with complex shape, like the center circular table in this case. 
* Custom camera (player) distance to the static-body shape
* Loading 3D model: gltf, Collada, obj, exported from Blender
* Basic loop animation, no timeline.
* Player cursor interact with some object
* Dialog notification
* Display HTML content (by Material UI) into VR scene

TODO: 
* Implement lazy-load for some heavily model --> Not sure about how Aframe handle the 12MB Drone166 3D models in my demo
* Optimize UX on mobile device


### Libraries 
* VR library by `AFrame`, base on `Threejs`
* 3D model was created by `Blender`, and some free model on internet (see Credits section)
* `React`
* State management with `Redux`
* Typesafe coding with some `Typescript` language, and `ES6`
* Code quality with `ESLint` ~~+ TSLint~~
* ~~UnitTest by JEST~~
* WebUI by `Material-UI` (customized to glassy feeling theme)
* CSS in JS by `JSS`
* Some of libraries for `Aframe` (see Credits section)

### Warning
This is a quick demo, so the code somewhere are not refactored and optimized, be careful and read the Aframe's official documentation once again before you use it in your production 


### Installation

To get started development:

```bash
yarn install
yarn start
```

To publish to GitHub Pages:

```bash
npm run publish
```

## Develop
### Assets manager for React with Aframe

1. Declare your assets at your Assets component like that:
    Sky.jsx:

    ```
    import imgSky from "../../../assets/img/sky.jpg";
    import videoMilkyWay from "../../../assets/video/videoMilkyWay360.mp4";
    
    export const Assets = [
      <img id="sky" src={imgSky} alt="sky"/>,
      <video id="videoMilkyWay" src={videoMilkyWay}/>,
    ];
        
    export class Sky extends React.Component {    
      render() {
        return (

          <Entity>
            <a-sky className="sky" src="#sky" rotation="0 0 0"/>
          </Entity>

        );
      }
    }
    ```

2. Load your assets into <a-assets> by defining here: `src/Scene/Assets/AssetsRegister.js`, aframe asset manager will take care the rest
AssetsRegister.js
```
export const registeredAssets = {
  ...,
  Sky: require('../Sky/Sky').Assets,
  ...,
};
```

3. Did you ever ask why we need to defined assets like that ?
• Why I need to use <a-assets> instead of direcly include my asset url?
For better performance, a-frame using assets manager (<a-assets>) to manage all your asset. 
Your asset item is loaded 1 times only by an XHR request, and then you can use it everywhere, whatever times.
If you do not do that, yoru assets will be load n-times. For example this will load Drone166.dae by 2 separate xhr request:
```
    <Entity collada-model="./assets/obj/Drone166.dae" position="5 1.5 -3" rotation="0 0 0"/>
    <Entity collada-model="./assets/obj/Drone166.dae" position="5 1.5 2" rotation="0 180 0"/>
```
• Why I need to use AssetsRegister?
Aframe specify that: **<a-assets> must be a direct child of a <a-scene>**
So that when you do `nested` react Components, you need to find a way to put your component's asset as a child of <a-assets> in the root Scene. That's why! 

```
TODO: Migrate AframeReact Asset managements to npm package
```

## The aframe-react-boilerplate
This boilerplate was created from `aframe-react-boilerplate`
It's a boilerplate for building virtual reality experiences with [A-Frame](https://aframe.io) and React with [aframe-react](https://github.com/ngokevin/aframe-react).

But for this project, you need to eject it and customize some webpack configurations.
If you need a full control, plz use create-react-app then do implement yourself.  


# TypeScript config:
To working with Three.js, you need to add the lib:
tsconfig.json
```
{
  "compilerOptions": {
    ...
    "lib": [ "es2015", "dom" ]
  },
  ...
}
```

# Webpack addition config:
To support decorator, you need to:

webpack.config.dev.js
```
  {
    ...
    loader: 'babel',
    query: {
      ...

      "presets": [ "react" ],
      "plugins": [
        "transform-decorators-legacy"
      ],

      ...
    }
  },
```

# Deployment

~~Prerequisite:~~
*~~nginx container is running~~
* ~~aframe_react_web_source container is running~~
* ~~you can see the `Makefile` is present: `ls -l Makefile`~~

```
make git_pull && make deploy
```

----
--> Moved to heroku

# Credits
Some of library and 3D models is from internet, thanks to awesome works of:

**// TODO: Update the credits list**

# Other:
A sense physicall system debugging is turned on by default (On Firefox / Safari.)
For Chrome, you need to temporary modify the: node_modules/aframe-physics-system/src/system/physics.js:25
 { default: false -> true },
