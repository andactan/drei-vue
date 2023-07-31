<script setup lang="ts">
import { useAnimationStore } from '@/stores';
import { PerspectiveCamera } from 'three';
import type { Position } from '@/typings';
import type { PropType } from 'vue';

const props = defineProps({
  fov: {
    type: Number,
    required: true
  },
  aspect: {
    type: Number,
    required: true
  },
  near: {
    type: Number,
    required: true
  },
  far: {
    type: Number,
    required: true
  },
  position: {
    type: Object as PropType<Position>,
    required: true
  }
});

const store = useAnimationStore();

const camera = new PerspectiveCamera(props.fov, props.aspect, props.near, props.far);
camera.position.set(props.position.x, props.position.y, props.position.z);
store.setCamera(camera);
</script>
