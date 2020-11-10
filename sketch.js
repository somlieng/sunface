let index;
let video;

let x; //x of left eye

let temp;

// create video feed
function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    pixelDensity(1); //simplify math
}

//very frame, clear old picture and update with new temperature
function draw(){
    clear();
    image(video, 0, 0);
    let x = map(mouseX,0,width,-25,25);
    temp = x
    temperature(temp);
}

//make video cooler or warmer based on x position
function temperature(temp){
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3];
          
          pixels[index+0] = r+temp;
          pixels[index+1] = g; 
          pixels[index+2] = b-temp;
          pixels[index+3] = 255;  
          
        }
      }
    updatePixels();
}