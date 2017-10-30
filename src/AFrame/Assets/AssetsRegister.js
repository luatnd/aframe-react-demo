/**
 * AssetsRegister:
 * You need to define `All assets of all component` here
 * Because aframe require all <a-assets> need to be wrap as an directly child of <a-scene>
 */

export default {
  // New assets management method (recommended)
  // [ComponentName:string]: AssetsArray (see Sky component as an example)
  Sky:          require('../Sky/Sky').default.Assets,
  FloorAndWall: require('../FloorAndWall/FloorAndWall').default.Assets,
  
  // Old assets management method
  Workspace:    require('../Workspace/Workspace').Assets,
  BackWall:     require('../Decorator/BackWall').Assets,
  FrontSea:     require('../Decorator/FrontSea').Assets,
  Center:       require('../Decorator/Center').Assets,
  Light:        require('../Light/Light').Assets,
};
