import GameObject from "./GameObject";

export default class Scene {
  private _name: string;
  private _objects: GameObject[] = [];

  constructor(name: string, objects: GameObject[] = []) {
    this._objects = objects;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get objects() {
    return this._objects;
  }

  addObject(object: GameObject) {
    this._objects.push(object);
    object.objectStart(); // Automatically start the object when added
  }

  removeObject(object: GameObject) {
    const index = this._objects.indexOf(object);
    if (index > -1) {
      this._objects.splice(index, 1);
    }
  }

  sceneStart(): void {
    this._objects.forEach((object) => {
      object.objectStart();
    });
  }

  sceneUpdate(): void {
    this._objects.forEach((object) => {
      object.objectUpdate();
    });
  }

  sceneRender(): void {
    this._objects.forEach((object) => {
      object.objectRender();
    });
  }

  sceneDestroy(): void {
    this._objects.forEach((object) => {
      object.objectDestroy();
    });
  }
}
