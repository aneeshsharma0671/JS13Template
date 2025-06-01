// @ts-ignore
import GameObjectBehaviour from "../../Core/GameObjectBehaviour";
import { Renderer } from "../../Core/renderer";
import { Vector2 } from "../../Types/HelperTypes";

export default class RectRenderer extends GameObjectBehaviour {
  private _positionOffset: Vector2;
  private _width: number;
  private _height: number;
  private _color: string;

  constructor(
    positionOffset: Vector2,
    width: number,
    height: number,
    color: string
  ) {
    super();
    this._positionOffset = positionOffset;
    this._width = width;
    this._height = height;
    this._color = color;
  }

  start(): void {
    super.start();
    this.renderRect();
    console.log(this._gameObject);
  }

  render(): void {
    super.render();
    this.renderRect();
  }

  private renderRect(): void {
    Renderer.instance.DrawRect(
      this._gameObject.position.x + this._positionOffset.x,
      this._gameObject.position.y + this._positionOffset.y,
      this._width,
      this._height,
      this._color
    );
    console.log(
      `RectRenderer: Rectangle rendered at (${this._positionOffset.x}, ${this._positionOffset.y}) with width ${this._width}, height ${this._height}, and color ${this._color}`
    );
  }
}
