export default class Ground {
    constructor(initground, w, p5, groundspeed, height, width) {
      this.x = 0;
      this.image = initground;
      this.width_size = w;
      this.p5instance = p5;
      this.groundspeed = groundspeed;
      this.height = height;
      this.width = width;
    }
    
    show() {
        this.legalise();
        this.p5instance.image(this.image, this.x, this.height - 60, 1024,this.image.height);
        this.x -= 2 * this.groundspeed;
    }

    legalise(){
        if(this.x < this.width - 1024)
        {
            this.x = 0;
        }
    }
    updateSpeed(s) {
        this.groundspeed = s;
    }
  }