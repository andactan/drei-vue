<script setup lang="ts">
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Camera, Color, Texture, BoxGeometry, MeshBasicMaterial } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted, provide, ref, useSlots, type Ref, watch, computed, toRaw, inject, onBeforeMount } from 'vue';
import { RendererInjectionKey, SceneInjectionKey } from "../keys";

// define props
const props = defineProps<{
  camera: Camera,
  background: Color | Texture
}>();

// main scene
const scene = new Scene();

const meshArr = ref<Mesh[]>([]);
const updateMeshArr = (e: Mesh) => {
  meshArr.value.push(e);
}

provide(SceneInjectionKey, {
  meshArr,
  updateMeshArr
});

const {sceneRef, sceneChangedRef} = inject(RendererInjectionKey) as any;

watch(() => meshArr.value.length, (newLength, oldLength) => {
  console.log("added meshes")
  const args = toRaw(meshArr.value).slice(oldLength, newLength);
  scene.add(...args);
  sceneChangedRef.value = !sceneChangedRef.value;
})

onMounted(() => {
  console.log("i mounted, scene")
  sceneRef.value = scene;
});

onMounted(() => {

});

</script>
<template>
  <div id="scene-container" />
  <slot />
</template>