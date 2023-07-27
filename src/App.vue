<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';
import Camera from './components/Camera.vue';
import { computed } from 'vue';


const sceneBackground = new THREE.Color(0x000000);
const geometry = new THREE.IcosahedronGeometry( 0.3, 0 );
const material = new THREE.MeshPhongMaterial({
  color: new THREE.Color("rgb(226,35,213)"), 
  emissive   :  new THREE.Color("rgb(255,128,64)"),
  specular   :  new THREE.Color("rgb(255,155,255)"),
  shininess  :  10,
  opacity    : 1
});

const width = window.innerWidth;
const height = window.innerHeight;

const handleMeshChange = (mesh: THREE.Mesh, delta: number): void => {

  const radiansPerSecond = THREE.MathUtils.degToRad(120);
  mesh.rotation.y += radiansPerSecond * delta;
}

const meshes = computed(() => {
  const amount = 10;
  const offset = (amount - 1) / 2;
  let arr = [];
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        const object = {
          geometry: geometry, 
          material: material,
          position: {x: offset - i, y: offset - j, z: offset - k}
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
    <Camera :fov="75" :aspect="width / height" :near="0.1" :far="1000" :position="{x: 10, y: 10, z: 10}" />
    <Scene :background="sceneBackground">
      <Mesh v-for="mesh in meshes" :geometry="mesh.geometry" :material="mesh.material" :position="mesh.position" :onMeshRotation="handleMeshChange"/>
    </Scene>
  </Renderer>
</template>

<style scoped>
</style>
