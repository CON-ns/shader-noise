import * as THREE from 'three';

const loadCanvas = document.getElementById('js-loadCanvas');

let camera, scene, renderer, geometry, material,cancelId;

function setUpLoadCanvas() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas:loadCanvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff,0);
  const canvas = document.getElementById('js-loadCanvas');
  const canvasW = canvas.clientWidth;
  const canvasH = canvas.clientHeight;
  
  scene = new THREE.Scene();
  const fov = 60;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = canvasW / 2 / Math.tan(fovRad);
  camera = new THREE.PerspectiveCamera(
    fov,
    canvasW / canvasH,
    0.1,
    10000
    );
    camera.position.z = dist;
    const geometry = new THREE.PlaneGeometry(canvasW * 2,canvasH * 2);
    material = new THREE.ShaderMaterial({
      uniforms: {
        uTick: { value: 0 },
      },
      vertexShader:document.getElementById('v-shader-loading').textContent,
      fragmentShader:document.getElementById('f-shader-loading').textContent,
      transparent: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
}


function transitionLoop() {
  let previousTime = performance.now();
  let elapsed;
  function animate() {
    const currentTime = performance.now();
    elapsed = ((currentTime - previousTime) / 1000).toFixed(2);
    material.uniforms.uTick.value = elapsed;
   renderer.render(scene, camera);
    cancelId = requestAnimationFrame(animate);
  }
  animate();
}
setUpLoadCanvas();
transitionLoop();

