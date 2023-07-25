<script setup lang="ts">
import { RendererInjectionKey } from "@/keys";
import { PerspectiveCamera } from "three";
import type { Position } from "typings";
import { inject, onMounted } from "vue";
import type { PropType } from 'vue'

interface Position {
  x: number,
  y: number,
  z: number
}

const props = defineProps({
  fov: {
    type: Number,
    required: true
  },
  aspect: {
    type: Number,
    required: true
  },
  near: {
    type: Number,
    required: true
  },
  position: {
    type: Object as PropType<Position>,
    required: true
  }
})

console.log("i create, camera")

const camera = new PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
camera.position.set(props.position.x, props.position.y, props.position.z);
const { cameraRef, cameraChangedRef } = inject(RendererInjectionKey.camera) as any;

onMounted(() => {
  cameraRef.value = camera;
  cameraChangedRef.value = !cameraChangedRef.value
})

</script>
<template></template>