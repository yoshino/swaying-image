<template>
  <div class="gooey-image">
    <h1>Gooey Image</h1>
    <div class="container">
      <div id="image"></div>
      <div id="image2"></div>
    </div>
    <div id="webgl-output"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import { TweenMax } from "gsap";

import Light from "@/modules/light.ts";
import Camera from "@/modules/camera.ts";
import Image from "@/modules/image.ts";

@Component
export default class HolographicInteractions extends Vue {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  light = new Light(this.scene);
  camera = Camera.create();

  image = new THREE.Mesh() as THREE.Mesh | undefined;
  image2 = new THREE.Mesh() as THREE.Mesh | undefined;

  mouse = new THREE.Vector2();

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
    this.image = Image.create(this.scene, "image", "./base.jpg");
    this.image2 = Image.create(this.scene, "image2", "./hover.jpg");
    this.animate();
  }

  onMouseMove(event: MouseEvent) {
    // 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
    TweenMax.to(this.mouse, 0.5, {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    });
  }

  animate() {
    if (this.image) this.draw(this.image);
    if (this.image2) this.draw(this.image2);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  draw(image: THREE.Mesh) {
    TweenMax.to(image.rotation, 0.5, {
      x: -this.mouse.y * 0.3,
      y: this.mouse.x * (Math.PI / 6)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

#image {
  width: 300px;
  height: 300px;
}

#image2 {
  width: 300px;
  height: 300px;
}

#webgl-output {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}
</style>
