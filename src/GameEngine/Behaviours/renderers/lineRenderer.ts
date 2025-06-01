import GameObjectBehaviour from "../../Core/GameObjectBehaviour";
import { Renderer } from "../../Core/renderer";
import { Vector2 } from "../../Types/HelperTypes";

export default class lineRenderer extends GameObjectBehaviour {
  private _startPosition: Vector2;
  private _endPosition: Vector2;

  constructor(startPos: Vector2, endPos: Vector2) {
    super();
    this._startPosition = startPos;
    this._endPosition = endPos;
  }

  start(): void {
    super.start();
    Renderer.instance.DrawLine(
      this._startPosition.x,
      this._startPosition.y,
      this._endPosition.x,
      this._endPosition.y
    );
    console.log(
      `lineRenderer: Line drawn from (${this._startPosition.x}, ${this._startPosition.y}) to (${this._endPosition.x}, ${this._endPosition.y})`
    );
  }
}
