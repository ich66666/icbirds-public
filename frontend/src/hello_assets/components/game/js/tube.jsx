export default class Tube {
  constructor(p5, fullpipeimg, start, tubespeed, height) {
    this.largeur = 60;
    this.height = height;
    this.fullpipeimg = fullpipeimg;
    this.random = Math.floor((1/3*(this.height))*Math.random());
    this.taille_haut = (1/8)*this.height + this.random;
    this.taille_bas = this.taille_haut + 160;
    this.position = -0.42*this.fullpipeimg.height + (1/8) * this.height + this.random;
    this.flag = false;
    this.score = false;
    this.x = p5.width + this.largeur + start;
    
    this.p5instance = p5;
    this.tubespeed = tubespeed;
    this.lasered = false;
  }
  
  show() {
    if(!this.lasered) this.p5instance.image(this.fullpipeimg, this.x, this.position, 80, 1000);
    this.x -= 2 * this.tubespeed;
    // this.p5instance.rect(this.x,0,20, this.taille_haut);
    // this.p5instance.rect(this.x ,this.taille_haut + 0.16*this.fullpipeimg.height,20, this.taille_bas);
  }

  refreshimg(img){
    this.fullpipeimg = img
  }
}