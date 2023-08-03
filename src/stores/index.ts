import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Camera, Mesh, Scene } from 'three';
import type { Tickable } from '@/utils/misc';

export const useAnimationStore = defineStore('animation', () => {
  const scene = ref();
  const camera = ref();
  const meshArray = ref<Tickable[]>([]);

  function setScene(value: Scene) {
    scene.value = value;
  }

  function setCamera(value: Camera) {
    camera.value = value;
  }

  function updateMeshArray(value: Tickable) {
    meshArray.value.push(value);
  }

  function resetMeshArray() {
    meshArray.value = [];
  }

  return { scene, camera, meshArray, setScene, setCamera, updateMeshArray, resetMeshArray }
})
