<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

</script>

<template>
  <Scene>
    <Mesh :geometry="geometry" :material="material" :position="{x: 0, y: 0, z: 0}" />
    <Mesh :geometry="geometry" :material="material" :position="{x: 4, y: 0, z: 5}" />
  </Scene>
</template>

<style scoped>
</style>
