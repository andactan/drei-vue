import type { InjectionKey } from "vue";

export const SceneInjectionKey = Symbol();
export const RendererInjectionKey = {
  scene: Symbol(),
  camera: Symbol(),
};