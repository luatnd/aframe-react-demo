import React from 'react';
import {Entity} from 'aframe-react';
import 'aframe';
import 'babel-polyfill';
import 'aframe-ui-widgets';
//import 'aframe-layout-component';
import 'aframe-html-shader';

import Helper3D from '../../Helper/Helper3D/Helper3D';
import AFrameHelper from '../Helper/AFrameHelper';

import obj_CircleTable_dae from "../../../assets/obj/CircleTable/CircleTable.dae";
import obj_Monitor_obj from "../../../assets/obj/Monitor/my_moninitor.obj";
import obj_Monitor_mtl from "../../../assets/obj/Monitor/my_moninitor.mtl";
import obj_Monitor_dae from "../../../assets/obj/Monitor/my_moninitor.dae";
import obj_Keyboard_obj from "../../../assets/obj/Monitor/my_keyboard.obj";
import obj_Keyboard_mtl from "../../../assets/obj/Monitor/my_keyboard.mtl";
import obj_3DProjector_TurnOn_obj from "../../../assets/obj/IronMan/3DProjector_turn_on.obj";
import obj_3DProjector_TurnOn_mtl from "../../../assets/obj/IronMan/3DProjector_turn_on.mtl";
import obj_3DProjector_TurnOff_dae from "../../../assets/obj/IronMan/3DProjector_turned_off.dae";
import obj_Ironman_dae from "../../../assets/obj/IronMan/IronMan2.dae";



export class Workspace extends React.Component {
  state = {
    projector3DTurnOn: true,
  }

  workspace = {
    circleTable: {
      height:        1.0,
      radiusOutSide: 4.5,
      radiusInSide:  3.0,
      entranceWidth: 2,
    },
    screen:      {
      initialWidth:        1.5, // Screen in 3d model is very large, it's 8 meters screen width, so we scale it down but need to calculate the screen width after scale
      scaleFactor:         1, // Screen in 3d model is very large, need to scale it down
      screensCircleRadius: 4, // From center of workspace to screen, O-x-y plane. Screens are on 1 circle on circle table, so that is on 1 circle, with radius is ...
    },
    keyboard:    {
      initialWidth:   0.46,
      initialHeight:  0.15,
      customY:  0.025,
      screenDistance: 0.6, // Keyboard distance from the screen center to keyboard
    }
  }
  
  btnPowerEle = null;
  
  componentDidMount () {
    this.registerCursorListenner();
    this.registerPowerBtnChange();
  }
  
  /**
   * Auto Calculate position + rotation of screen from center of workspace: 0 0 0 cordinate
   * Then return Entity
   * @param screenPosition IS the relative position of the screen, 0 mean center screen, 1 mean the next screen clockwise, -1 mean the before.
   * @param withKeyBoard If true then include a keyboard for this screen
   * @return React.Component
   */
  getNthScreen = (screenPosition, withKeyBoard = false, screenContent = null) => {
    const screenMargin = 0.2;
    //const deg2rad = Math.PI/180;
    const rad2deg = 180/Math.PI;

    const screensCircleRadius = this.workspace.screen.screensCircleRadius;
    const tableHeight = this.workspace.circleTable.height;
    const ssf = this.workspace.screen.scaleFactor;
    const screenRealWidth = this.workspace.screen.initialWidth * this.workspace.screen.scaleFactor;
    
    const screen_0th = {
      px: 0,
      py: tableHeight, // default
      pz: -screensCircleRadius, // default
      rx: 0, // always 0
      ry: 0, // always change // default
      rz: 0, // always 0
    }
    
    let {px, py, pz, rx, ry, rz} = screen_0th;
  
    /**
     * tan{-1} ( 0.6 / 3,6 )
     * Call O is the center point of screensCircle
     * Call C is the center point of the screen
     * Call R is the right point of the screen
     *
     * var ratio   = Math.tan( myDegrees * deg2rad );
     * var degrees = Math.atan( ratio ) * rad2deg;
     */
    
    const anglesRad_of_COR = Math.atan((screenRealWidth + screenMargin)/ screensCircleRadius); // Why not divide by 2 ????
    const anglesDeg_of_COR = anglesRad_of_COR * rad2deg;
    
    const alphaToRotateDeg = anglesDeg_of_COR * 2 * screenPosition;
    
    //console.log('alphaToRotateDeg: ', alphaToRotateDeg);
    
    ry = alphaToRotateDeg;

    // Render ......
    const position = `${px} ${py} ${pz}`;
    const scale = ssf + ' ' + ssf + ' ' + ssf;
    const rotation = `${rx} ${ry} ${rz}`;

    const keyboardDistance = this.workspace.keyboard.initialHeight + this.workspace.keyboard.screenDistance;
    
    return <Entity rotation={rotation}>
      <Entity {...{position}}>
        
        <Entity obj-model="obj: #obj_Monitor_obj; mtl: #obj_Monitor_mtl" {...{scale}}/>
        {/*<Entity collada-model="#obj_Monitor_dae" {...{position, scale}}/>  //Do not use collada because collada do not support transparent  */}
        
        {withKeyBoard &&
        <Entity
          obj-model="obj: #obj_Keyboard_obj; mtl: #obj_Keyboard_mtl"
          position={`0 ${this.workspace.keyboard.customY} ${keyboardDistance}`}/>}
          
        {screenContent &&
        <Entity position="0 1.115 -0.049"
                rotation="-4.267 0 0"> {/*4.467*/}
          {screenContent}
        </Entity>}
        
      </Entity>
    </Entity>
  }
  
  /**
   * Make some continuously lines to define prohibit section that user can not go through
   * @returns {Object[]}
   */
  makeCircularTableStaticBodyPoints = (inside = true) => {
    let shapePoints = [];
  
    const axisOy = [0, 1, 0];
    
    /**
     * I intent to make the lines on top of table, in the theory, you need to set it equal to table height right !
     */
    const topTableY = this.workspace.circleTable.height + 0.1;
    
    const radius = inside ? this.workspace.circleTable.radiusInSide : this.workspace.circleTable.radiusOutSide;
    const entranceWidth = this.workspace.circleTable.entranceWidth;
    
    const userMinDistance  = inside ? 0.3 : 0.1; // User can not reach this distance
    
    const initialPos = [
      entranceWidth / 2,
      topTableY,
      inside ? radius - userMinDistance : radius + userMinDistance
    ];

    /**
     * Circular table have an entrain to go inside, this entrance width is 2m
     * --> we do not prevent user go through this section, not all 360deg
     * --> it's make a missingAngle
     */
    const step = 20;
    const missingAngle = 2 * Helper3D.toDeg(Math.tanh(initialPos[0] / initialPos[2]));
    const maxAngle = 360 - missingAngle; // Each point was rotate by center O some angle to make a new point
    const rotateAngle = maxAngle/step; // the more smaller angle, the more shape was made, the more smooth circular, the more hardware resource need to take.
    const radAngle = Helper3D.toRad(rotateAngle);

    let prevPoint = {
      x: initialPos[0],
      y: initialPos[1],
      z: initialPos[2]
    };

    shapePoints.push(prevPoint);

    for (let i = 0, l = step; i < l; i++) {
      // Rotate some angle around Oy
      let {x, y, z} = Helper3D.rotate3D([prevPoint.x, prevPoint.y, prevPoint.z], axisOy, radAngle);
      let point = {x, y, z};

      shapePoints.push(point);
      prevPoint = point;
    }

    return shapePoints;
  }

  registerCursorListenner () {
    // Component to change to random color on click.
    let AFRAME = AFRAME || window.AFRAME;
  
    AFRAME.registerComponent('cursor-listener', {
      init: function () {
        var COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'magenta'];
        this.el.addEventListener('click', function (evt) {
          var randomIndex = Math.floor(Math.random() * COLORS.length);
          this.setAttribute('material', 'color', COLORS[randomIndex]);
          console.log('I was clicked at: ', evt.detail.intersection.point);
        });
      }
    });
  }
  
  registerPowerBtnChange = () => {
    let thisComponent = this;
    this.btnPowerEle.el.addEventListener('change', function (e) {
      let value = e.detail.value; // 1 or 0
      
      /**
       * NOTE: 0 mean turn on this this case
       * Because the UI toggle has a bug, so that initial value always be 0, can not change it now
       */
      thisComponent.setState({projector3DTurnOn: value === 0});
    });
  }
  
  /**
   * Make screen content: htmlcontent width: '1000px', height: '430px' equiqvalent to screen size: 2.9m/1.269m
   *
   * How to calculate screen content size:
   * 1. set geometry="primitive: plane; width:XXXX", the geometry_height will be auto calculated by Html shader
   * 2. Set #screenContent_x 's width = XX px
   * 3. Set #screenContent_x 's height = geometry_width / expected_geometry_height / screenContent_width
   *  NOTE:
   *      screen ratio = 1.499 width / 0.656 height
   *      geometry_width = 3meters (but using 2.9 is enough)(known) --> geometry_height = 2.9/1.499*0.656 = 1.269
   *      htmlContentW = 1000px; htmlContentH = 1000 px / 2.9 * 1.269 = 436 px
   *
   * @param {int|null} index screen position; 0 is center, negative is right, positive is left
   * @param {boolean} transparentBg Allow transparent texture
   * @param {number} fps 10 mean 10frame per second, 0.5 mean 1 frame per 2 second.
   * @param {int} debug 10 mean 10frame per second, 0.5 mean 1 frame per 2 second.
   * @returns {XML}
   */
  getScreenContent = (index = null, transparentBg = true, fps = 0, debug = 0) => {
    if (index === null) {
        return null;
    }

    const iid = index < 0 ? 'm' + (-index) : index;

    // NOTE: position rotation already setup at screen generation
    return <a-entity
      geometry="primitive: plane; width:2.96; height:0;" // meterial="ratio:width" will base on geometry width and set the geometry height to auto :(
      material={`
        transparent:${transparentBg};
        side: double;
        shader: html; target: #screenContent_${iid}; fps:${fps}; ratio:width; debug: ${debug};
      `}/>
  }
  
  render() {
    console.log('Workspace rendered');

    const shapePointsInside =  this.makeCircularTableStaticBodyPoints();
    const shapePointsOutside =  this.makeCircularTableStaticBodyPoints(false);
    /**
     * The line order: Inside_start -> Inside_stop -> outside_stop -> outside_start -> Inside_start
     */
    const preventUserPoints = shapePointsInside.concat(shapePointsOutside.reverse(), [shapePointsInside[0]]);
    
    const {projector3DTurnOn} = this.state;
    
    return (
      <Entity {...this.props} className="circleWorkspace">
        
        <Entity className="circleTable">
          <Entity collada-model="#obj_CircleTable_dae" position="0 0 0" rotation="0 0 0" scale="1 1 1"/>
          
          {/*
            Show case: How to prevent move through a mesh:
            Aframe-extra: static-body + dynamic-body will consider all geomeotry and 3d model as an box (it's bounding box)
            If you set "shape:hull", it's will prevent the entrance to go inside the table :(
             So that for the circle / sphere, you need to create a static-body path to prevent user move through, instead of set circle is static body
           */}
          {/*{AFrameHelper.previewShapePoints(preventUserPoints)}*/}
          {AFrameHelper.makeStaticBodyWall_for_XZplane('circularTableWall', preventUserPoints)}
        </Entity>
  
        {/* Is the invisible circle that put screen and anything on, we will rotate this instead of rotate the table */}
        <Entity className="baseCircle">
  
          {/* Is the visible circle table surface: If you wanna another table surface instead of currently BlackCarbon */}
          <Entity className="CircleTableSurfaceOverwrite"/>
          
          <Entity className="screensCircle">
            {this.getNthScreen(0, true, this.getScreenContent(0, true))}
            {this.getNthScreen(1, false, this.getScreenContent(null, true))}
            {this.getNthScreen(-1, false, this.getScreenContent(-1, true))}
            {this.getNthScreen(2, false, this.getScreenContent(2, true))}
            {this.getNthScreen(-2, false, this.getScreenContent(-2, true, 0.5))}
  
            <Entity className="ironMan_3DProjector" position="2.046 1.025 3.125" rotation="0 210 0">
              {projector3DTurnOn
                ? <Entity>
                    <Entity obj-model="obj: #obj_3DProjector_TurnOn_obj; mtl: #obj_3DProjector_TurnOn_mtl" scale="0.1 0.1 0.1"/>
                    <Entity collada-model="#obj_Ironman_dae" scale="0.01 0.01 0.01">
                      <a-animation delay="0" dur="4000"  attribute="rotation" to="0 360 0" repeat="indefinite"/>
                    </Entity>
                  </Entity>
                : <Entity collada-model="#obj_3DProjector_TurnOff_dae" scale="0.1 0.1 0.1"/>
              }

              <Entity className="btnPower" ui-toggle value={0} ref={ele => this.btnPowerEle = ele} position="0.65 0 0.5" rotation="0 75 0"/>
            </Entity>
          </Entity>
          
          <Entity className="decorator">
            <a-entity id="box" cursor-listener geometry="primitive: box;width:0.5;height:0.5;depth:0.5;" material="color: blue" position="-2.046 1.2 3.121"></a-entity>
          </Entity>
        
        </Entity>
      </Entity>
    );
  }
}

export const Assets = [
  //<a-asset-item id="obj_ironman_dae" src="static/obj/IronMan/Ironman.dae"/>,
  <a-asset-item id="obj_3DProjector_TurnOn_obj" src={obj_3DProjector_TurnOn_obj}/>,
  <a-asset-item id="obj_3DProjector_TurnOn_mtl" src={obj_3DProjector_TurnOn_mtl}/>,
  <a-asset-item id="obj_3DProjector_TurnOff_dae" src={obj_3DProjector_TurnOff_dae}/>,
  <a-asset-item id="obj_Ironman_dae" src={obj_Ironman_dae}/>,
  <a-asset-item id="obj_CircleTable_dae" src={obj_CircleTable_dae}/>,
  <a-asset-item id="obj_Monitor_obj" src={obj_Monitor_obj}/>,
  <a-asset-item id="obj_Monitor_mtl" src={obj_Monitor_mtl}/>,
  <a-asset-item id="obj_Monitor_dae" src={obj_Monitor_dae}/>,
  <a-asset-item id="obj_Keyboard_obj" src={obj_Keyboard_obj}/>,
  <a-asset-item id="obj_Keyboard_mtl" src={obj_Keyboard_mtl}/>,
  
  <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>,
];
