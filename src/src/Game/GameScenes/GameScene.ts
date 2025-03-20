import BaseScene from "../../Interfaces/GameScene/BaseScene";
import Configuration from "../../Configuration/GameConfiguration";
import Ball from "../Entity/Ball";

class GameScene extends BaseScene {
  protected timer: number = 3;
  protected ball: Ball;
  protected score: number = 0;
  protected gameOver: boolean = false;
  protected kickSound: HTMLAudioElement;

  public run(): void {
    this.gameLoop = this.gameLoop.bind(this);
    this.ball = new Ball(window.innerWidth / 2, window.innerHeight / 5);
    this.setUpImage();
    this.startCounter();
    this.ballClickEvent();
  }

  protected setUpAudio(): void {
    this.kickSound = new Audio(
      Configuration.getConfiguration("kickball_sound")
    );
  }

  protected setUpImage(): void {
    this.image = new Image();
    this.image.src = Configuration.getConfiguration("balls_soccer");
    this.loadImage(this.ball.getX(), this.ball.getY(), 0, 0);
  }

  protected startCounter(): void {
    this.UI();
    const countdown = setInterval(() => {
      this.timer--;
      this.UI();
      this.render();
      if (this.timer <= 0) {
        clearInterval(countdown);
        this.gameLoop();
      }
    }, 1000);
  }

  protected UI() {
    let ctx = Configuration.getConfiguration("context");
    if (this.timer >= 1) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "48px 'Press Start 2P'";
      ctx.fillText(
        this.timer.toString(),
        window.innerWidth / 2,
        window.innerHeight / 2
      );
    }
    ctx.font = "38px 'Press Start 2P'";
    ctx.fillText(`Score:${this.score}`, window.innerWidth / 2, 50);

    if (this.gameOver) {
      ctx.font = "38px 'Press Start 2P'";
      ctx.fillText(`GAME OVER`, window.innerWidth / 2, window.innerHeight / 2);
    }
  }

  protected gameLoop(): void {
    this.clear();
    this.UI();
    if (this.gameOver) {
      return;
    }
    this.render();
    this.update();
    requestAnimationFrame(this.gameLoop);
  }

  protected update(): void {
    let canvas = Configuration.getConfiguration("canvas");

    if (this.ball.velocityY < this.ball.MAX_FALL_SPEED) {
      this.ball.velocityY += this.ball.gravity;
    } else {
      this.ball.velocityY = this.ball.MAX_FALL_SPEED;
    }

    this.ball.y += this.ball.velocityY;
    this.ball.x += this.ball.velocityX;

    if (this.ball.y + this.ball.radius > canvas.height) {
      this.gameOver = true;
      this.ball.y = canvas.height - this.ball.radius;
      this.ball.velocityY *= -this.ball.BOUNCE_DAMPING;
    }

    if (
      this.ball.x - this.ball.radius < 0 ||
      this.ball.x + this.ball.radius > canvas.width
    ) {
      this.ball.velocityX *= -0.8;
    }
  }

  protected render(): void {
    let ctx = Configuration.getConfiguration("context");
    ctx.drawImage(
      this.image,
      this.ball.x - this.ball.radius,
      this.ball.y - this.ball.radius,
      this.ball.radius * 2,
      this.ball.radius * 2
    );
  }

  protected ballClickEvent(): void {
    Configuration.getConfiguration("canvas").addEventListener(
      "click",
      (event) => {
        const rect =
          Configuration.getConfiguration("canvas").getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        this.setUpAudio();
        this.kickSound.play();

        const distancia = Math.sqrt(
          Math.pow(clickX - this.ball.x, 2) + Math.pow(clickY - this.ball.y, 2)
        );

        if (distancia <= this.ball.radius) {
          this.score++;
          const impactZone = (clickX - this.ball.x) / this.ball.radius;

          if (Math.abs(impactZone) < 0.1) {
            this.ball.velocityY =
              this.ball.KICK_FORCE * Math.floor(Math.random() * 4) + 1;
            this.ball.velocityX = Math.floor(Math.random() * 8) + 1;
          } else if (impactZone > 0) {
            this.ball.velocityY = this.ball.KICK_FORCE;
            this.ball.velocityX = -Math.abs(impactZone) * 5;
          } else {
            this.ball.velocityY = this.ball.KICK_FORCE;
            this.ball.velocityX = Math.abs(impactZone) * 5;
          }
        }
      }
    );
  }
}

export default GameScene;
