let p;
let size = 800;  
let fineness = 50;
let dragging = false;
let offsetX = 0;
let offsetY = 0;
let textX, textY;
let clouds = [];

function preload() {
  p = loadFont('assets/wave.otf'); 
}

function setup() {
  noCursor();
  createCanvas(400, 400); 
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textFont(p);
  noStroke();
  textX = width / 2;
  textY = height / 2;

  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud(random(width), random(height), random(1, 2)));
  }
}

function draw() {
  background(255); 

  //create arcs that draw around the center
  for (let i = 0; i < size; i += fineness) {
    push();
    translate(textX, textY); //translate to the draggable position
    drawArc(size - i, i / 5);
    pop();
  }

  //pdate and display clouds
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].update();
    clouds[i].show();
  }
}

//create the arcs around the center of the canvas
function drawArc(radius, i) {
  drawingContext.save();
  fill('#63daf4');
  ellipse(0, 0, radius);
  drawingContext.clip();
  fill('#fffff'); 
  textSize(60); 
  textLeading(80); 
  text('freedom', 50 * cos(frameCount + i), 50 * sin(frameCount + i)); 
  drawingContext.restore();
}

//class that represents each cloud's position, speed, and movement
class Cloud {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = random(50, 100); // Adjusted size range for smaller canvas
  }

  update() {
    this.x += this.speed; //moves the cloud horizontally
    if (this.x > width + this.size) { 
      this.x = -this.size;
    }
  }

  show() {
    fill(255, 255, 255, 150); //cloud color
    noStroke();
    ellipse(this.x, this.y, this.size); //draw cloud
  }
}

function mousePressed() {
  let distance = dist(mouseX, mouseY, textX, textY);
  if (distance < 50) { 
    dragging = true;
    offsetX = mouseX - textX;
    offsetY = mouseY - textY;
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    textX = mouseX - offsetX;
    textY = mouseY - offsetY;
  }
}
