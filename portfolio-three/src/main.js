import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import {  box  } from './box';
import chain from './chain';


var stopped = false;

const height = 200
const width = 1000

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height, false);
document.getElementById('icon').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101214)

const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, -400);
orbit.update()

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

scene.add(box);
scene.add(chain);

const light = new THREE.DirectionalLight( 0xffffff, Math.PI );
scene.add( light );

let animateRequestID;
function animate() {
  animateRequestID = requestAnimationFrame( animate );
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;
  chain.rotation.x += 0.01
  renderer.render(scene, camera);
}
animate();


var start_t = 1;
let stopRequestID;
function smoothStop() {
  const increment = 0.01-(start_t/10000)
  box.rotation.x += increment;
  box.rotation.y += increment;
  box.rotation.z += increment;
  if (increment >= 0 && increment < 0.01) {
    stopRequestID = requestAnimationFrame( smoothStop);
    renderer.render(scene, camera);
    start_t++;
  } else {
    stop_stop()
  }
}

function stop_stop(){
  start_t = 1;
  stopped = true;

  cancelAnimationFrame(stopRequestID);
}

let t = 1;
function smoothStart() {
  let requestID;
  const increment = t/10000;
  console.log(increment)
  box.rotation.x += increment;
  box.rotation.y += increment;
  box.rotation.z += increment;
  if (increment < 0.01 && increment > 0) {
    requestID = requestAnimationFrame(smoothStart);
    renderer.render(scene, camera);
    t++;
  } else{
    t = 1;
    stopped = false;
    cancelAnimationFrame(requestID);
  }
}

// document.getElementById('icon').addEventListener('mouseenter', () => {
//   cancelAnimationFrame(animateRequestID);
//   smoothStop();
// })

// document.getElementById('icon').addEventListener('mouseleave', () => {
//   stopped || stop_stop();

//   smoothStart();
//   animate();
// })

