import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class HandLandmarkerManager {
  private static instance: HandLandmarker | null = null;

  static async getInstance(): Promise<HandLandmarker> {
    if (this.instance) return this.instance;

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.instance = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task`,
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });

    return this.instance;
  }
}
