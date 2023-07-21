<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, provide, ref, useSlots } from 'vue';

const meshList = ref([]);
const addObjToMeshList = (obj: any) => {
  meshList.value.push(obj);
}

provide('parentFunc', addObjToMeshList);
console.log(meshList.value)


onMounted(() => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );

  const slots = useSlots();
  if (slots.default) {
    for (const mesh of slots.default()) {
      const obj = new THREE.Mesh(mesh.props.geometry, mesh.props.material);
      obj.position.set(mesh.props.position.x, mesh.props.position.y, mesh.props.position.z)
      scene.add(obj);
    }
  }

  camera.position.z = 10;
  camera.position.x = 5;
  // camera.position.y = 5;

  function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    }

  animate();

});

</script>
<template>
  <div id="scene-container" />
  <slot></slot>
</template>