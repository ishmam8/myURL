import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sphere } from 'three';
import { ColorKeyframeTrack } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio) ;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
camera.position.setX(-3);
camera.position.setY(-1)

renderer.render(scene, camera);

//Torus
const geometry = new THREE.TorusGeometry(10, 2.5, 16, 100)
const torusTexture = new THREE.TextureLoader().load('./images/saturn.jpeg')
const torus = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial( { map: torusTexture}));
scene.add(torus)

torus.position.z = -30
torus.position.x = 25

//light and camera properties
const pointLight = new THREE.PointLight(0xFFF1C9)
pointLight.position.set(3,3,3)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

//add stars to the background
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xFFF1C9})
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x,y,z)
  scene.add(star)
}
Array(1000).fill().forEach(addStar)

//background image
const spaceTexture = new THREE.TextureLoader().load('./images/spacy.jpg');
scene.background = spaceTexture

//metaverse
const metaTexture = new THREE.TextureLoader().load('./images/meta.jpeg')
const meta = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,40),
  new THREE.MeshStandardMaterial({
    map: metaTexture,
  })
);
scene.add(meta)
meta.position.z = -30
meta.position.x = 25

//add mars
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpeg')
const marsTexture = new THREE.TextureLoader().load('./images/mars.jpeg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  })
);
scene.add(mars)
mars.position.z = 35;
mars.position.setX(-40);

//add earth
const normal1Texture = new THREE.TextureLoader().load('./images/normal.jpeg')
const earthTexture = new THREE.TextureLoader().load('./images/earth.jpeg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normal1Texture
  })
);
scene.add(earth)
earth.position.z = -100;
earth.position.setX(-100);

//scroll 3D
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  

  mars.rotation.y += 0.075;
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  //camera.rotation.y = t * -0.002

}

document.body.onscroll = moveCamera;
moveCamera();


//animate the image
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  meta.rotation.x +=0.01;
  mars.rotation.x += 0.005;
  earth.rotation.x += 0.005;

  //controls.update();
  renderer.render(scene, camera);

}
animate()