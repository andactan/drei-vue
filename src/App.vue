<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const width = window.innerWidth;
const height = window.innerHeight;

</script>

<template>
  <Renderer :width="width" :height="height">
    <Scene>
      <Mesh :geometry="geometry" :material="material" :position="{x: 0, y: 0, z: 0}" />
      <Mesh :geometry="geometry" :material="material" :position="{x: 0, y: 0, z: 6}" />
    </Scene>
  </Renderer>
</template>

<style scoped>
</style>
