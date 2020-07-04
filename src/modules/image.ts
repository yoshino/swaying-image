import * as THREE from "three";
import { TweenMax } from "gsap";

export default class Image {
  private scene: THREE.Scene;
  private imageId: string;
  private imagePath: string;
  image: THREE.Mesh | undefined;
  rect: DOMRect;

  constructor(scene: THREE.Scene, imageId: string, imagePath: string) {
    this.scene = scene;
    this.imageId = imageId;
    this.imagePath = imagePath;
    this.image = new THREE.Mesh();
    this.rect = new DOMRect();
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
    this.rect = image.getBoundingClientRect();

    const center = new THREE.Vector2(
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height / 2
    );
    const diff = new THREE.Vector2(
      center.x - window.innerWidth / 2,
      center.y - window.innerHeight / 2
    );

    const geometry = new THREE.PlaneBufferGeometry(
      this.rect.width,
      this.rect.height
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imagePath);
    material.map = texture;

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(diff.x, -diff.y, 1);

    return mesh;
  }

  sway(mouse: THREE.Vector3) {
    if (this.image == undefined) return;

    // 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
    // 画像の左上をwindowの左上にoffsetしてあげてから正規化するのがポイント
    // ref: https://qiita.com/edo_m18/items/5aff5c5e4f421ddd97dc
    const x = ((mouse.x - this.rect.left) / this.rect.width) * 2 - 1;
    const y = -((mouse.y - this.rect.top) / this.rect.height) * 2 + 1;

    // TweenMaxを使わないとカクついてしまう
    // TweenMax.to('操作するオブジェクト', アニメーション時間, {アニメーション内容})
    TweenMax.to(this.image.rotation, 0.5, {
      x: -y * 0.3,
      y: x * (Math.PI / 6)
    });
  }
}
