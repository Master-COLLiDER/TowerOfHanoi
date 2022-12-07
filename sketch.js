let game;
let bg;
let reloadBtn;
let fullscreenBtn;
let winSound;
let reloadSound;
let winsoundPlayed = false;
function preload() {
  winSound = loadSound("win.mp3");
  reloadSound = loadSound("reload.mp3");
  bg = loadImage("background.jpg");
}
function setup() {
  var cnv = createCanvas(800, 400);
  cnv.style('display', 'block');
  game = new TowerOfHanoi();
  reloadSound.play();

  reloadBtn = createImg("reload.png", "Reload");
  reloadBtn.position(80, 20);
  reloadBtn.size(30, 30);
  reloadBtn.mousePressed(function () {
    if (winSound.isPlaying()) {
      winSound.stop();
    }
    if (reloadSound.isPlaying()) reloadSound.stop();
    reloadSound.play();
    winsoundPlayed = false;
    game = new TowerOfHanoi();
  });
  
  fullscreenBtn = createImg("fullscreen.png", "Full Screen");
  fullscreenBtn.position(120, 20);
  fullscreenBtn.size(30, 30);
  fullscreenBtn.mousePressed(function () {
    fullscreen(!fullscreen());  
  });
}

function draw() {
  background(bg);
  
  // let sf = windowWidth/800;
  // scale(sf);
  
  if (!game.getWin()) {
    game.update();
    game.show();
    game.over();
  } else {
    if (!winsoundPlayed) {
      winSound.play();
      winsoundPlayed = true;
    }
    push();
    strokeWeight(5);
    textSize(42);
    fill(255);
    stroke(0);
    text("You Won", 320, 200, 600, 400);
    pop();
  }
}

function mousePressed() {
  game.pressed();
}

function mouseReleased() {
  game.released();
}

// function windowResized() {
//  
  // resizeCanvas(windowWidth, windowHeight);
// }