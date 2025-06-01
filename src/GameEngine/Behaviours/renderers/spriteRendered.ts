import GameObjectBehaviour from "../../Core/GameObjectBehaviour";
import { Renderer } from "../../Core/renderer";
import { Vector2 } from "../../Types/HelperTypes";

export default class SpriteRenderer extends GameObjectBehaviour {
  private _spriteImage: HTMLImageElement;
  private _position: Vector2;
  private _width?: number; // Optional width for scaling
  private _height?: number; // Optional height for scaling

  constructor(
    spriteImage: HTMLImageElement,
    position: Vector2,
    width?: number,
    height?: number
  ) {
    super();
    this._spriteImage = spriteImage;
    this._position = position;
    this._width = width;
    this._height = height;
  }

  start(): void {
    super.start();
    this.renderSprite();
  }

  private renderSprite(): void {
    if (this._width && this._height) {
      Renderer.instance.DrawImage(
        this._spriteImage,
        this._position.x,
        this._position.y,
        this._width,
        this._height
      );
      console.log(
        `SpriteRenderer: Sprite rendered at (${this._position.x}, ${this._position.y}) with width ${this._width} and height ${this._height}`
      );
    } else {
      Renderer.instance.DrawImage(
        this._spriteImage,
        this._position.x,
        this._position.y
      );
      console.log(
        `SpriteRenderer: Sprite rendered at (${this._position.x}, ${this._position.y})`
      );
    }
  }
}
