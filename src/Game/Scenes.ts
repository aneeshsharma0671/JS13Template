import CircleRenderer from "../GameEngine/Behaviours/renderers/circleRenderer";
import RectRenderer from "../GameEngine/Behaviours/renderers/rectRenderer";
import GameObject from "../GameEngine/Core/GameObject";
import GameObjectBehaviour from "../GameEngine/Core/GameObjectBehaviour";
import { Renderer } from "../GameEngine/Core/renderer";
import Scene from "../GameEngine/Core/scene";
import AutoDestroyBehaviour from "./AutoDestroy";
import EnemySpawnerBehaviour from "./EnemySpawner";
import MoveObjectBehaviour from "./MoveObject";

const Player: GameObject = new GameObject("Player", { x: 0, y: 0 }, [
  new CircleRenderer({ x: 0, y: 0 }, 100, "blue"),
  new MoveObjectBehaviour(1000),
]);

const EnemyPrefab = new GameObject(
  `Enemy_${Date.now()}`, // Unique name for the enemy
  { x: 0, y: 0 },
  [
    new CircleRenderer({ x: 0, y: 0 }, 50, "red"),
    new AutoDestroyBehaviour(6),
    // TODO: Add other enemy behaviours here (e.g., movement, health)
  ]
);

const EnemySpawner: GameObject = new GameObject(
  "EnemySpawner",
  { x: 0, y: 0 },
  [new EnemySpawnerBehaviour(1000, EnemyPrefab)]
);

const GameScene: Scene = new Scene("Main Scene", [Player, EnemySpawner]);

export const SCENES: Scene[] = [GameScene];
