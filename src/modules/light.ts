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
    const light = new THREE.AmbientLight(0xffffff, 2);

    this.scene.add(light);
  }
}
