import CircleRenderer from "../GameEngine/Behaviours/renderers/circleRenderer";
import { Time } from "../GameEngine/Core/GameEngine";
import GameObject from "../GameEngine/Core/GameObject";
import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";
import { Renderer } from "../GameEngine/Core/renderer";
import { Vector2 } from "../GameEngine/Types/HelperTypes";

export default class EnemySpawnerBehaviour extends GameObjectBehaviour {
  public spawnInterval: number; // Time in milliseconds
  public enemyRadius: number;
  public enemyColor: string;
  private timeSinceLastSpawn: number;

  constructor(
    spawnInterval: number = 5000,
    enemyRadius: number = 10,
    enemyColor: string = "red"
  ) {
    super();
    this.spawnInterval = spawnInterval;
    this.enemyRadius = enemyRadius;
    this.enemyColor = enemyColor;
    this.timeSinceLastSpawn = 0;
  }

  start(): void {
    super.start();
    console.log(
      `EnemySpawnerBehaviour started. Spawning enemies every ${
        this.spawnInterval / 1000
      } seconds.`
    );
    // Optionally spawn one enemy immediately
    // this.spawnEnemy();
  }

  update(): void {
    super.update();
    this.timeSinceLastSpawn += Time.deltaTime * 1000;
    if (this.timeSinceLastSpawn >= this.spawnInterval) {
      this.spawnEnemy();
      this.timeSinceLastSpawn = 0; // Reset timer
    }
  }

  private spawnEnemy(): void {
    // Spawn at a random position within the canvas bounds
    const spawnPosition: Vector2 = {
      x: Math.random() * Renderer.CANVAS_SIZE.x,
      y: Math.random() * Renderer.CANVAS_SIZE.y,
    };

    const enemyBehaviours: GameObjectBehaviour[] = [
      new CircleRenderer({ x: 0, y: 0 }, this.enemyRadius, this.enemyColor),
      // TODO: Add other enemy behaviours here (e.g., movement, health)
    ];

    const newEnemy = new GameObject(
      `Enemy_${Date.now()}`, // Unique name for the enemy
      spawnPosition,
      enemyBehaviours
    );

    // Add the new enemy to the current scene
    this.InstantiateObject(newEnemy);

    console.log(
      `Enemy spawned: ${newEnemy.objectName} at (${spawnPosition.x.toFixed(
        2
      )}, ${spawnPosition.y.toFixed(2)})`
    );
  }

  destroy(): void {
    super.destroy();
    console.log("EnemySpawnerBehaviour destroyed.");
  }
}
