<script setup lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import { inject, onMounted, ref } from "vue";
import type { Position } from "../../typings";
import { SceneInjectionKey } from "@/keys";

const props = defineProps<{
  material: Material,
  geometry: BufferGeometry,
  position: Position,
  // rotation?: Position
}>();

const mesh = new Mesh(props.geometry, props.material);
mesh.position.set(props.position.x, props.position.y, props.position.z);
// mesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z);
const {_, updateMeshArr} = inject(SceneInjectionKey) as any;

onMounted(() => {
  console.log("I mounted, mesh")
  updateMeshArr(mesh);
});

defineExpose({
  mesh
})

</script>