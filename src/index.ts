import MoveObjectBehaviour from "./Game/MoveObject";
import RectRenderer from "./GameEngine/Behaviours/renderers/rectRenderer";
import GameEngine from "./GameEngine/Core/GameEngine";
import GameObject from "./GameEngine/Core/GameObject";
import Scene from "./GameEngine/Core/scene";

export const WIDTH = 1920;
export const HEIGHT = 1080;

const engine = new GameEngine({ x: WIDTH, y: HEIGHT });

engine.init([
  new Scene("Main Scene", [
    new GameObject("Rect", { x: 100, y: 100 }, [
      new RectRenderer({ x: 0, y: 0 }, 100, 100, "#FF0000"),
      new MoveObjectBehaviour(10), // Speed of 100 pixels per second
    ]),
    new GameObject("Rect2", { x: 10, y: 500 }, [
      new RectRenderer({ x: 0, y: 0 }, 100, 100, "#FFFF00"),
      //new MoveObjectBehaviour(10), // Speed of 100 pixels per second
    ]),
  ]),
]);

engine.startEngine();
