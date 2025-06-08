let p;
let ripples = [];
let waterImg;
let bgOpacity = 0;
let rippleSpawnTimer = 0;
let time = 0;

function preload() {
  p = loadFont('assets/petrichor.ttf');
  waterImg = loadImage('assets/water.png');
}

function setup() {
  createCanvas(400, 400); 
}

function draw() {
  background(150);

  //applies fade-in effect to the background image
  tint(255, bgOpacity);
  image(waterImg, 0, 0, width, height);

  drawWavyText("Petrichor", width / 1.85, height / 2);

  //draw ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    noFill();
    stroke(255, r.alpha);
    strokeWeight(2);
    ellipse(r.x, r.y, r.size);

    r.size += 3;
    r.alpha -= 2;

    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }

  //gradually increase background opacity
  if (bgOpacity < 255) {
    bgOpacity += 1;
  }

  //create random ripples over time
  if (frameCount % 30 === 0) {
    createRandomRipple();
  }

  time += 0.05; //increment time for wave effect
}

//creates ripples on mouse click
function mousePressed() {
  bgOpacity += 20;
  bgOpacity = constrain(bgOpacity, 0, 255);

  for (let i = 0; i < 3; i++) {
    createRipple(width / 2 + random(-50, 50), height / 2 + random(-50, 50));
  }
}

//creates ripples at random locations
function createRandomRipple() {
  let x = random(width);
  let y = random(height);
  createRipple(x, y);
}

//creates a ripple
function createRipple(x, y) {
  ripples.push({
    x: x,
    y: y,
    size: 20,
    alpha: 200
  });
}

// Creates wavy text effect
function drawWavyText(txt, x, y) {
  textSize(40); 
  textFont(p);
  textAlign(CENTER, CENTER);

  let txtWidth = textWidth(txt); 
  
  
  let adjustedX = x - txtWidth / 2;

  for (let i = 0; i < txt.length; i++) {
    let charX = adjustedX + textWidth(txt.substring(0, i));
    let charY = y + sin(time + i * 0.5) * 5; 

    fill(255, 50);
    text(txt.charAt(i), charX + random(-1, 1), charY + random(-1, 1)); //subtle flicker
    fill(255);
    text(txt.charAt(i), charX, charY);
  }
}
