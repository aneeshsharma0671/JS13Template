import { Time } from "../GameEngine/Core/GameEngine";
import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";
import { Renderer } from "../GameEngine/Core/renderer";
import { Vector2 } from "../GameEngine/Types/HelperTypes";

export default class MoveObjectBehaviour extends GameObjectBehaviour {
  public speed: number;
  private keysPressed: Set<string>;

  constructor(speed: number = 1) {
    // Default speed 100 pixels per second
    super();
    this.speed = speed;
    this.keysPressed = new Set<string>();
  }

  start(): void {
    super.start();
    // Add event listeners for keydown and keyup
    // Binding 'this' to ensure correct context within event handlers
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    console.log("MoveObjectBehaviour started. Use WASD keys to move.");
    this._gameObject.position = {
      x: Renderer.CANVAS_SIZE.x / 2,
      y: Renderer.CANVAS_SIZE.y / 2,
    };
  }

  update(): void {
    super.update();
    if (!this._gameObject) {
      // console.warn("MoveObjectBehaviour: GameObject or Transform not found.");
      return;
    }

    const moveDirection: Vector2 = { x: 0, y: 0 };

    if (this.keysPressed.has("w")) {
      moveDirection.y -= 1;
    }
    if (this.keysPressed.has("s")) {
      moveDirection.y += 1;
    }
    if (this.keysPressed.has("a")) {
      moveDirection.x -= 1;
    }
    if (this.keysPressed.has("d")) {
      moveDirection.x += 1;
    }

    // Normalize diagonal movement (optional, but good practice)
    const magnitude = Math.sqrt(
      moveDirection.x * moveDirection.x + moveDirection.y * moveDirection.y
    );
    if (magnitude > 0) {
      moveDirection.x /= magnitude;
      moveDirection.y /= magnitude;
    }

    // Update GameObject's position
    this._gameObject.position = {
      x:
        this._gameObject.position.x +
        moveDirection.x * this.speed * Time.deltaTime,
      y:
        this._gameObject.position.y +
        moveDirection.y * this.speed * Time.deltaTime,
    };
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.keysPressed.add(event.key.toLowerCase());
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.keysPressed.delete(event.key.toLowerCase());
  }

  destroy(): void {
    // Clean up event listeners when the behaviour or GameObject is destroyed
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    document.removeEventListener("keyup", this.handleKeyUp.bind(this));
    super.destroy?.(); // Call super.destroy if it exists
    console.log("MoveObjectBehaviour destroyed, event listeners removed.");
  }
}
