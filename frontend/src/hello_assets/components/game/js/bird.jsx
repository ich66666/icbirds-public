export default class Bird {
  constructor(p5, gb, height, width, angel, laser) {
    this.rayon = 20;
    this.time = 0;
    this.velocity = 0;
    this.jump_velocity = -6.6;
    this.gravity = 4;
    this.goup = true;
    this.p5 = p5;
    this.gifBird = gb;
    this.width = width;
    this.height = height;
    this.y = height / 2;
    this.angel = angel;
    this.laser = laser;
    this.fly_angle = 0;
    this.MAX_UPWARD_ANGLE = 15;
    this.MAX_DOWNWARD_ANGLE = -45;
    this.increment_angle = 2;
    this.bird_angular_acceleration = 0.1;
  }
  rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle) {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.translate(img_x + img_width / 2, img_y + img_width / 2);
    this.p5.rotate(this.p5.PI / 180 * img_angle);
    this.p5.image(img, 0, 0, img_width, img_height);
    this.p5.rotate(-this.p5.PI / 180 * img_angle);
    this.p5.translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
    this.p5.imageMode(this.p5.CORNER);
  }
  refreshimg(img) {
    this.gifBird = img;
  }
  preshow() {
    this.p5.image(this.gifBird, this.width / 2 - this.gifBird.width / 3, this.y - this.gifBird.height / 4, 60, 60);
    if (this.goup) {
      this.y -= 1.4;
    }
    else {
      this.y += 1.4;
    }

    if (this.y > this.p5.height / 2 + 20) {
      this.goup = true;
    } else if (this.y < this.p5.height / 2 - 20) {
      this.goup = false;
    }
  }
  show() {
    this.time += .1;
    let displacement = this.velocity * this.time + (1 / 2) * this.gravity * this.time ** 2;
    let maxdisplacement = 12;
    if (displacement > maxdisplacement) {
      displacement = maxdisplacement;
    }
    // console.log(this.y, displacement);
    this.y += displacement;
    this.legalize();
    // this.rotate_and_draw_image()
    if (displacement < 0) {
      if(this.fly_angle > this.MAX_DOWNWARD_ANGLE) this.fly_angle -= Math.abs(Math.min(this.bird_angular_acceleration*(this.MAX_DOWNWARD_ANGLE - this.fly_angle), -this.increment_angle));
      if(this.fly_angle <= this.MAX_DOWNWARD_ANGLE) this.fly_angle = this.MAX_DOWNWARD_ANGLE;
    }
    else {
      if(this.fly_angle < this.MAX_UPWARD_ANGLE) this.fly_angle += Math.max(this.bird_angular_acceleration*(this.MAX_UPWARD_ANGLE - this.fly_angle), this.increment_angle);
      if(this.fly_angle >= this.MAX_UPWARD_ANGLE) this.fly_angle = this.MAX_UPWARD_ANGLE;
    }
    // this.rotate_and_draw_image(this.gifBird, this.width / 2 - 60, this.y - 30, 60, 60, this.fly_angle);
    this.rotate_and_draw_image(this.gifBird, this.width / 2 - 60, this.y - 30, 60, 60, 0);


  }

  legalize() {
    if (this.y < 0) {
      this.y = 0;
    }
  }

  jump() {
    this.velocity = this.jump_velocity;
    this.time = 1;
  }

  deadshow() {
    this.time += 1;
    let displacement = (1 / 2) * this.gravity * this.time ** 2;
    let maxdisplacement = 8;
    if (displacement > maxdisplacement) {
      displacement = maxdisplacement;
    }
    this.y += displacement;
    this.p5.image(this.gifBird, this.width / 2 - 60, this.y - 30, 60, 60);
  }
  resurectShow() {
    if (this.y > this.height / 2 + 21.5) {
      this.p5.fill(255);
      this.p5.noStroke();
      this.p5.triangle(this.width / 2 - 30, 0, this.width / 4 + 30, this.height + 20, 3 * this.width / 4 - 90, this.height + 20);
    }

    if (this.y < this.height / 2) {
      this.p5.textSize(42);
      this.p5.text("Angel", this.width / 2, this.height / 2 - 80);
      this.p5.textSize(32);
      this.p5.text("Press Space to Continue", this.width / 2, this.height / 2 + 80);
    }
    if (this.goup) {
      this.y -= 1.4;
    }
    else {
      this.y += 1.4;
    }

    if (this.y > this.p5.height / 2 + 20) {
      this.goup = true;
    } else if (this.y < this.p5.height / 2 - 20) {
      this.goup = false;
    }
    this.p5.image(this.gifBird, this.width / 2 - 60, this.y - 30, 60, 60);
  }
  shootLasers(time) {
    this.p5.stroke('black');
    this.p5.strokeWeight(8);
    console.log("Lasers");
    var target = (time / 1000) * this.height;
    this.p5.line(this.width / 2 - 60 + 0.656 * 60, this.y - 30 + 0.437 * 60, this.width, target);
    this.p5.stroke('red');
    this.p5.strokeWeight(6);
    this.p5.line(this.width / 2 - 60 + 0.656 * 60, this.y - 30 + 0.437 * 60, this.width, target);
    this.p5.noFill();
    this.p5.rect(0, 0, this.width, this.height);
  }
}