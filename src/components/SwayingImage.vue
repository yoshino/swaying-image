<template>
  <div class="swaying-image">
    <h1>Swaying Image</h1>
    <div class="wrap">
      <div class="container">
        <div id="image1" style="width: 320px; height: 213px;"></div>
        <div id="image2" style="width: 320px; height: 213px;"></div>
        <div id="image3" style="width: 320px; height: 213px;"></div>
      </div>
      <div class="container">
        <div id="image4" style="width: 320px; height: 213px;"></div>
        <div id="image5" style="width: 320px; height: 213px;"></div>
        <div id="image6" style="width: 320px; height: 213px;"></div>
      </div>
    </div>
    <div id="webgl-output"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";

import Light from "@/modules/light.ts";
import Camera from "@/modules/camera.ts";
import Image from "@/modules/image.ts";

@Component
export default class SwayingImage extends Vue {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  light = new Light(this.scene);
  camera = Camera.create();
  raycaster = new THREE.Raycaster();

  mouse = new THREE.Vector3();
  normalizedMouse = new THREE.Vector3();

  image1 = new Image(this.scene, "image1", "./dog1.jpg");
  image2 = new Image(this.scene, "image2", "./dog2.jpg");
  image3 = new Image(this.scene, "image3", "./dog3.jpg");
  image4 = new Image(this.scene, "image4", "./dog4.jpg");
  image5 = new Image(this.scene, "image5", "./dog5.jpg");
  image6 = new Image(this.scene, "image6", "./dog6.jpg");

  mounted() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), {
      passive: true
    });
    window.addEventListener("mousemove", ev => {
      this.onMouseMove(ev);
    });

    this.renderer.setClearColor(new THREE.Color("#FFFFFF")); // 背景を白色にリセット
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const webglOutput = document.getElementById("webgl-output");
    if (webglOutput) {
      webglOutput.appendChild(this.renderer.domElement);
    }

    this.light.setup();
    this.image1.setup();
    this.image2.setup();
    this.image3.setup();
    this.image4.setup();
    this.image5.setup();
    this.image6.setup();
    this.animate();
  }

  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  animate() {
    // raycasterはwebglの座標系で計算するので正規化してから値を渡す必要がある
    this.normalizedMouse.x = (this.mouse.x / window.innerWidth) * 2 - 1;
    this.normalizedMouse.y = -(this.mouse.y / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.normalizedMouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    for (const interact of intersects) {
      if (this.isMouseOnImage(interact, this.image1)) {
        this.image1.sway(this.mouse);
      } else if (this.isMouseOnImage(interact, this.image2)) {
        this.image2.sway(this.mouse);
      } else if (this.isMouseOnImage(interact, this.image3)) {
        this.image3.sway(this.mouse);
      } else if (this.isMouseOnImage(interact, this.image4)) {
        this.image4.sway(this.mouse);
      } else if (this.isMouseOnImage(interact, this.image5)) {
        this.image5.sway(this.mouse);
      } else if (this.isMouseOnImage(interact, this.image6)) {
        this.image6.sway(this.mouse);
      }
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  isMouseOnImage(interact: THREE.Intersection, image: Image) {
    return (
      image.image !== undefined &&
      interact.object.id == image.image.id &&
      this.mouse.x !== 0 &&
      this.mouse.y !== 0
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  display: flex;
}

#webgl-output {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}
</style>
