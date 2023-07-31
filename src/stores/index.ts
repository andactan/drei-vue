import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Camera, Mesh, Scene } from 'three';
import type { TickableMesh } from '@/classes';

export const useAnimationStore = defineStore('animation', () => {
  const scene = ref();
  const camera = ref();
  const meshArray = ref<TickableMesh[]>([]);

  function setScene(value: Scene) {
    scene.value = value;
  }

  function setCamera(value: Camera) {
    camera.value = value;
  }

  function updateMeshArray(value: Mesh) {
    meshArray.value.push(value);
  }

  function resetMeshArray() {
    meshArray.value = [];
  }

  return { scene, camera, meshArray, setScene, setCamera, updateMeshArray, resetMeshArray }
})
