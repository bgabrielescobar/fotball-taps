import SceneManager from "../Managers/SceneManager/SceneManager";
import GameConfiguration from "../Configuration/GameConfiguration";
import Game from "../Game/Game";

class Bootstrap {
  public run() {
    GameConfiguration.initConfiguration();

    new Game().start();
  }
}

export default Bootstrap;
