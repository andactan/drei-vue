<script setup lang="ts">
import { Scene, Mesh, Color, Texture } from "three";
import { onMounted, provide, ref, watch, toRaw, inject } from 'vue';
import { RendererInjectionKey, SceneInjectionKey } from "../keys";

// define props
const props = defineProps<{
  background?: Color | Texture
}>();

// main scene
const scene = new Scene();
scene.background = props.background === undefined ? null : props.background

const meshArr = ref<Mesh[]>([]);
const updateMeshArr = (e: Mesh) => {
  meshArr.value.push(e);
}

provide(SceneInjectionKey, {
  meshArr,
  updateMeshArr
});

const {sceneRef, sceneChangedRef} = inject(RendererInjectionKey.scene) as any;

watch(() => meshArr.value.length, (newLength, oldLength) => {
  // add new meshes to the scene
  const args = toRaw(meshArr.value).slice(oldLength, newLength);
  scene.add(...args);

  // inform parent renderer that scene has some changes to be delivered
  sceneChangedRef.value = !sceneChangedRef.value;
})

onMounted(() => {
  sceneRef.value = scene;
});

onMounted(() => {

});

</script>
<template>
  <div id="scene-container" />
  <slot />
</template>