<script setup lang="ts">
import { BufferGeometry, Color } from 'three';
import { computed, onUnmounted, toRaw, watch, type PropType } from 'vue';
import type { Position } from '@/utils/typings';
import { TickableMesh } from '@/utils/misc';
import { useAnimationStore } from '@/stores';
import * as definitions from '@/utils/mappings';
import { useLoader } from '@/composables/useLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import URDFLoader from 'urdf-loader';

export interface Props {
  src?: string;
  loader?: any;
  material?: string;
  geometry?: string;
  position: Position;
  materialProps?: any;
  geometryProps?: any;
  onMeshRotation?: Function;
}

const props = defineProps({
  src: { type: String, required: false, default: '' },
  loader: { type: [URDFLoader, GLTFLoader], required: false, default: new GLTFLoader() },
  material: { type: String, required: false, default: 'Basic' },
  geometry: { type: String, required: false, default: 'Box' },
  position: { type: Object as PropType<Position>, required: true },
  materialProps: { type: Object, required: false, default: () => ({}) },
  geometryProps: { type: Object, required: false, default: () => ({}) },
  onMeshRotation: {
    type: Function as PropType<Function>,
    required: false,
    default: () => console.log('anan')
  }
});

const store = useAnimationStore();

const isUsingLoader = computed(() => {
  return props.src !== '';
});

if (isUsingLoader.value) {
  const { data, error } = useLoader(props.src, props.loader);
  watch(data, (n) => {
    if (n) {
      n.position.set(
        (props as Props).position.x,
        (props as Props).position.y,
        (props as Props).position.z
      );
      n.tick = (delta: number) => {
        props.onMeshRotation(n, delta);
      };
      store.updateMeshArray(toRaw(n));
    }
  });
} else {
  const _materialProps = { ...(props as Props).materialProps };
  for (const key of Object.keys(_materialProps)) {
    const val = _materialProps[key];

    if (key === 'color') _materialProps[key] = new Color(_materialProps[key]);
    if (val instanceof String && ['rgb', 'hsl', '#'].some((word) => val.startsWith(word))) {
      _materialProps[key] = new Color(_materialProps[key]);
    }
  }

  const material = new definitions.MATERIAL[props.material](_materialProps);

  let geometry: BufferGeometry;
  if ((props as Props).geometryProps) {
    geometry = new definitions.GEOMETRY[props.geometry](...Object.values(props.geometryProps));
  } else {
    geometry = new definitions.GEOMETRY[props.geometry]();
  }

  const mesh = new TickableMesh(geometry, material);
  mesh.position.set(
    (props as Props).position.x,
    (props as Props).position.y,
    (props as Props).position.z
  );
  mesh.tick = (delta: number): void => {
    props.onMeshRotation(mesh, delta);
  };
}

onUnmounted(() => {
  store.resetMeshArray();
});
</script>
<template></template>
