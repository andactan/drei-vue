import type { Tickable, TickableURDFRobot } from '@/classes';
import type { TickableMesh } from '@/misc';
import { LoadingManager } from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { URDFRobot } from 'urdf-loader';
import type URDFLoader from 'urdf-loader';
import { ref, type Ref } from 'vue';


function _setupObject(data: GLTF | URDFRobot) {
  if ("scene" in data) {
    return data.scene.children[0] as TickableMesh;
  } else {
    return data as TickableURDFRobot;
  }
}

function useLoader(path: string, loader: GLTFLoader | URDFLoader) {
  const data: Ref<TickableMesh | TickableURDFRobot | null> = ref(null);
  const error = ref(null);

  loader.load(
    path,
    function onLoad(gltf) {
      const _object = _setupObject(gltf);
      _object.tick = (delta: number) => {console.log("anan")}
      data.value = _object;
      console.log(gltf)
    }
  )

  return { data, error };
}

export { useLoader };