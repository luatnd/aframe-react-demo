import 'aframe';

import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import imgPuy from "../assets/img/puydesancy.jpg";
import imgSky from "../assets/img/sky.jpg";
import imgFloorWooden from "../assets/img/wooden_panels-1280x720.jpg";
import videoMilkyWay from "../assets/video/Milky Way over Hunters Beach 360° timelapse video.mp4";
//import obj_e45AAirCraft_obj from "../assets/obj/e45aircraft/E 45 Aircraft_obj.obj";
//import obj_e45AAirCraft_mtl from "../assets/obj/e45aircraft/E 45 Aircraft_obj.mtl";
//import obj_Drone166_obj from "../assets/obj/Drone166/Drone166.obj";
//import obj_Drone166_mtl from "../assets/obj/Drone166/Drone166.mtl";
import obj_Drone166_img from "../assets/obj/Drone166/Drone1.png";
import obj_spacecraft_png from "../assets/obj/spacecraft/wr1-pn8.png";
//import obj_spacecraft_png from "../assets/obj/spacecraft/wr1.png";
//import obj_capShield from "../assets/obj/capShield/Captain America shield.obj";
//import fnt_monoid from "../assets/font/Monoid.fnt";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }
  
  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  
  render() {
    return (
      <Scene debug>
        <a-assets>
          <img id="puy" src={imgPuy} alt="puy"/>
          <img id="sky" src={imgSky} alt="sky"/>
          <img id="floorWooden" src={imgFloorWooden} alt="sky"/>
          <img id="obj_Drone166_img" src={obj_Drone166_img} alt="obj_Drone166_img"/>
          <img id="obj_spacecraft_png" src={obj_spacecraft_png} alt="obj_spacecraft_png"/>
          <video id="videoMilkyWay" src={videoMilkyWay}/>
          
          {/*<a-asset-item id="e45-aircraft-obj" src={obj_e45AAirCraft_obj}/>*/}
          {/*<a-asset-item id="e45-aircraft-mtl" src={obj_e45AAirCraft_mtl}/>*/}
          {/*<a-asset-item id="obj_Drone166_obj" src={obj_Drone166_obj}/>*/}
          {/*<a-asset-item id="obj_Drone166_mtl" src={obj_Drone166_mtl}/>*/}
          {/*<a-asset-item id="obj_capShield" src={obj_capShield}/>*/}
          
          {/*<a-asset-item id="font_monoid" src={fnt_monoid}/>*/}
        </a-assets>
        
        <a-sky  className="sky" src="#sky" rotation="0 0 0"/>
        <a-entity className="camera" camera="userHeight: 1.8; fov: 80;" // Assuming I'm 1.8m height, And the normal human fov is ~80
                  look-controls // Can look around by mouse / turn your head
                  wasd-controls // Can use keyboard to move
                  position="0 0 0" // Initial standing position
        />
        
        <Entity className="FloorAndWall">
          <a-entity className="floor"
                    geometry="primitive: plane; width: 25; height: 25;"
                    position="0 0 0"
                    rotation="-90 0 0"
                    material={`shader: flat; src: #floorWooden; repeat: 5 5`}/>
          <a-entity className="backWall"
                    geometry="primitive: box; width: 25; height: 10;"
                    position="0 -0 13"
                    rotation="180 180 0"
                    material={`shader: flat; src: #floorWooden; repeat: 5 2`}/>
          <a-entity className="leftWall"
                    geometry="primitive: box; width: 25; height: 5; depth:0.5"
                    position="-12.5 -2.2 0"
                    rotation="180 90 0"
                    material={`shader: flat; src: #floorWooden; repeat: 5 1`}/>
          <a-entity className="rightWall"
                    geometry="primitive: box; width: 25; height: 5; depth:0.5"
                    position="12.5 -2.2 0"
                    rotation="180 90 0"
                    material={`shader: flat; src: #floorWooden; repeat: 5 1`}/>
        </Entity>
        
        <Entity className="circleWorkspace">
          <Entity className="circleTable">Circle table</Entity>
          <Entity className="circleScreen">
            {/*<a-entity obj-model="obj: #e45-aircraft-obj; mtl: #e45-aircraft-mtl" position="5 5 -8"/>*/}
            {/*<a-entity obj-model="obj: #obj_Drone166_obj; mtl: #obj_Drone166_mtl" position="-5 5 -8"/>*/}
            {/*<a-entity geometry="primitive: dodecahedron; radius: 2" position="0 5 -5"/>*/}
            {/*<a-entity obj-model="obj: #obj_capShield;" position="-5 5 -8"/>*/}
            
            <Entity className="baseCircle">base Circle</Entity>
            <Entity className="displays">displays</Entity>
          </Entity>
        </Entity>
        
        <Entity className="decorator">
          <Entity className="decoratorLocation backWallRight" position="13 0 13">
            <a-entity className="x0y0z0_pos" geometry="primitive: box; radius: 1" position="0 0 0"/>
  
            <a-image className="obj_Drone166_img" src="#obj_Drone166_img"
                     position="0 2.8 -2.5" rotation="0 -120 0" width="5" height="5"/>
            
            <Entity className="drone166_text" position="-1.5 4 -0.51" rotation="0 180 0">
              <a-text value="Drone 166" width="15" color="#dedede"/>
              <a-text value="[Oblivion]" width="15" color="#dedede" position="0 -1 0"/>
            </Entity>
          </Entity>
          
          <Entity className="decoratorLocation frontSea" position="0 0 -15">
            <a-entity className="x0y0z0_pos" geometry="primitive: box; radius: 1" position="0 0 0"/>
            
            <a-image className="obj_spacecraft_png" src="#obj_spacecraft_png"
                     position="-30 5 0" rotation="-30 30 0" width="10" height="8"/>
            
          </Entity>
        </Entity>
      
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
