import * as THREE from "three";

export default class Camera {
  static create(): THREE.PerspectiveCamera {
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180); // 視野角をラジアンに変換
    const dist = window.innerHeight / 2 / Math.tan(fovRad); // ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      1,
      dist * 2
    );
    camera.position.z = dist; // カメラを遠ざける

    return camera;
  }
}
