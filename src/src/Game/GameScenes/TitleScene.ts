import BaseScene from "../../Interfaces/GameScene/BaseScene";
import Configuration from "../../Configuration/GameConfiguration";
import GameScene from "./GameScene";

class TitleScene extends BaseScene {
  private backgroundMusic: HTMLAudioElement;
  private isRunning: boolean = true;

  public run(): void {
    this.gameLoop = this.gameLoop.bind(this);
    this.setUpImage();
    this.setUpAudio();
    this.imageClickEvent();
    requestAnimationFrame(this.gameLoop);
  }

  protected setUpImage(): void {
    this.image = new Image();
    this.image.src = Configuration.getConfiguration("main_logo_src");
    this.loadImage(0, 0, 0, 0);
  }

  protected setUpAudio(): void {
    this.backgroundMusic = new Audio(
      Configuration.getConfiguration("game_music")
    );
    this.backgroundMusic.loop = true;
  }

  protected gameLoop(): void {
    if (!this.isRunning) return;

    this.clear();
    this.render();

    requestAnimationFrame(this.gameLoop);
  }

  protected update(): void {}

  protected render(): void {
    const ctx = Configuration.getConfiguration("context");
    ctx.drawImage(
      this.image,
      window.innerWidth / 3,
      window.innerHeight / 12,
      700,
      700
    );
    ctx.font = `48px 'Press Start 2P', cursive`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(
      "Click to Start the Game",
      window.innerWidth / 2,
      window.innerHeight - 50
    );
  }

  protected imageClickEvent() {
    Configuration.getConfiguration("canvas").addEventListener(
      "click",
      () => {
        this.backgroundMusic.play();
        this.isRunning = false;
        this.clear();
        let gameScene = new GameScene();
        Configuration.setConfiguration("game", gameScene);
        gameScene.run();
      },
      { once: true }
    );
  }
}

export default TitleScene;
