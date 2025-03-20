import Configuration from "../../Configuration/GameConfiguration";

export default abstract class BaseScene implements IScene {
  protected image: any;
  protected loadImage(x, y, width, height): void {
    this.image.onload = () =>
      Configuration.getConfiguration("context").drawImage(
        this.image,
        x,
        y,
        width,
        height
      );
  }

  protected clear(): void {
    Configuration.getConfiguration("context").clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
  }
}

interface IScene {
  run: Function;
  update: Function;
  render: Function;
  gameLoop: Function;
  setUpAudio: Function;
  setUpImage: Function;
}
