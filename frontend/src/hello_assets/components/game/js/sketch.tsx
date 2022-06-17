
import Bird from "./bird";
import Tube from "./tube";
import Ground from "./ground";
import { getCanisterIds } from "../../canister/principals";
import { useEffect } from "react";


export default function Sketch(p) {



  const canister = getCanisterIds();
  var height_size = 0;
  var width_size = 0;
  let myFont;
  var gifBird;
  var fullpipeimg;
  var backg;
  var recallBird;
  var recallPipe;
  var recallBackground;
  var BirdDied = false;
  var time = 0;
  var maxscore = 0;

  p.preload = () => {
    if(p.state != null) {
      recallBird = p.state.displaylocalToken || "";
      recallPipe = p.state.displayLocalPipe || "";
      recallBackground = p.state.displayLocalBackground || "";
      p.state.getHighScore();
      if(p.state.maxScore) maxscore = p.state.maxScore;
      console.log(p.state.maxScore);
    }
    else {
      recallBird = "";
      recallPipe = "";
      recallBackground = "";
    }

    console.log("Preloading game ...");
    myFont = p.loadFont('../flappyfont.ttf');
    gifBird = p.loadImage("../img/bird1.gif");
    fullpipeimg = p.loadImage("../img/pipes/pipe0.png");
    backg = p.loadImage('../img/background/background0.png');
    // jump_sound = new p5.loadSound("assets/sounds/die.mp3");
    // jump_sound = new p5.AudioIn();
  }

  var tubes: Tube[] = [];
  var gameRunning = false;
  var deathAnimation = false;
  var resuciteAnimation = false;
  var tubespeed = 1;
  var score = 0;
  let cnv;

  var b;
  var g;
  var timeToStart = width_size / 4;

  const restartGame = () => {
    tubes = [];
    tubespeed = 1;
    let tube = new Tube(p, fullpipeimg, timeToStart, tubespeed, height_size)
    tubes.push(tube);
    score = 0;
    b = new Bird(p, gifBird, p.height, p.width, p.state.isAngel , p.state.isLaser);
    g = new Ground(backg, 1024, p, tubespeed, height_size, width_size);
    // b.gravity = 0.12;
  }

  p.setup = () => {
    height_size = p.windowHeight;
    if (height_size > 736) {
      height_size = 736;
    }
    width_size = p.windowWidth;
    if(width_size > 736) width_size = 530;
    if(width_size > 736)
    if (p.windowWidth < 1000) {
      width_size = p.windowWidth;
      height_size = p.windowHeight * 
      2 / 3;
    }
    // width_size = p.windowWidth;
    // height_size = p.windowHeight * 2 / 3;
    p.state.getHighScore();
    console.log(Math.floor(width_size), Math.floor(height_size));
    cnv = p.createCanvas(Math.floor(width_size), Math.floor(height_size));
    cnv.mouseClicked(keyEvent);
    p.resizeCanvas(width_size, height_size);
    p.state.resizeCanvas();
    restartGame();
    gameRunning = false;
    p.textAlign(p.CENTER, p.CENTER);
    menu();
  };

  const drawdeath = () => {
    for (var k = 0; k < tubes.length; k++) {
      try {
        tubes[k].tubespeed = 0;
        tubes[k].show();
      }
      catch (error) {
        console.log(error);
      }
    }
    if (b.y > p.height) {
      deathAnimation = false;
      b.y = p.height / 2;
      restartGame();
    }
    g.groundspeed = 0;
    g.show();
    b.deadshow();
    p.textSize(64);
    p.fill(255,255,255)
    p.text(score.toString(), width_size / 2, 60);
  }

  const drawresurection = () => {
    b.jump();
    g.groundspeed = 0;
    g.show();
    b.resurectShow();
    p.fill(255, 255, 255);
    p.textSize(64);
    p.text(score.toString(), width_size / 2, 60);
  }

  const gameOver = () => {
    if (score > maxscore) {
      maxscore = score;
      p.state.setHighScore(maxscore);
    }
    gameRunning = false;
    deathAnimation = true;
    BirdDied = true;
    tubespeed = 0;
    b.jump();
  }

  const resucite = () => {
    resuciteAnimation = true;
    tubes = [];
  }

  const drawGame = () => {
    p.fill(255);
    b.show();

    for (var k = 0; k < tubes.length; k++) {
      if (tubes[k].x < -tubes[k].largeur - 20) {
        tubes.shift();
        if (tubespeed < 1.8) {
          tubespeed += 0.1;
        }
      }
      if (tubes[k].x < p.width / 2 && !tubes[k].flag) {
        tubes[k].flag = true;
        score++;
      }
      if (tubes[k].x < p.width * 2 / 3 && !tubes[k].score) {
        tubes[k].score = true;
        g.updateSpeed(tubespeed);
        tubes.push(new Tube(p, fullpipeimg, timeToStart + 0, tubespeed, height_size));
        for (var j = 0; j < tubes.length; j++) {
          tubes[j].tubespeed = tubespeed;
        }
      }
      if (!tubes[k].lasered)
        if (tubes[k].x < p.width / 2 - 30 && tubes[k].x >= p.width / 2 - 30 - 80) {
          if (b.y - 20 < tubes[k].taille_haut) {
            if (!b.angel) {
              gameOver();
            } else {
              gameRunning = false;
              resucite();
            }
          }
          else if (b.y + 20 > tubes[k].taille_bas) {
            if (!b.angel) {
              gameOver();
            } else {
              gameRunning = false;
              resucite();
            }
          }
        }
      try {
        tubes[k].show();
      }
      catch (error) {
        console.log(error);
      }
    }
    if (b.y >= p.height - 60) {
      b.y = p.height - 60;
      if (!b.angel) {
        gameOver();
      } else {
        gameRunning = false;
        resucite();
      }
    }
    g.show();
    if (b.laser)
      if (time % 15000 < 1000) {
        b.shootLasers(time % 1000);
        if (time % 1000 > 950) {
          for (var i = 0; i < tubes.length; i++) {
            tubes[i].lasered = true;
          }
        }
      }
    p.fill(255, 255, 255);
    p.textSize(64);
    p.text(score.toString(), width_size / 2, 60);
  }


  const menu = () => {
    p.textSize(22);
    p.text('Press Space to Start', width_size / 2, height_size / 2 + 60);
    p.text('Max score : ' + maxscore.toString(), width_size / 2, height_size / 2 + 90);
    if(!p.state.displaySketch) {
      p.text('Please connect or own at least a bird', width_size / 2, height_size / 2 + 120)
    }
    p.textSize(80);
    p.fill(255, 255, 255);
    p.textFont(myFont);
    p.text('IC Birds', width_size / 2, height_size / 2 - 200);
    b.preshow();
    g.show();
  }

  const menuGameOver = () => {

    p.textSize(22);
    p.fill(255,255,255)
    p.text('Press Space to Start', width_size / 2, height_size / 2 + 60);
    p.text('Score : ' + score.toString(), width_size / 2, height_size / 2 + 90);
    p.text('Max score : ' + maxscore.toString(), width_size / 2, height_size / 2 + 120);
    p.textSize(80);
    p.fill(255, 255, 255);
    p.textFont(myFont);
    p.text('Game Over', width_size / 2, height_size / 2 - 200);
    g.groundspeed = 1;
    b.preshow();
    g.show();
  }

  const refreshSketchVar = async function (): Promise<void> {
    if(p.state.maxScore) maxscore = p.state.maxScore;
    if (recallBird != p.state.displaylocalToken) {
        let url = canister.get_img(p.state.displaylocalToken);
        recallBird = p.state.displaylocalToken;
        gifBird = p.loadImage(url);
        b = new Bird(p, gifBird, p.height, p.width, p.state.isAngel ,  p.state.isLaser);
    }

    if (recallPipe != p.state.displayLocalPipe) {
      recallPipe = p.state.displayLocalPipe;
      fullpipeimg = p.loadImage("img/pipes/" + recallPipe + ".png");
      for (var k = 0; k < tubes.length; k++) {
        tubes[k].refreshimg(fullpipeimg);
      }
    }
    if (recallBackground != p.state.displayLocalBackground) {
      recallBackground = p.state.displayLocalBackground;
      backg = p.loadImage("img/background/" + recallBackground + ".png");
    }
  }


  p.draw = () => {
    p.image(backg, 0, -60, 796, 796);
    time = p.millis();
    // g.show();
    p.textSize(32);
    if (gameRunning) {
      drawGame();
      p.fill(51, 51, 0);
      p.strokeWeight(0);
    }
    else if (deathAnimation) {
      drawdeath();
    }
    else if (resuciteAnimation) {
      drawresurection();
    }

    else if (!BirdDied) {
      refreshSketchVar();
      menu();
    }
    else {
      refreshSketchVar();
      menuGameOver();
    }
  }

  const keyEvent = () => {
    // if(!p.state.displaySketch) return;
    if (gameRunning) {
      b.jump();
    }
    if (deathAnimation) {
      console.log("dead");
    }
    if (resuciteAnimation) {
      console.log("restarting ...");
      resuciteAnimation = false;
      for (var k = 0; k < tubes.length; k++) {
        tubes[k].tubespeed = tubespeed;
      }
      gameRunning = true;
      b.angel = false;
      tubes.push(new Tube(p, fullpipeimg, timeToStart, tubespeed, height_size));
    }
    if (!gameRunning && !deathAnimation && !resuciteAnimation) {
      restartGame();
      gameRunning = true;
    }
  }

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      keyEvent();
    }
  }
};

