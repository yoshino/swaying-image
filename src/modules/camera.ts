import * as THREE from "three";

export default class Camera {
  static create(): THREE.PerspectiveCamera {
    const fov = 50;
    const fovRad = (fov / 2) * (Math.PI / 180); // 視野角をラジアンに変換
    const dist = window.innerHeight / 2 / Math.tan(fovRad); // ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    const camera = new THREE.PerspectiveCamera(
      fov, // 視野角
      window.innerWidth / window.innerHeight, // アスペクト
      1, // どのくらい近くから描画を開始するか
      dist * 2 // どのくらい遠くまで見えるか
    );
    camera.position.z = dist; // distの分だけカメラを遠ざけるので対象の大きさがそのまま見える

    return camera;
  }
}
