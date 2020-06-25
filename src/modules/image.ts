import * as THREE from "three";

export default class Image {
  static create(
    scene: THREE.Scene,
    imageId: string,
    imagePath: string
  ): THREE.Mesh | undefined {
    const image = document.getElementById(imageId);
    if (image == undefined) return;

    // メッシュの位置は中心指定で、DOMRectの位置は左上指定なので、DOMRectの中心座標を求めて
    // ウィンドウの中心との差分をオフセットさせることで位置合わせができる
    // ウィンドウ中心からDOMRect中心へのベクトルを求めてオフセットする
    const rect = image.getBoundingClientRect();
    const center = new THREE.Vector2(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2
    );
    const diff = new THREE.Vector2(
      center.x - window.innerWidth / 2,
      center.y - window.innerHeight / 2
    );

    const geometry = new THREE.PlaneBufferGeometry(rect.width, rect.height);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imagePath);
    material.map = texture;

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(diff.x, -diff.y, 1);

    scene.add(mesh);
    return mesh;
  }
}
