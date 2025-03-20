import Configuration from "../Configuration/GameConfiguration";
import TitleScene from "./GameScenes/TitleScene";

class Game {
  public start() {
    Configuration.getConfiguration("title").run();
  }

  public run() {}
}
export default Game;
