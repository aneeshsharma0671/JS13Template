import CircleRenderer from "../GameEngine/Behaviours/renderers/circleRenderer";
import { Time } from "../GameEngine/Core/GameEngine";
import GameObject from "../GameEngine/Core/GameObject";
import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";
import { Renderer } from "../GameEngine/Core/renderer";
import { Vector2 } from "../GameEngine/Types/HelperTypes";
import AutoDestroyBehaviour from "./AutoDestroy";

export default class EnemySpawnerBehaviour extends GameObjectBehaviour {
  public spawnInterval: number; // Time in milliseconds
  private _enemyPrefab: GameObject; // Prefab for the enemy
  private timeSinceLastSpawn: number;

  constructor(spawnInterval: number = 5000, enemyPrefab: GameObject) {
    super();
    this.spawnInterval = spawnInterval;
    this.timeSinceLastSpawn = 0;
    this._enemyPrefab = enemyPrefab;
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

    // Add the new enemy to the current scene
    const obj: GameObject = this.InstantiateObject(
      this._enemyPrefab,
      spawnPosition
    );

    console.log(
      `Enemy spawned: ${obj.objectName} at (${spawnPosition.x.toFixed(
        2
      )}, ${spawnPosition.y.toFixed(2)})`
    );
  }

  destroy(): void {
    super.destroy();
    console.log("EnemySpawnerBehaviour destroyed.");
  }
}
