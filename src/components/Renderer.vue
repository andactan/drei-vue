<script setup lang="ts">
import { RendererInjectionKey, SceneInjectionKey } from '../keys';
import { Camera, Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { computed, onMounted, onUnmounted, provide, ref, toRaw, watch } from 'vue';
import { useAnimationStore } from '@/stores';
import Stats from 'three/addons/libs/stats.module.js';
import { stringify } from 'querystring';

const props = defineProps<{
  width: number;
  height: number;
}>();

const store = useAnimationStore();

// renderer
const stats = new Stats();
const clock = new Clock();
const renderer = new WebGLRenderer({ antialias: false });
renderer.setSize(props.width, props.height);
// document.body.appendChild(renderer.domElement);
// document.body.appendChild(stats.dom);

const onWindowResize = (camera: PerspectiveCamera) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

let counter = 0;
const start = (scene: Scene, camera: Camera, stats: Stats): void => {
  renderer.setAnimationLoop(() => {
    tick();
    stats.update();
    renderer.render(scene, camera);
  });
};

const stop = (): void => {
  renderer.setAnimationLoop(null);
  document.body.removeChild(renderer.domElement);
  renderer.dispose();
};

const tick = (): void => {
  const delta = clock.getDelta();
  for (const mesh of store.meshArray) {
    mesh.tick(delta);
  }
};

function until(conditionFunction) {
  console.log(conditionFunction());
  const poll = (resolve) => {
    if (conditionFunction()) {
      console.log('doing that');
      resolve();
    } else {
      console.log('doing this');
      setTimeout((_) => poll(resolve));
    }
  };

  return new Promise(poll);
}

watch(
  () => store.scene,
  (n, o) => {
    // console.log(JSON.parse(JSON.stringify(scene)));
    console.log(toRaw(n));
    renderer.render(toRaw(n), toRaw(store.camera));
  },
  { deep: true }
);

onMounted(async () => {
  const scene = toRaw(store.scene);
  const camera = toRaw(store.camera);
  const container = document.querySelector('#scene-container');
  container?.append(renderer.domElement);
  container?.append(stats.dom);
  const controls = new OrbitControls(camera, renderer.domElement);

  await until(
    () =>
      'geometries' in toRaw(store.scene).toJSON() &&
      toRaw(store.scene).toJSON().geometries.length > 10
  );
  console.log(toRaw(store.scene).toJSON());
  renderer.render(scene, camera);
  const sceneChildren = computed(() => store.scene.children.length);
  console.log(sceneChildren.value);
  console.log(scene.toJSON()?.geometries);

  //   start(scene, camera, stats);
  window.addEventListener('resize', () => onWindowResize(camera));
});

onUnmounted(() => {
  stop();
});
</script>
<template>
  <slot />
</template>
