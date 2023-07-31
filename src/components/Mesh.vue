<script setup lang="ts">
import {
  BufferGeometry,
  Color
} from 'three';
import { onBeforeMount, onMounted, onUnmounted, onUpdated, toRaw, watch, type PropType } from 'vue';
import type { Position } from '@/typings';
import { TickableMesh } from '@/misc';
import { useAnimationStore } from '@/stores';
import * as definitions from "@/mappings";
import { useLoader } from '@/hooks/useLoader';

interface Props {
  src?: string,
  material?: string,
  geometry?: string,
  position: Position,
  materialProps?: any,
  geometryProps?: any,
  onMeshRotation?: Function
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
  material: "Basic",
  geometry: "Box",
  materialProps: {},
  geometryProps: {},
  onMeshRotation: (delta: Number) => { console.log("not implemented") }
})

const store = useAnimationStore();
if ("src" in props) {
  const { data, error } = useLoader(props.src);
  watch((data), (n) => {
    if (n) {
      store.updateMeshArray(toRaw(n))
    }
  });

} else {
  const _materialProps = {...(props as Props).materialProps};
  for (const key of Object.keys(_materialProps)) {
    const val = _materialProps[key];
  
    if (key === "color") _materialProps[key] = new Color(_materialProps[key]);
    if (
      (val instanceof String) &&
      (["rgb", "hsl", "#"].some((word) => val.startsWith(word)))
      ) {
        _materialProps[key] = new Color(_materialProps[key]);
      }
  }
  
  const material = new definitions.MATERIAL[props.material](_materialProps);
  
  let geometry: BufferGeometry;
  if (props.geometryProps) {
    geometry = new definitions.GEOMETRY[props.geometry](...Object.values(props.geometryProps));
  } else {
    geometry = new definitions.GEOMETRY[props.geometry]();
  }
  
  const mesh = new TickableMesh(geometry, material);
  mesh.position.set(props.position.x, props.position.y, props.position.z);
  mesh.tick = (delta: number): void => {
    props.onMeshRotation(mesh, delta);
  };
}

onUnmounted(() => {
  store.resetMeshArray();
});
</script>
<template></template>
