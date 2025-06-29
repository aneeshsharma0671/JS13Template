import { Vector2 } from "../Types/HelperTypes";
import { Renderer } from "./renderer";
import Scene from "./scene";
import SceneManager from "./SceneManager";

export default class GameEngine {
  private _canvasElement: HTMLCanvasElement | null = null;
  private _gameLoop: GameLoop | null = null;

  constructor(canvasSize: Vector2) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.id = "game";
    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;

    document.body.appendChild(canvas);

    this._canvasElement = canvas;

    let ratio = 1;
    let x = 0;
    let y = 0;

    const resize = () => {
      ratio = Math.min(
        window.innerWidth / canvasSize.x,
        window.innerHeight / canvasSize.y
      );
      canvas.style.transformOrigin = "top left";
      x = (window.innerWidth - canvasSize.x * ratio) * 0.5;
      y = (window.innerHeight - canvasSize.y * ratio) * 0.5;
      canvas.style.transform = `translate(${x}px,${y}px) scale(${ratio})`;
    };

    resize();
    window.onresize = resize;

    let isFull = false;
    document.onfullscreenchange = () => (isFull = !isFull);
    if (!this._canvasElement) {
      console.error("GameEngine.init: canvasElement is not initialized.");
      return;
    }

    if (!Renderer.instance.initialize(this._canvasElement)) {
      console.error("GameEngine.init: Renderer initialization failed.");
      return;
    }
  }

  init(scenes: Scene[]) {
    SceneManager.getInstance().addScene(scenes);
    SceneManager.getInstance().setActiveScene(scenes[0].name);
    console.log("Game engine initialized with scenes.");
  }

  startEngine() {
    console.log("Game engine started.");
    const activeScene = SceneManager.ActiveScene;
    if (!activeScene) {
      console.error("GameEngine.start: No active scene to start.");
      return;
    }
    activeScene.sceneStart();

    this._gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    );
    this.startLoop();
  }

  startLoop() {
    if (!this._gameLoop) {
      console.error("GameEngine.startLoop: Game loop is not initialized.");
      return;
    }
    this._gameLoop.start();
    console.log("Game engine loop started.");
  }

  stopLoop() {
    if (this._gameLoop) {
      this._gameLoop.stop();
      console.log("Game engine loop stopped.");
    }
  }

  update() {
    const activeScene = SceneManager.ActiveScene;
    if (!activeScene) {
      console.warn("GameEngine.update: No active scene to update.");
      return;
    }
    activeScene.sceneUpdate();
  }

  render() {
    const activeScene = SceneManager.ActiveScene;
    if (!activeScene) {
      console.warn("GameEngine.render: No active scene to render.");
      return;
    }
    Renderer.instance.clearCanvas();
    activeScene.sceneRender();
  }

  stopEngine() {
    console.log("Game engine stopped.");
    // Additional logic to stop the game engine
    if (this._gameLoop) {
      this._gameLoop.stop();
      this._gameLoop = null;
    }
  }
}

export class Time {
  public static deltaTime: number = 0; // Time since the last frame in seconds
}

class GameLoop {
  private _updateFunction: Function;
  private _renderFunction: Function;
  private _lastFrameTime: number = 0;
  private _accumulatedTime: number = 0;
  private _timeStep: number = 1000 / 60; // Default to 60 FPS
  private _rafId: number | null = null;
  private _isRunning: boolean = false;

  constructor(updateFunction: Function, renderFunction: Function) {
    this._updateFunction = updateFunction;
    this._renderFunction = renderFunction;
  }

  mainLoop(currentTime: number) {
    if (!this._isRunning) return;

    const deltaTime = currentTime - this._lastFrameTime;
    this._lastFrameTime = currentTime;
    this._accumulatedTime += deltaTime;

    while (this._accumulatedTime >= this._timeStep) {
      Time.deltaTime = deltaTime / 1000; // Convert to seconds
      this._updateFunction(this._timeStep);
      this._accumulatedTime -= this._timeStep;
    }

    this._renderFunction();

    this._rafId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  start() {
    if (this._isRunning) return;
    this._isRunning = true;
    this._rafId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  stop() {
    if (!this._isRunning) return;
    this._isRunning = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }
}
