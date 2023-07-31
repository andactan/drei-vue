<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';
import Camera from './components/Camera.vue';
import { computed, onMounted } from 'vue';
import { loadObject } from './loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const sceneBackground = new THREE.Color('skyblue');

const width = window.innerWidth;
const height = window.innerHeight;

const handleMeshChange = (mesh: THREE.Mesh, delta: number): void => {
  const radiansPerSecond = THREE.MathUtils.degToRad(120);
  mesh.rotation.y += radiansPerSecond * delta;
};

const meshes = computed(() => {
  const amount = 10;
  const offset = (amount - 1) / 2;

  const materialColorProp = 'rgb(255, 255, 0)';
  const materialEmissiveColor = 'rgb(255,128,64)';
  const materialSpecularColor = 'rgb(255,155,255)';
  const materialShininess = 10;
  const materialOpacity = 1;

  let arr = [];
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        const object = {
          key: `${i}${j}${k}`,
          geometry: 'Capsule',
          material: 'Phong',
          position: { x: offset - i, y: offset - j, z: offset - k },
          materialProps: {
            color: materialColorProp,
            emissive: materialEmissiveColor,
            specular: materialSpecularColor,
            shininess: materialShininess,
            opacity: materialOpacity
          },
          geometryProps: {
            radius: 0.3,
            length: 0.3
          }
        };
        arr.push(object);
      }
    }
  }

  return arr;
});

// onMounted(async () => {
//   const x = await loadObject("/assets/models/Parrot.glb");
//   console.log(x)
// })
</script>

<template>
  <Renderer :width="width" :height="height">
    <Camera
      :fov="75"
      :aspect="width / height"
      :near="0.1"
      :far="1000"
      :position="{ x: 200, y: 200, z: 200 }"
    />
    <Scene :background="sceneBackground">
      <Mesh src="/assets/models/Stork.glb" :position="{ x: 0, y: 0, z: 0 }" />
      <Mesh src="/assets/models/Parrot.glb" :position="{ x: 200, y: 0, z: 0 }" />
      <Mesh src="/assets/models/Flamingo.glb" :position="{ x: -200, y: 0, z: 0 }" />
    </Scene>
  </Renderer>
</template>
