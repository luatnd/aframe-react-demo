/**
 * AssetsRegister:
 * You need to define `All assets of all component` here
 * Because aframe require all <a-assets> need to be wrap as an directly child of <a-scene>
 */

export const assertRenders = {
  Sky:          require('../Sky/Sky').renderAssets,
  FloorAndWall: require('../FloorAndWall/FloorAndWall').renderAssets,
  Workspace:    require('../Workspace/Workspace').renderAssets,
  BackWall:     require('../Decorator/BackWall').renderAssets,
  FrontSea:     require('../Decorator/FrontSea').renderAssets,
  Center:       require('../Decorator/Center').renderAssets,
};
