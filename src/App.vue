<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';
import Camera from './components/Camera.vue';
import { computed } from 'vue';

const sceneBackground = new THREE.Color(0x000000);

const width = window.innerWidth;
const height = window.innerHeight;

const handleMeshChange = (mesh: THREE.Mesh, delta: number): void => {
  const radiansPerSecond = THREE.MathUtils.degToRad(120);
  mesh.rotation.y += radiansPerSecond * delta;
};

const meshes = computed(() => {
  const amount = 10;
  const offset = (amount - 1) / 2;

  const materialColorProp = new THREE.Color('rgb(226,35,213)');
  const materialEmissiveColor = new THREE.Color('rgb(255,128,64)');
  const materialSpecularColor = new THREE.Color('rgb(255,155,255)');
  const materialShininess = 10;
  const materialOpacity = 1;

  let arr = [];
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        const object = {
          key: `${i}${j}${k}`,
          geometry: 'Icosahedron',
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
            detail: 0
          }
        };
        arr.push(object);
      }
    }
  }

  return arr;
});
</script>

<template>
  <Renderer :width="width" :height="height">
    <Camera
      :fov="75"
      :aspect="width / height"
      :near="0.1"
      :far="1000"
      :position="{ x: 10, y: 10, z: 10 }"
    />
    <Scene :background="sceneBackground">
      <Mesh
        v-for="mesh in meshes"
        :key="mesh.key"
        :geometry="mesh.geometry"
        :material="mesh.material"
        :position="mesh.position"
        :onMeshRotation="handleMeshChange"
        :materialProps="mesh.materialProps"
        :geometryProps="mesh.geometryProps"
      />
    </Scene>
  </Renderer>
</template>

<style scoped></style>
