<script setup lang="ts">
import { RendererInjectionKey, SceneInjectionKey } from '@/keys';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted, provide, ref, toRaw, watch } from 'vue';

const props = defineProps<{
  width: number,
  height: number
}>();

// renderer
const renderer = new WebGLRenderer();
renderer.setSize(props.width, props.height);
document.body.appendChild( renderer.domElement );

// camera
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.position.x = 2;

// controls
const controls = new OrbitControls( camera, renderer.domElement );

const sceneRef = ref<Scene>(new Scene());
const sceneChangedRef = ref(false);
provide(RendererInjectionKey, {sceneRef, sceneChangedRef});

watch((sceneChangedRef), () => {
  console.log('scene changed');
  renderer.render(toRaw(sceneRef.value), camera);
})

const animate = () => {
  // requestAnimationFrame(animate);
  console.log(toRaw(sceneRef.value))
  renderer.render(toRaw(sceneRef.value), camera);
}

onMounted(() => {
  console.log("I mounted, renderer")
  animate();
})

</script>
<template>
  <slot />
</template>