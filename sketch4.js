let words = ['dream']; 
let angle = 0;
let nextWord = 50;
let stars = []; 

let font1, font2;

function preload() {
  font1 = loadFont('assets/waterfall.otf');
  font2 = loadFont('assets/waterfall.otf');
}

function setup() {
  createCanvas(400, 400); 
  colorMode(HSB);
  textFont(font2);
  
  // Generates random stars
  for (let i = 0; i < 100; i++) { 
    stars.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0, 0.1);
  
  drawStars();
  drawWord(words[0]); 
}

function drawWord(words) {
  this.t = words;
  textSize(50); 
  this.startX = (width - textWidth(this.t)) / 2;
  this.currentX = this.startX;
  this.a = angle;

  for (let i = 0; i < this.t.length; i++) {
    let chr = this.t.charAt(i);
    let y = height / 2 + (sin(this.a) * 50) + 50; 
    fill(0, 0, 100, 0.8);
    stroke(0, 0, 100, 0.8);
    strokeWeight(2); 
    text(chr, this.currentX, y);
    this.currentX += textWidth(chr);
    this.a += mouseX / 1000;
  }

  angle += 0.03;
}

function drawStars() {
  noStroke();
  fill(255); 
  
  //draws each star
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    ellipse(star.x, star.y, random(1, 2)); // Reduced star size
    
    //adds slight movement to stars for twinkling effect
    star.x += random(-0.1, 0.1); // 
    star.y += random(-0.1, 0.1);
    
    //wraps stars around the canvas edges
    if (star.x > width) star.x = 0;
    if (star.y > height) star.y = 0;
    if (star.x < 0) star.x = width;
    if (star.y < 0) star.y = height;
  }
}