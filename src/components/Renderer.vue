<script setup lang="ts">
import { RendererInjectionKey, SceneInjectionKey } from '../keys';
import { Camera, Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { inject, onMounted, onUnmounted, provide, ref, toRaw, watch } from 'vue';
import { useAnimationStore } from "@/stores";
import Stats from 'three/addons/libs/stats.module.js';

const props = defineProps<{
  width: number,
  height: number
}>();

const store = useAnimationStore();

// renderer
const stats = new Stats();
const clock = new Clock();
const renderer = new WebGLRenderer({ antialias: false });
renderer.setSize(props.width, props.height);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

const onWindowResize = (camera: PerspectiveCamera) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const start = (scene: Scene, camera: Camera, stats: Stats): void => {
  renderer.setAnimationLoop(() => {
    tick();
    renderer.render(scene, camera);
    stats.update();
  });
}

const stop = (): void => {
  renderer.setAnimationLoop(null);
  document.body.removeChild(renderer.domElement);
  renderer.dispose();
}

const tick = (): void => {
  const delta = clock.getDelta();
  for (const mesh of store.meshArray) {
    mesh.tick(delta);
  }
}

onMounted(() => {
  const scene = toRaw(store.scene);
  const camera = toRaw(store.camera);
  const controls = new OrbitControls(camera, renderer.domElement);
  start(scene, camera, stats);
  window.addEventListener("resize", () => onWindowResize(camera));
});

onUnmounted(() => {
  stop();
})

</script>
<template>
  <slot />
</template>