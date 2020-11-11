let index;
let video;

let poseNet;
let pose;

let temp;
let bright;

let leftEye;
let x;
let y;

// create video feed
function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', (results) => {
        pose = results[0].pose;
    });
    video.hide();
    pixelDensity(1); //simplify math
}

function modelLoaded() {
  select('#status').html('I can now your eyes!');
}

//very frame, clear old picture and update with new temperature
function draw(){
    clear();
    image(video, 0, 0);
    if (pose) {
     leftEye = pose.leftEye;
     ellipse(leftEye,pose.rightEye,20);
    
     x = map(leftEye.x,0,width,-25,25);
     temp = x
     temperature(temp);
    
     y = map(leftEye.y,0,height,50,-50);
     bright = y
     brighten(bright);   
    }
    
    if(keyIsDown(71)){
        gaussianBlur(); 
    }
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

//make video darker or brighter based on y position
function brighten(num){
  loadPixels();
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3];
          
          pixels[index+0] = r+num;
          pixels[index+1] = g+num; 
          pixels[index+2] = b+num;
          pixels[index+3] = 255;  
          
        }
      }
  updatePixels();
}

//this function was based off Crystal Chen and Paolla Bruno Druto example code on https://idmnyu.github.io/p5.js-image/Blur/index.html
function gaussianBlur(){
  
  let matrix = [[1, 2, 1],
		        [2, 4, 2],
		        [1, 2, 1]]; 
  //this matrix value is changed from the original box blur values to the gaussian values
  
  loadPixels();
  let w = width;
  let h = height;
  
  //instead of blurring the whole image, you only blur on mouse drag
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
    
		var ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // Upper left
		var uc = ((x-0+w)%w + w*((y-1+h)%h))*4; // Upper Center
		var ur = ((x+1+w)%w + w*((y-1+h)%h))*4; // Upper right
		var ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // left
		var mc = ((x-0+w)%w + w*((y+0+h)%h))*4; // center
		var mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // right
		var ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // Lower left
		var lc = ((x-0+w)%w + w*((y+1+h)%h))*4; // lower center
		var lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // lower right
					
				p0 = pixels[ul]*matrix[0][0]; // upper left
				p1 = pixels[uc]*matrix[0][1]; // upper mid
				p2 = pixels[ur]*matrix[0][2]; // upper right
				p3 = pixels[ml]*matrix[1][0]; // left
				p4 = pixels[mc]*matrix[1][1]; // center pixel
				p5 = pixels[mr]*matrix[1][2]; // right
				p6 = pixels[ll]*matrix[2][0]; // lower left
				p7 = pixels[lc]*matrix[2][1]; // lower mid
				p8 = pixels[lr]*matrix[2][2]; // lower right
				var red = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
					
				p0 = pixels[ul+1]*matrix[0][0]; // upper left
				p1 = pixels[uc+1]*matrix[0][1]; // upper mid
				p2 = pixels[ur+1]*matrix[0][2]; // upper right
				p3 = pixels[ml+1]*matrix[1][0]; // left
				p4 = pixels[mc+1]*matrix[1][1]; // center pixel
				p5 = pixels[mr+1]*matrix[1][2]; // right
				p6 = pixels[ll+1]*matrix[2][0]; // lower left
				p7 = pixels[lc+1]*matrix[2][1]; // lower mid
				p8 = pixels[lr+1]*matrix[2][2]; // lower right
				var green = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
					
				p0 = pixels[ul+2]*matrix[0][0]; // upper left
				p1 = pixels[uc+2]*matrix[0][1]; // upper mid
				p2 = pixels[ur+2]*matrix[0][2]; // upper right
				p3 = pixels[ml+2]*matrix[1][0]; // left
				p4 = pixels[mc+2]*matrix[1][1]; // center pixel
				p5 = pixels[mr+2]*matrix[1][2]; // right
				p6 = pixels[ll+2]*matrix[2][0]; // lower left
				p7 = pixels[lc+2]*matrix[2][1]; // lower mid
				p8 = pixels[lr+2]*matrix[2][2]; // lower right
				var blue = (p0+p1+p2+p3+p4+p5+p6+p7+p8)/16;
					
				pixels[mc] = red;
				pixels[mc+1] = green;
				pixels[mc+2] = blue;
				pixels[mc+3] = pixels[lc+3];
			
	  	}	
  }
		updatePixels();
}
