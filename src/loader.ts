import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { TickableMesh } from './misc';


function setupObject(data: any) {
  return data.scene.children[0];
}

async function loadObject(path: string) {
  const loader = new GLTFLoader();
  const data = await loader.loadAsync(path);

  const object = setupObject(data);

  return object as TickableMesh;
}

export { loadObject };