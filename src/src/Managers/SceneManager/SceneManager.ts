import GameConfiguration from "../../Configuration/GameConfiguration";
import Scene from "../../Interfaces/SceneManager/Scene";
import BaseScene from "../../Interfaces/GameScene/BaseScene";

class SceneManager extends Scene {
  public static loadScene(stage: BaseScene) {
    GameConfiguration.setConfiguration("scene", stage);
  }
}

export default SceneManager;
