<script setup lang="ts">
import {
  Material,
  BufferGeometry,
  Mesh,
  EdgesGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  IcosahedronGeometry,
  Color
} from 'three';
import { onMounted, onUnmounted } from 'vue';
import type { Position } from '@/typings';
import { TickableMesh } from '@/classes';
import { useAnimationStore } from '@/stores';

const props = defineProps<{
  material: string;
  geometry: string;
  position: Position;
  materialProps: any;
  geometryProps: any;
  onMeshRotation: Function;
}>();

const MATERIAL_DEFS: { [key: string]: any } = {
  Basic: MeshBasicMaterial,
  Phong: MeshPhongMaterial
};

const GEO_DEFS: { [key: string]: any } = {
  Icosahedron: IcosahedronGeometry
};

const store = useAnimationStore();

const material = new MATERIAL_DEFS[props.material](props.materialProps);
const geometry = new GEO_DEFS[props.geometry](...Object.values(props.geometryProps));

const mesh = new TickableMesh(geometry, material);
mesh.position.set(props.position.x, props.position.y, props.position.z);
mesh.tick = (delta: number): void => {
  props.onMeshRotation(mesh, delta);
};

store.updateMeshArray(mesh);

onUnmounted(() => {
  material.dispose();
  geometry.dispose();
});
</script>
