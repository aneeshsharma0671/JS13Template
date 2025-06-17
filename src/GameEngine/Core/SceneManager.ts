import GameObject from "./GameObject";
import Scene from "./scene";

export default class SceneManager {
  private static instance: SceneManager;
  private scenes: Map<string, Scene>;
  private activeScene: Scene | null;

  private constructor() {
    this.scenes = new Map<string, Scene>();
    this.activeScene = null;
  }

  public static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  public static get ActiveScene(): Scene | null {
    return SceneManager.getInstance().getActiveScene();
  }

  public addScene(scene: Scene | Scene[]): void {
    if (Array.isArray(scene)) {
      scene.forEach((s) => this.scenes.set(s.name, s));
    } else {
      this.scenes.set(scene.name, scene);
    }
  }

  public setActiveScene(sceneName: string): void {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      this.activeScene = scene;
    } else {
      console.error(
        `SceneManager.setActiveScene: Scene "${sceneName}" not found.`
      );
    }
  }

  public changeScene(sceneName: string): void {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      if (this.activeScene) {
        this.activeScene.sceneDestroy();
      }
      this.activeScene = scene;
      this.activeScene.sceneStart();
    } else {
      console.error(
        `SceneManager.changeScene: Scene "${sceneName}" not found.`
      );
    }
  }

  public getActiveScene(): Scene | null {
    return this.activeScene;
  }

  public AddObjectToActiveScene(object: GameObject): void {
    if (!this.activeScene) {
      console.error("SceneManager.AddObjectToActiveScene: No active scene.");
      return;
    }
    this.activeScene.addObject(object);
  }
}
