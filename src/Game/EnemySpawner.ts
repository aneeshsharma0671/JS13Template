// import CircleRenderer from "../GameEngine/Behaviours/renderers/circleRenderer";
// import GameObject from "../GameEngine/Core/GameObject";
// import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";
// import { Renderer } from "../GameEngine/Core/renderer";
// import { Vector2 } from "../GameEngine/Types/HelperTypes";

// export default class EnemySpawnerBehaviour extends GameObjectBehaviour {
//   public spawnInterval: number; // Time in milliseconds
//   public enemyRadius: number;
//   public enemyColor: string;
//   private timeSinceLastSpawn: number;

//   constructor(
//     spawnInterval: number = 5000,
//     enemyRadius: number = 10,
//     enemyColor: string = "red"
//   ) {
//     super();
//     this.spawnInterval = spawnInterval;
//     this.enemyRadius = enemyRadius;
//     this.enemyColor = enemyColor;
//     this.timeSinceLastSpawn = 0;
//   }

//   start(): void {
//     super.start();
//     console.log(
//       `EnemySpawnerBehaviour started. Spawning enemies every ${
//         this.spawnInterval / 1000
//       } seconds.`
//     );
//     // Optionally spawn one enemy immediately
//     // this.spawnEnemy();
//   }

//   update(): void {
//     super.update();
//     this.timeSinceLastSpawn += deltaTime;

//     if (this.timeSinceLastSpawn >= this.spawnInterval) {
//       this.spawnEnemy();
//       this.timeSinceLastSpawn = 0; // Reset timer
//     }
//   }

//   private spawnEnemy(): void {
//     if (!this._gameObject.scene) {
//       console.warn(
//         "EnemySpawnerBehaviour: Scene not found on parent GameObject. Cannot spawn enemy."
//       );
//       return;
//     }

//     // Spawn at a random position within the canvas bounds
//     const spawnPosition: Vector2 = {
//       x: Math.random() * Renderer.CANVAS_SIZE.x,
//       y: Math.random() * Renderer.CANVAS_SIZE.y,
//     };

//     const enemyBehaviours: GameObjectBehaviour[] = [
//       new CircleRenderer({ x: 0, y: 0 }, this.enemyRadius, this.enemyColor),
//       // TODO: Add other enemy behaviours here (e.g., movement, health)
//     ];

//     const newEnemy = new GameObject(
//       `Enemy_${Date.now()}`, // Unique name for the enemy
//       spawnPosition,
//       enemyBehaviours
//     );

//     // Add the new enemy to the current scene
//     this._gameObject.scene.addObject(newEnemy);

//     // IMPORTANT: The new enemy's behaviours need their start() method called.
//     // This should ideally be handled by the scene or engine when an object is added dynamically.
//     // For now, we explicitly call it.
//     newEnemy.objectStart();

//     console.log(
//       `Enemy spawned: ${newEnemy.objectName} at (${spawnPosition.x.toFixed(
//         2
//       )}, ${spawnPosition.y.toFixed(2)})`
//     );
//   }

//   destroy(): void {
//     super.destroy();
//     console.log("EnemySpawnerBehaviour destroyed.");
//   }
// }
