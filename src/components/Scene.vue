<script setup lang="ts">
import { Scene, Mesh, Color, Texture, HemisphereLight, PointLight } from "three";
import { computed, onMounted, toRaw, watch } from 'vue';
import { useAnimationStore } from "@/stores";

// define props
const props = defineProps<{
  background?: Color | Texture
}>();

const store = useAnimationStore();

// main scene
const scene = new Scene();
scene.background = props.background === undefined ? null : props.background

const light = new PointLight( 0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const light2 = new PointLight( 0xffffff, 1);
light2.position.set(10, 2, -5);
scene.add(light2);

store.setScene(scene);

const meshArrayLength = computed(() => {
  return store.meshArray.length
});

watch(meshArrayLength, (newLength, oldLength) => {
  if (newLength === 0) return;
  if (newLength <= 1) {
    console.log(store.meshArray)
    store.scene.add(toRaw(store.meshArray[0]))
  } else {
    store.scene.add(...toRaw(store.meshArray.slice(oldLength, newLength)))
  }
})

onMounted(() => {
  console.log("I am mounting");
  console.log(store.meshArray)
  console.log(meshArrayLength.value)

  if (meshArrayLength.value > 0) {
    store.scene.add(...toRaw(store.meshArray));
  }
});

</script>
<template>
  <div id="scene-container" />
  <slot />
</template>