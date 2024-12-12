import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';
import { createCanvas } from './box';


const boxGeometry = new RoundedBoxGeometry(1000, 1000, 1000, 100, 20);
const texts = ['About', 'Experience', 'Skills', 'Projects', 'Contacts', 'Essays']
const boxMultiMaterial = texts.map(text => new THREE.MeshBasicMaterial({
  map: new THREE.CanvasTexture(createCanvas(text)),
}))

const container = new THREE.Mesh(boxGeometry, boxMultiMaterial);

export {container};