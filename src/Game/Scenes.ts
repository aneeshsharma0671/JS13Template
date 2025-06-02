import CircleRenderer from "../GameEngine/Behaviours/renderers/circleRenderer";
import RectRenderer from "../GameEngine/Behaviours/renderers/rectRenderer";
import GameObject from "../GameEngine/Core/GameObject";
import { Renderer } from "../GameEngine/Core/renderer";
import Scene from "../GameEngine/Core/scene";
import MoveObjectBehaviour from "./MoveObject";

const Player: GameObject = new GameObject("Player", { x: 0, y: 0 }, [
  new CircleRenderer({ x: 0, y: 0 }, 100, "blue"),
  new MoveObjectBehaviour(10), // Speed of 100 pixels per second
]);

const EnemySpawner: GameObject = new GameObject(
  "EnemySpawner",
  { x: 0, y: 0 },
  []
);

const GameScene: Scene = new Scene("Main Scene", [Player, EnemySpawner]);

export const SCENES: Scene[] = [GameScene];
