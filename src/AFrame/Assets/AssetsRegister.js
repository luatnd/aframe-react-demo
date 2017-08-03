/**
 * AssetsRegister:
 * You need to define `All assets of all component` here
 * Because aframe require all <a-assets> need to be wrap as an directly child of <a-scene>
 */

export const registeredAssets = {
  Sky:          require('../Sky/Sky').Assets,
  FloorAndWall: require('../FloorAndWall/FloorAndWall').Assets,
  Workspace:    require('../Workspace/Workspace').Assets,
  BackWall:     require('../Decorator/BackWall').Assets,
  FrontSea:     require('../Decorator/FrontSea').Assets,
  Center:       require('../Decorator/Center').Assets,
  Light:        require('../Light/Light').Assets,
};
