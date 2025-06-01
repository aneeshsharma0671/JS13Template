import GameObjectBehaviour from "../../Core/GameObjectBehaviour";
import { Renderer } from "../../Core/renderer";
import { Vector2 } from "../../Types/HelperTypes";

export default class CircleRenderer extends GameObjectBehaviour {
  private _center: Vector2;
  private _radius: number;
  private _color: string;

  constructor(center: Vector2, radius: number, color: string) {
    super();
    this._center = center;
    this._radius = radius;
    this._color = color;
  }

  start(): void {
    super.start();
    this.renderCircle();
  }

  private renderCircle(): void {
    Renderer.instance.DrawCircle(
      this._center.x,
      this._center.y,
      this._radius,
      this._color
    );
    console.log(
      `CircleRenderer: Circle rendered at (${this._center.x}, ${this._center.y}) with radius ${this._radius} and color ${this._color}`
    );
  }
}
