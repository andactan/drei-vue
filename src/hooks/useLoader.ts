import type { TickableMesh } from '@/misc';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ref, type Ref } from 'vue';

function _setupObject(data: any) {
  return data.scene.children[0];
}

function useLoader(assetPath: string) {
  const data: Ref<TickableMesh | null> = ref(null);
  const error = ref(null);

  const loader = new GLTFLoader();
  loader.load(
    assetPath,
    (gltf) => {
      const _data = _setupObject(gltf) as TickableMesh;
      console.log(_data);
      _data.tick = (delta: number) => { console.log('tictoc') }
      data.value = _data
    }
  )


  return { data, error };
}

export { useLoader };