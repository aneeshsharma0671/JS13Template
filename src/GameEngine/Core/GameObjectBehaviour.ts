// @ts-ignore
import GameObject from "./GameObject";
import SceneManager from "./SceneManager";

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

  protected InstantiateObject(gameObject: GameObject): void {
    if (!gameObject) {
      console.error(
        "GameObjectBehaviour.InstantiateObject: GameObject is null."
      );
      return;
    }

    SceneManager.getInstance().AddObjectToActiveScene(gameObject);
  }
}
