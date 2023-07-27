<script setup lang="ts">
import { Material, BufferGeometry, Mesh, EdgesGeometry } from "three";
import { onMounted, onUnmounted } from "vue";
import type { Position } from "@/typings";
import { TickableMesh } from "@/classes"
import { useAnimationStore } from "@/stores";

const props = defineProps<{
  material: Material,
  geometry: BufferGeometry,
  position: Position,
  onMeshRotation: Function
}>();

const store = useAnimationStore();

const mesh = new TickableMesh(props.geometry, props.material);
mesh.position.set(props.position.x, props.position.y, props.position.z);
mesh.tick = (delta: number): void => {
  props.onMeshRotation(mesh, delta);
}

store.updateMeshArray(mesh);

onUnmounted(() => {
  props.material.dispose();
  props.geometry.dispose();
});

</script>
<template></template>