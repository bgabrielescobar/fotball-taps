export default class Ball {
  x: number = 0;
  y: number = 0;
  radius: number = 100;
  velocityX: number = 2;
  velocityY: number = 1;
  gravity: number = 0.5;
  bounce: number = 25;

  MAX_FALL_SPEED = 26;
  BOUNCE_DAMPING = 0.6;
  KICK_FORCE = -12;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}
