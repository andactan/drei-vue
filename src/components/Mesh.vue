<script setup lang="ts">
import { Material, BufferGeometry, Mesh } from "three";
import { inject, onMounted, ref } from "vue";
const props = defineProps({
  material: Material,
  geometry: BufferGeometry,
  position: Object
});
const mesh = ref(new Mesh(props.geometry, props.material));

if (props.position) {
  mesh.value.position.set(props.position.x, props.position.y, props.position.z);
}

const emits = defineEmits(["meshMountedEvent"]);

const injection = inject('parentFunc');

onMounted(() => {
  console.log("I am emitting something, vuhuuuuu")
  emits("meshMountedEvent");
  injection(mesh);
});


</script>