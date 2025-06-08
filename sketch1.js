let p, textureGif, strokeImg;
let jitterAmount = 5; 
let colors = [];
let currentColor;
let textJitter = 2;
let textScale = 1;
let rotationAngle = 0;
let isSpinning = false;

function preload() {
  p = loadFont('assets/fetamont.otf');
  textureGif = loadImage('assets/texture.gif');
  strokeImg = loadImage('assets/stroke.png');
}

function setup() {
  createCanvas(400, 400);
  textFont(p);
  textSize(50); 
  textAlign(CENTER, CENTER);
  
  
  colors = [
    color('#132be0'), 
    color('#e92928'), 
    color('#fbc304'), 
    color('#05a048')
  ];

  currentColor = colors[0];
  frameRate(6);
}

function draw() {
  background(254, 240, 231);
  
  let jitterX = random(-jitterAmount, jitterAmount);
  let jitterY = random(-jitterAmount, jitterAmount);
  image(strokeImg, width / 2 + jitterX - strokeImg.width / 4, height / 2 + jitterY - strokeImg.height / 4, strokeImg.width / 2, strokeImg.height / 2); 
  
  let textJitterX = random(-textJitter, textJitter);
  let textJitterY = random(-textJitter, textJitter);
  
  let scaleFactor = 1 + sin(frameCount * 0.1) * 0.05;

  if (isSpinning) {
    rotationAngle += 0.1; 
  }

  push();
  translate(width / 2 + textJitterX, height / 2 + textJitterY);
  rotate(rotationAngle);
  scale(scaleFactor);
  stroke(255);
  strokeWeight(4);
  fill(currentColor);
  text("playground", 0, 0);
  pop();
  
  blendMode(MULTIPLY);
  image(textureGif, 0, 0, width, height); // Kept full size
  blendMode(BLEND);
}

function mousePressed() {
  currentColor = random(colors);
  isSpinning = !isSpinning;
}
