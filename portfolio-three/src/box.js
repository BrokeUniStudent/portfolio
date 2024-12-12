import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';

function createCanvas(text){
    const textCanvas = document.createElement('canvas');
    textCanvas.height = 200
    textCanvas.width = 200
    const textContext = textCanvas.getContext('2d');

    // text
    textContext.fillStyle = '#00FF00';
    textContext.font = "normal normal 25px Courier New";
    textContext.setTransform(0.9,-1,1, 1,-100,100)
    textContext.fillText(text, (textCanvas.width -textContext.measureText(text).width)/2, 110);
    textContext.resetTransform()

    // border
    textContext.lineWidth = 10
    textContext.lineCap = "round";
    strokeBorder('left', textContext)
    strokeBorder('right', textContext)
    strokeBorder('bottom', textContext)
    strokeBorder('top', textContext)

    return textCanvas;
}
  
const dimension = 200;
function strokeBorder(side, textContext) {
    let params;
    let path;
    switch (side){
        case "left":
        params = [0,0, 10,0]
        path = [0, 0, 0, dimension]
        break;
        case "right":
        params = [200,0, 190,0]
        path = [dimension, 0, dimension, dimension]
        break;
        case "bottom":
        params = [0,200, 0,190]
        path = [dimension, dimension, 0, dimension]
        break;
        default:
        params = [0, 0, 0, 10]
        path = [0, 0, dimension, 0]
    }

    const grad=textContext.createLinearGradient(...params);
    grad.addColorStop(0, "lightgreen");
    grad.addColorStop(0.25, "green");
    grad.addColorStop(0.5, "darkgreen");
    grad.addColorStop(1, "black");
    textContext.strokeStyle = grad;

    textContext.beginPath();
    textContext.moveTo(path[0], path[1]);
    textContext.lineTo(path[2], path[3]);
    textContext.stroke();

}


const boxGeometry = new RoundedBoxGeometry(200, 200, 200, 100, 20);
const texts = ['About', 'Experience', 'Skills', 'Projects', 'Contacts', 'Essays']
const boxMultiMaterial = texts.map(text => new THREE.MeshBasicMaterial({
  map: new THREE.CanvasTexture(createCanvas(text)),
}))

const box = new THREE.Mesh(boxGeometry, boxMultiMaterial);


export {box, createCanvas};