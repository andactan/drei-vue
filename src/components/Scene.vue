<script setup lang="ts">
import { Scene, Mesh, Color, Texture, HemisphereLight, PointLight, DirectionalLight } from 'three';
import { computed, onMounted, toRaw, watch } from 'vue';
import { useAnimationStore } from '@/stores';

// define props
const props = defineProps<{
  background?: Color | Texture;
}>();

const store = useAnimationStore();

// main scene
const scene = new Scene();
scene.background = props.background === undefined ? null : props.background;

const light = new DirectionalLight('white', 4);
light.position.set(10, 10, 10);
scene.add(light);

const light2 = new HemisphereLight('white', 'darkslategrey', 5);
scene.add(light2);

store.setScene(scene);

const meshArrayLength = computed(() => {
  return store.meshArray.length;
});

watch(meshArrayLength, (newLength, oldLength) => {
  if (newLength === 0) return;
  if (newLength <= 1) {
    store.scene.add(toRaw(store.meshArray[0]));
  } else {
    store.scene.add(...toRaw(store.meshArray.slice(oldLength, newLength)));
  }
});

onMounted(() => {
  if (meshArrayLength.value > 0) {
    store.scene.add(...toRaw(store.meshArray));
  }
});
</script>
<template>
  <div id="scene-container" />
  <slot />
</template>
