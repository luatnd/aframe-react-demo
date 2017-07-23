/**
 * AssetsRegister:
 * You need to define `All assets of all component` here
 * Because aframe require all <a-assets> need to be wrap as an directly child of <a-scene>
 */

import {Sky} from '../Sky/Sky';
import {FloorAndWall} from '../FloorAndWall/FloorAndWall';
import {Workspace} from '../Workspace/Workspace';
import {BackWall} from '../Decorator/BackWall';
import {FrontSea} from '../Decorator/FrontSea';
import {Center} from '../Decorator/Center';

export const assertRenders = {
  Sky:          Sky.renderAssets,
  FloorAndWall: FloorAndWall.renderAssets,
  Workspace:    Workspace.renderAssets,
  BackWall:     BackWall.renderAssets,
  FrontSea:     FrontSea.renderAssets,
  Center:       Center.renderAssets,
}
