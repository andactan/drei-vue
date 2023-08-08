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

const sceneBackground = new THREE.Color('skyblue');

const width = window.innerWidth;
const height = window.innerHeight;
const counter = 0;

const radiansLimit: { [key: string]: number } = {
  HP: THREE.MathUtils.degToRad(30),
  KP: THREE.MathUtils.degToRad(40),
  AP: THREE.MathUtils.degToRad(40)
};

const radiansPerSecondJoints: { [key: string]: number } = {
  HP: THREE.MathUtils.degToRad(10),
  KP: THREE.MathUtils.degToRad(10),
  AP: THREE.MathUtils.degToRad(10)
};

const handleMeshChange = (mesh: THREE.Mesh | URDFRobot, delta: number): void => {
  const _calculateNextJointValue = (oldVal: number, delta: number, degree: number): number => {
    return oldVal + delta * degree;
  };

  const _setJointValue = (robot: URDFRobot, jointKey: string, delta: number, degree: number) => {
    let jointValue = _calculateNextJointValue(
      robot.joints[jointKey].jointValue[0] as number,
      delta,
      degree
    );
    // if (jointKey.startsWith("HP")) {
    //   console.log(Math.abs(THREE.MathUtils.radToDeg(jointValue)) >= Math.abs((radiansLimit[jointKey.slice(0, -1)])));
    // }
    const jointGroupKey = jointKey.slice(0, -1);
    if (Math.abs(jointValue) > Math.abs(radiansLimit[jointGroupKey])) {
      jointValue = radiansLimit[jointGroupKey];
      radiansLimit[jointGroupKey] = -radiansLimit[jointGroupKey];
      radiansPerSecondJoints[jointGroupKey] = -radiansPerSecondJoints[jointGroupKey];
    }

    robot.joints[jointKey].setJointValue(jointValue);
  };

  for (let i = 1; i <= 6; i++) {
    mesh = mesh as URDFRobot;
    _setJointValue(mesh, `HP${i}`, delta, radiansPerSecondJoints['HP']);
    _setJointValue(mesh, `KP${i}`, delta, radiansPerSecondJoints['KP']);
  }
};
</script>

<template>
  <Renderer :width="width" :height="height">
    <Camera
      :fov="75"
      :aspect="width / height"
      :near="0.1"
      :far="1000"
      :position="{ x: 10, y: 10, z: 10 }"
    />
    <Scene :background="sceneBackground">
      <Mesh
        src="/assets/models/T12/urdf/T12.URDF"
        :loader="new URDFLoader()"
        :position="{ x: 0, y: 0, z: 0 }"
        :onMeshRotation="handleMeshChange"
      />
    </Scene>
  </Renderer>
</template>
