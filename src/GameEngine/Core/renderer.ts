import { Vector2 } from "../Types/HelperTypes";

export class Renderer {
  private static _instance: Renderer | null = null;
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private static readonly _canvasSize: Vector2 = { x: 0, y: 0 };
  public static get CANVAS_SIZE(): Vector2 {
    return Renderer._canvasSize;
  }

  private constructor() {
    // Private constructor to prevent direct instantiation.
  }

  public static get instance(): Renderer {
    if (Renderer._instance === null) {
      Renderer._instance = new Renderer();
    }
    return Renderer._instance;
  }

  public initialize(canvas: HTMLCanvasElement): boolean {
    if (!canvas) {
      console.error(
        "Renderer.initialize: Provided canvas element is null or undefined."
      );
      this.canvasCtx = null;
      return false;
    }
    canvas.style.border = "1px solid black"; // Optional: Add a border for visibility
    this.canvasCtx = canvas.getContext("2d");
    if (!this.canvasCtx) {
      console.error("Renderer.initialize: Failed to get 2D rendering context.");
      return false;
    }
    Renderer.CANVAS_SIZE.x = canvas.width;
    Renderer.CANVAS_SIZE.y = canvas.height;
    console.log(
      `Renderer initialized with size: ${Renderer.CANVAS_SIZE.x}x${Renderer.CANVAS_SIZE.y}`
    );
    return true;
  }

  public DrawLine(
    startPosX: number,
    startPosY: number,
    endPosX: number,
    endPosY: number
  ): void {
    if (!this.canvasCtx) {
      console.error(
        "Renderer.DrawLine: canvasCtx is not initialized. Call initialize() first."
      );
      return;
    }
    // Note: This implementation assumes beginPath() and stroke() are called elsewhere,
    // matching the behavior of the original DrawLine function.
    this.canvasCtx.moveTo(startPosX, startPosY);
    this.canvasCtx.lineTo(endPosX, endPosY);
    this.canvasCtx.stroke();
  }

  // Add other rendering methods here as needed, for example:
  public clearCanvas(): void {
    if (this.canvasCtx && this.canvasCtx.canvas) {
      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasCtx.canvas.width,
        this.canvasCtx.canvas.height
      );
    } else {
      console.error("Renderer.clearCanvas: canvasCtx is not initialized.");
    }
  }

  public DrawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    if (!this.canvasCtx) {
      console.error("Renderer.DrawRect: canvasCtx is not initialized.");
      return;
    }
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fillRect(x, y, width, height);
  }

  public DrawCircle(
    centerX: number,
    centerY: number,
    radius: number,
    color: string
  ): void {
    if (!this.canvasCtx) {
      console.error("Renderer.DrawCircle: canvasCtx is not initialized.");
      return;
    }
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fill();
    this.canvasCtx.closePath();
  }

  public DrawImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    width?: number,
    height?: number
  ): void {
    if (!this.canvasCtx) {
      console.error("Renderer.DrawImage: canvasCtx is not initialized.");
      return;
    }
    if (width && height) {
      this.canvasCtx.drawImage(image, x, y, width, height);
    } else {
      this.canvasCtx.drawImage(image, x, y);
    }
  }
}
