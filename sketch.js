let index;

function setup(){
    createCanvas(640, 480);
    pixelDensity(1); //simplify math
    
    // Find the pixel at 20, 40.
    let x = 75;
    let y = 60;
  
    index = (x + y * width)*4;
  
    let red = pixels[index];
    let green = pixels[index + 1];
    let blue = pixels[index + 2];
    let alpha = pixels[index + 3];
}

function filter(){
    loadPixels();
//for(var y = 0; y < height; y++) {
//    for(var x = 0; x < width; x++){
//        // Do something to a pixel at (x,y)
//    }
//}
    updatePixels();
}