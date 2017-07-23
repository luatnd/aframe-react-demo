
### Installation

To get started:

```bash
npm install
npm start
```

To publish to GitHub Pages:

```bash
npm run publish
```

## Develop
### Assets manager

1. Declare your assets at your component like that:
    Sky.jsx:

    ```
    import imgSky from "../../../assets/img/sky.jpg";
    
    export class Sky extends React.Component {
      static renderAssets = () => (
        <Entity key="Sky">
          <img id="sky" src={imgSky} alt="sky"/>
        </Entity>
      )
    
      render() {
        return (
          <Entity {...this.props}>
            <a-sky className="sky" src="#sky" rotation="0 0 0"/>
          </Entity>
        );
      }
    }
    ```

2. Load your assets into <a-assets> by defining here: `src/Scene/Assets/AssetsRegister.js`, aframe asset manager will take care the rest
AssetsRegister.js
```
export {Sky} from '../Sky/Sky';
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
<a-assets> must be a direct child of a <a-scene>
So that when you do `nested` react Components, you need to find a way to put your component's asset as a child of <a-assets> in the root Scene 


## The aframe-react-boilerplate
This boilerplate was created from `aframe-react-boilerplate`
It's a boilerplate for building virtual reality experiences with [A-Frame](https://aframe.io) and React with [aframe-react](https://github.com/ngokevin/aframe-react).
