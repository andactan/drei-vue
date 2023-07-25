<script setup lang="ts">
import { RendererInjectionKey, SceneInjectionKey } from '@/keys';
import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { inject, onMounted, provide, ref, toRaw, useAttrs, watch } from 'vue';

const props = defineProps<{
  width: number,
  height: number
}>();

console.log("i create, renderer")
// renderer
const renderer = new WebGLRenderer();
renderer.setSize(props.width, props.height);
document.body.appendChild( renderer.domElement );

// camera
const cameraRef = ref<Camera>(new Camera());
const cameraChangedRef = ref(false);

// scene
const sceneRef = ref<Scene>(new Scene());
const sceneChangedRef = ref(false);

// providers
provide(RendererInjectionKey.camera, {cameraRef, cameraChangedRef});
provide(RendererInjectionKey.scene, {sceneRef, sceneChangedRef});

const controls = new OrbitControls(toRaw(cameraRef.value), renderer.domElement);

watch((cameraChangedRef), () => {
  renderer.render(toRaw(sceneRef.value), toRaw(cameraRef.value));
  controls.update();
})

watch((sceneChangedRef), () => {
  renderer.render(toRaw(sceneRef.value), toRaw(cameraRef.value));
})

const animate = () => {
  renderer.render(toRaw(sceneRef.value), toRaw(cameraRef.value));
}
console.log("i create finish, renderer")

onMounted(() => {
  animate();
  // inject meshArr for looping for animations
  const { meshArr, updateMeshArr } = inject(SceneInjectionKey) as any;
  console.log(meshArr)
})

</script>
<template>
  <slot />
</template>