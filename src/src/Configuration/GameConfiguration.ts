import TitleScene from "../Game/GameScenes/TitleScene";
import ClickIntro from "../../res/img/introscene/click-intro.jpg";
import SoccerBall from "../../res/img/introscene/ball.png";
import TitleMusic from "../../res/music/title-screen.mp3";
import GameMusic from "../../res/music/match.mp3";
import KickBallSound from "../../res/sound/kick.wav";

class GameConfiguration {
  private static configuration: any = {};

  public static initConfiguration() {
    // Set up render
    this.configuration["canvas"] =
      document.querySelector("#canvas") || document.querySelector(".canvas");

    this.configuration["context"] =
      this.configuration["canvas"].getContext("2d");

    this.configuration["title"] = new TitleScene();

    // Setting window dimensions
    this.configuration["canvas"].width = window.innerWidth;
    this.configuration["canvas"].height = window.innerHeight;

    this.configuration["main_logo_src"] = ClickIntro;
    this.configuration["balls_soccer"] = SoccerBall;

    this.configuration["title_music"] = TitleMusic;
    this.configuration["game_music"] = GameMusic;

    this.configuration["kickball_sound"] = KickBallSound;
  }

  public static getConfiguration(target: string): any {
    return this.configuration[target] ? this.configuration[target] : false;
  }

  public static setConfiguration(target: string, value: any): boolean {
    if (!this.configuration[target]) {
      this.configuration[target] = value;
      return true;
    }
    return false;
  }
}

export default GameConfiguration;
