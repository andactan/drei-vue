<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';
import Camera from './components/Camera.vue';
import { computed } from 'vue';


const sceneBackground = new THREE.Color(0xf0f0f0);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const width = window.innerWidth;
const height = window.innerHeight;

const meshes = computed(() => {
  const geometry = new THREE.BoxGeometry();
  let arr = [];
  for (let i = 0; i < 1000; i++) {
    const object = {
      geometry: geometry, 
      material: new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}),
      position: {x: Math.random() * 40 - 20, y: Math.random() * 40 - 20, z: Math.random() * 40 - 20}
    };
    arr.push(object);
  }

  return arr;
});

</script>

<template>
  <Renderer :width="width" :height="height">
    <Camera :fov="75" :aspect="width / height" :near="0.1" :far="1000" :position="{x: 0, y: 0, z: 75}" />
    <Scene :background="sceneBackground">
      <Mesh v-for="mesh in meshes" :geometry="mesh.geometry" :material="mesh.material" :position="mesh.position"/>
    </Scene>
  </Renderer>
</template>

<style scoped>
</style>
