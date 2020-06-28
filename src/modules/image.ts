import * as THREE from "three";
import { TweenMax } from "gsap";

export default class Image {
  private mouse: THREE.Vector2;
  private scene: THREE.Scene;
  private imageId: string;
  private imagePath: string;
  private image: THREE.Mesh | undefined;

  constructor(
    scene: THREE.Scene,
    mouse: THREE.Vector2,
    imageId: string,
    imagePath: string
  ) {
    this.scene = scene;
    this.mouse = mouse;
    this.imageId = imageId;
    this.imagePath = imagePath;
    this.image = new THREE.Mesh();
  }

  setup() {
    this.image = this.createMesh(this.scene, this.imageId, this.imagePath);

    if (this.image) {
      this.scene.add(this.image);
    }
  }

  createMesh(
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

    return mesh;
  }

  sway() {
    if (this.image == undefined) return;

    TweenMax.to(this.image.rotation, 0.5, {
      x: -this.mouse.y * 0.3,
      y: this.mouse.x * (Math.PI / 6)
    });
  }
}
