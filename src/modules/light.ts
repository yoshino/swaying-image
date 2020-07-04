import * as THREE from "three";

export default class Light {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  setup() {
    this.addAmbientLight();
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff);

    this.scene.add(light);
  }
}
