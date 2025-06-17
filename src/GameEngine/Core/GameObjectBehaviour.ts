// @ts-ignore
import { Vector2 } from "../Types/HelperTypes";
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

  protected InstantiateObject(
    gameObject: GameObject,
    spawnPosition?: Vector2
  ): GameObject {
    if (!gameObject) {
      console.error(
        "GameObjectBehaviour.InstantiateObject: GameObject is null."
      );
      return null;
    }

    if (!spawnPosition) {
      spawnPosition = gameObject.position;
    }

    const behaviours: GameObjectBehaviour[] = [];
    gameObject.behaviours.forEach((behaviour) => {
      const behaviourCopy = Object.create(behaviour);
      behaviourCopy.gameObject = null; // Reset the gameObject reference
      behaviours.push(behaviourCopy);
    });

    const objectInstance = new GameObject(
      gameObject.objectName + "_copy",
      spawnPosition,
      behaviours
    );

    SceneManager.getInstance().AddObjectToActiveScene(objectInstance);
    return objectInstance;
  }

  protected DestroyObject(gameObject: GameObject): void {
    if (!gameObject) {
      console.error("GameObjectBehaviour.DestroyObject: GameObject is null.");
      return;
    }

    const activeScene = SceneManager.getInstance().getActiveScene();
    if (activeScene) {
      activeScene.removeObject(gameObject);
    } else {
      console.error("GameObjectBehaviour.DestroyObject: No active scene.");
    }
  }
}
