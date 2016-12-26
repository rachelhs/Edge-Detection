var capture;
var outline;

function setup() {
  createCanvas(360, 360);
  capture = createCapture(VIDEO);
  capture.size(640, 360);
}

function draw() {

  outline = createImage(width, height, RGB);

  push();
  translate(capture.width, 0);
  scale(-1, 1);
  image(capture, 0, 0);
  filter('THRESHOLD');
  pop();

  findEdge();
}

function findEdge() {

  loadPixels();
  outline.loadPixels();

  for (var y = 1; y < height - 1; y++) {
    for (var x = 1; x < width - 1; x++) {
      var loc = (x + y * width)*4;
      var left = loc-4;
      var lo = pixels[loc];
      var l = pixels[left];
      if (abs(lo - l) > 100) {
        outline.pixels[loc] = 0;
        outline.pixels[loc+1] = 0;
        outline.pixels[loc+2] = 0;
        outline.pixels[loc+3] = 255;
        
       
      } else {
        outline.pixels[loc] = 255;
        outline.pixels[loc+1] = 255;
        outline.pixels[loc+2] = 255;
        outline.pixels[loc+3] = 255;
      }
    }
  }
  outline.updatePixels();
  image(outline, 0, 0);
}
