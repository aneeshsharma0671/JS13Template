import { Vector2 } from "../Types/HelperTypes";
import GameObjectBehaviour from "./GameObjectBehaviour";

export default class GameObject {
  private _objectName: string;
  private _position: Vector2;
  private _behaviours: GameObjectBehaviour[];

  constructor(
    objectName: string,
    pos: Vector2,
    behaviours: GameObjectBehaviour[]
  ) {
    this._objectName = objectName;
    this._position = pos;
    this._behaviours = behaviours;
    this._behaviours.forEach((behaviour) => {
      behaviour.gameObject = this;
    });
  }

  public set position(pos: Vector2) {
    this._position = pos;
  }

  public get position(): Vector2 {
    return this._position;
  }

  public get objectName(): string {
    return this._objectName;
  }

  objectStart(): void {
    this._behaviours.forEach((behaviour) => {
      behaviour.start();
    });
  }

  objectUpdate(): void {
    this._behaviours.forEach((behaviour) => {
      behaviour.update();
    });
  }

  objectRender(): void {
    this._behaviours.forEach((behaviour) => {
      behaviour.render();
    });
  }

  objectDestroy(): void {
    this._behaviours.forEach((behaviour) => {
      behaviour.destroy();
    });
  }
}
