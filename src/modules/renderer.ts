import * as THREE from "three";

export default class Renderrer {
  static create(): THREE.WebGLRenderer {
    const webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color("#FFFFFF")); // 背景を白色にリセット
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    const webglOutput = document.getElementById("webgl-output");
    if (webglOutput === null) return webGLRenderer;

    webglOutput.appendChild(webGLRenderer.domElement);
    return webGLRenderer;
  }
}
