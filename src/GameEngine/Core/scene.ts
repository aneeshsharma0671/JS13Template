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

  addObject(object: any) {
    this._objects.push(object);
  }

  removeObject(object: any) {
    const index = this._objects.indexOf(object);
    if (index > -1) {
      this._objects.splice(index, 1);
    }
  }
}
