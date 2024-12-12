import * as THREE from 'three';

const numPieces = 10
const color = 'lightgreen'

const cylinderHeight = 20
const ringRadius = 10
const tubeRadius = 3
const gapBetweenPiece = (ringRadius + cylinderHeight +tubeRadius)

const material = new THREE.MeshStandardMaterial({color: color, metalness: 0.5})

// half ring
const ringGeometry = new THREE.TorusGeometry(ringRadius, tubeRadius, 16, 100, Math.PI )
const ringMaterial = material
const ring = new THREE.Mesh(ringGeometry, ringMaterial)

// other half ring
const rotatedRing = ring.clone(true);
rotatedRing.rotateX(Math.PI);
rotatedRing.position.y = ring.position.x - cylinderHeight

// cylinder
const geometry = new THREE.CylinderGeometry( tubeRadius, tubeRadius, cylinderHeight, 32 ); 
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.y = ring.position.x - cylinderHeight/2
cylinder.position.x = ring.position.y + ringRadius

// other cylinder
const transformedCylinder = cylinder.clone(true);
cylinder.position.x = ring.position.y - ringRadius

const piece = new THREE.Group();
piece.add(ring, cylinder, transformedCylinder, rotatedRing);


const chain = new THREE.Group();
for (let i = 0; i < numPieces; i++){
    const horizontalPiece = piece.clone(true);
    if (i%2){
        horizontalPiece.rotateX(Math.PI/2)
    }
    horizontalPiece.rotateZ(Math.PI/2)
    horizontalPiece.position.x= 200 + gapBetweenPiece * i
    chain.add(horizontalPiece)
}
chain.rotateY(Math.PI)


export default chain;