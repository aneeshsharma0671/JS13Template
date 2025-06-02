import MoveObjectBehaviour from "./Game/MoveObject";
import { SCENES } from "./Game/Scenes";
import RectRenderer from "./GameEngine/Behaviours/renderers/rectRenderer";
import GameEngine from "./GameEngine/Core/GameEngine";
import GameObject from "./GameEngine/Core/GameObject";
import Scene from "./GameEngine/Core/scene";

export const WIDTH = 1920;
export const HEIGHT = 1080;

const engine = new GameEngine({ x: WIDTH, y: HEIGHT });

engine.init(SCENES);
engine.startEngine();
