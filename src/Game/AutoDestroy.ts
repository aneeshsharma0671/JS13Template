import { Time } from "../GameEngine/Core/GameEngine";
import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";

export default class AutoDestroyBehaviour extends GameObjectBehaviour {
  private duration: number; // Time in seconds
  private timeElapsed: number;

  constructor(duration: number = 5) {
    // Default duration 5 seconds
    super();
    this.duration = duration;
    this.timeElapsed = 0;
  }

  start(): void {
    super.start();
    console.log(
      `AutoDestroyBehaviour started for ${this._gameObject.objectName}. Will destroy in ${this.duration} seconds.`
    );
  }

  update(): void {
    super.update();
    this.timeElapsed += Time.deltaTime;
    if (this.timeElapsed >= this.duration) {
      console.log(
        `AutoDestroyBehaviour: Time up for ${this._gameObject.objectName}. Destroying object.`
      );
      this.DestroyObject(this._gameObject);
    }
  }

  destroy(): void {
    super.destroy();
    console.log(
      `AutoDestroyBehaviour destroyed for ${this._gameObject.objectName}.`
    );
  }
}
