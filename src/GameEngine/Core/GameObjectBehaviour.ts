// @ts-ignore
import GameObject from "./GameObject";

export default class GameObjectBehaviour {
  protected _gameObject: GameObject;
  constructor() {}

  public set gameObject(gameObject: GameObject) {
    this._gameObject = gameObject;
  }
  start(): void {}

  update(): void {}

  render(): void {}

  destroy(): void {}
}
