<script setup lang="ts">
import * as THREE from 'three';
import Scene from './components/Scene.vue';
import Mesh from './components/Mesh.vue';
import Renderer from './components/Renderer.vue';
import Camera from './components/Camera.vue';
import { computed, onMounted } from 'vue';
import { loadObject } from './loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from './composables/useLoader';
import URDFLoader, { type URDFRobot } from 'urdf-loader';
import { join } from 'path';

const sceneBackground = new THREE.Color('skyblue');

const width = window.innerWidth;
const height = window.innerHeight;

const handleMeshChange = (mesh: THREE.Mesh | URDFRobot, delta: number): void => {
  const radiansLimit: {[key: string]: number} = {
    "HP": 20,
    "KP": 20,
    "AP": 20
  };
  const radiansPerSecond = THREE.MathUtils.degToRad(120);
  const radiansPerSecondJoints: {[key: string]: number} = {
    "HP": THREE.MathUtils.degToRad(10),
    "KP": THREE.MathUtils.degToRad(10),
    "AP": THREE.MathUtils.degToRad(10)
  };

  const _calculateNextJointValue = (oldVal: number, delta: number, degree: number): number => {
    return oldVal + delta * degree;
  }

  const _setJointValue = (robot: URDFRobot, jointKey: string, delta: number, degree: number) => {
    const jointValue = _calculateNextJointValue(robot.joints[jointKey].jointValue[0] as number, delta, degree);
    if (jointKey.startsWith("HP")) {
      console.log(Math.abs(THREE.MathUtils.radToDeg(jointValue)) >= Math.abs((radiansLimit[jointKey.slice(0, -1)])));
    }
    if (Math.abs(THREE.MathUtils.radToDeg(jointValue)) >= Math.abs((radiansLimit[jointKey.slice(0, -1)]))) {
      const _key = jointKey.slice(0, -1);
      radiansLimit[_key] = 0;
      radiansPerSecondJoints[_key] = -radiansPerSecondJoints[_key];
    }
    robot.joints[jointKey].setJointValue(jointValue);
  }

  // mesh.rotation.y += radiansPerSecond * delta;

  for (let i = 1; i <= 6; i++) {
    mesh = (mesh as URDFRobot);
    _setJointValue(mesh, `HP${i}`, delta, radiansPerSecondJoints["HP"]);
    // _setJointValue(mesh, `KP${i}`, delta, radiansPerSecondJoints["KP"]);
    // _setJointValue(mesh, `AP${i}`, delta, radiansPerSecondJoints["AP"]);
  }
};

const meshes = computed(() => {
  const amount = 10;
  const offset = (amount - 1) / 2;

  const materialColorProp = 'rgb(255, 255, 0)';
  const materialEmissiveColor = 'rgb(255,128,64)';
  const materialSpecularColor = 'rgb(255,155,255)';
  const materialShininess = 10;
  const materialOpacity = 1;

  let arr = [];
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        const object = {
          key: `${i}${j}${k}`,
          geometry: 'Capsule',
          material: 'Phong',
          position: { x: offset - i, y: offset - j, z: offset - k },
          materialProps: {
            color: materialColorProp,
            emissive: materialEmissiveColor,
            specular: materialSpecularColor,
            shininess: materialShininess,
            opacity: materialOpacity
          },
          geometryProps: {
            radius: 0.3,
            length: 0.3
          }
        };
        arr.push(object);
      }
    }
  }

  return arr;
});

</script>

<template>
  <Renderer :width="width" :height="height">
    <Camera :fov="75" :aspect="width / height" :near="0.1" :far="1000" :position="{ x: 10, y: 10, z: 10 }" />
    <Scene :background="sceneBackground">
      <Mesh src="/assets/models/T12/urdf/T12.URDF" :loader="new URDFLoader()" :position="{ x: 0, y: 0, z: 0 }"
        :onMeshRotation="handleMeshChange" />
    </Scene>
  </Renderer>
</template>
