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
  select('#status').html('I can now see your eyes!');
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
  
  let matrix = [[1, 4, 6, 4, 1],
		        [4, 16, 24, 16, 4],
                [6, 24, 36, 24, 6],
                [4, 16, 24, 16, 4],
                [1, 4, 6, 4, 1]
               ]; 
  //this matrix value is changed from the original box blur values to the gaussian values
  
  loadPixels();
  let w = width;
  let h = height;
  
  //instead of box blur, this is now a 5x5 gaussian blur
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
    
		var a1 = ((x-2+w)%w + w*((y-2+h)%h))*4; // a1
        var a2 = ((x-1+w)%w + w*((y-2+h)%h))*4; // a2
        var a3 = ((x-0+w)%w + w*((y-2+h)%h))*4; // a3
        var a4 = ((x+1+w)%w + w*((y-2+h)%h))*4; // a4
        var a5 = ((x+2+w)%w + w*((y-2+h)%h))*4; // a5
        var b1 = ((x-2+w)%w + w*((y-1+h)%h))*4; // b1
        var b2 = ((x-1+w)%w + w*((y-1+h)%h))*4; // b2
        var b3 = ((x-0+w)%w + w*((y-1+h)%h))*4; // b3
        var b4 = ((x+1+w)%w + w*((y-1+h)%h))*4; // b4
        var b5 = ((x+2+w)%w + w*((y-1+h)%h))*4; // b5
        var c1 = ((x-2+w)%w + w*((y-0+h)%h))*4; // c1
        var c2 = ((x-1+w)%w + w*((y-0+h)%h))*4; // c2
        var c3 = ((x-0+w)%w + w*((y-0+h)%h))*4; // c3 CENTER
        var c4 = ((x+1+w)%w + w*((y-0+h)%h))*4; // c4
        var c5 = ((x+2+w)%w + w*((y-0+h)%h))*4; // c5
        var d1 = ((x-2+w)%w + w*((y+1+h)%h))*4; // d1
        var d2 = ((x-1+w)%w + w*((y+1+h)%h))*4; // d2
        var d3 = ((x-0+w)%w + w*((y+1+h)%h))*4; // d3
        var d4 = ((x+1+w)%w + w*((y+1+h)%h))*4; // d4
        var d5 = ((x+2+w)%w + w*((y+1+h)%h))*4; // d5
        var e1 = ((x-2+w)%w + w*((y+2+h)%h))*4; // e1
        var e2 = ((x-1+w)%w + w*((y+2+h)%h))*4; // e2
        var e3 = ((x-0+w)%w + w*((y+2+h)%h))*4; // e3
        var e4 = ((x+1+w)%w + w*((y+2+h)%h))*4; // e4
        var e5 = ((x+2+w)%w + w*((y+2+h)%h))*4; // e5
		
					
        r1 = pixels[a1]*matrix[0][0]; // a1
        r2 = pixels[a2]*matrix[0][1]; // a2
        r3 = pixels[a3]*matrix[0][2]; // a3
        r4 = pixels[a4]*matrix[0][3]; // a4
        r5 = pixels[a5]*matrix[0][4]; // a5
        r6 = pixels[b1]*matrix[1][0]; // b1
        r7 = pixels[b2]*matrix[1][1]; // b2
        r8 = pixels[b3]*matrix[1][2]; // b3
        r9 = pixels[b4]*matrix[1][3]; // b4
        r10 = pixels[b5]*matrix[1][4]; // b5
        r11 = pixels[c1]*matrix[2][0]; // c1
        r12 = pixels[c2]*matrix[2][1]; // c2
        r13 = pixels[c3]*matrix[2][2]; // c3
        r14 = pixels[c4]*matrix[2][3]; // c4
        r15 = pixels[c5]*matrix[2][4]; // c5
        r16 = pixels[d1]*matrix[3][0]; // d1
        r17 = pixels[d2]*matrix[3][1]; // d2
        r18 = pixels[d3]*matrix[3][2]; // d3
        r19 = pixels[d4]*matrix[3][3]; // d4
        r20 = pixels[d5]*matrix[3][4]; // d5
        r21 = pixels[e1]*matrix[4][0]; // e1
        r22 = pixels[e2]*matrix[4][1]; // e2
        r23 = pixels[e3]*matrix[4][2]; // e3
        r24 = pixels[e4]*matrix[4][3]; // e4
        r25 = pixels[e5]*matrix[4][4]; // e5
        var red = (r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+r11+r12+r13+r14+r15+r16+r17+r18+r19+r20+r21+r22+r23+r24+r25)/256;
        
        g1 = pixels[a1+1]*matrix[0][0]; // a1
        g2 = pixels[a2+1]*matrix[0][1]; // a2
        g3 = pixels[a3+1]*matrix[0][2]; // a3
        g4 = pixels[a4+1]*matrix[0][3]; // a4
        g5 = pixels[a5+1]*matrix[0][4]; // a5
        g6 = pixels[b1+1]*matrix[1][0]; // b1
        g7 = pixels[b2+1]*matrix[1][1]; // b2
        g8 = pixels[b3+1]*matrix[1][2]; // b3
        g9 = pixels[b4+1]*matrix[1][3]; // b4
        g10 = pixels[b5+1]*matrix[1][4]; // b5
        g11 = pixels[c1+1]*matrix[2][0]; // c1
        g12 = pixels[c2+1]*matrix[2][1]; // c2
        g13 = pixels[c3+1]*matrix[2][2]; // c3
        g14 = pixels[c4+1]*matrix[2][3]; // c4
        g15 = pixels[c5+1]*matrix[2][4]; // c5
        g16 = pixels[d1+1]*matrix[3][0]; // d1
        g17 = pixels[d2+1]*matrix[3][1]; // d2
        g18 = pixels[d3+1]*matrix[3][2]; // d3
        g19 = pixels[d4+1]*matrix[3][3]; // d4
        g20 = pixels[d5+1]*matrix[3][4]; // d5
        g21 = pixels[e1+1]*matrix[4][0]; // e1
        g22 = pixels[e2+1]*matrix[4][1]; // e2
        g23 = pixels[e3+1]*matrix[4][2]; // e3
        g24 = pixels[e4+1]*matrix[4][3]; // e4
        g25 = pixels[e5+1]*matrix[4][4]; // e5		
        var green = (g1+g2+g3+g4+g5+g6+g7+g8+g9+g10+g11+g12+g13+g14+g15+g16+g17+g18+g19+g20+g21+g22+g23+g24+g25)/256;
			
        b1 = pixels[a1+2]*matrix[0][0]; // a1
        b2 = pixels[a2+2]*matrix[0][1]; // a2
        b3 = pixels[a3+2]*matrix[0][2]; // a3
        b4 = pixels[a4+2]*matrix[0][3]; // a4
        b5 = pixels[a5+2]*matrix[0][4]; // a5
        b6 = pixels[b1+2]*matrix[1][0]; // b1
        b7 = pixels[b2+2]*matrix[1][1]; // b2
        b8 = pixels[b3+2]*matrix[1][2]; // b3
        b9 = pixels[b4+2]*matrix[1][3]; // b4
        b10 = pixels[b5+2]*matrix[1][4]; // b5
        b11 = pixels[c1+2]*matrix[2][0]; // c1
        b12 = pixels[c2+2]*matrix[2][1]; // c2
        b13 = pixels[c3+2]*matrix[2][2]; // c3
        b14 = pixels[c4+2]*matrix[2][3]; // c4
        b15 = pixels[c5+2]*matrix[2][4]; // c5
        b16 = pixels[d1+2]*matrix[3][0]; // d1
        b17 = pixels[d2+2]*matrix[3][1]; // d2
        b18 = pixels[d3+2]*matrix[3][2]; // d3
        b19 = pixels[d4+2]*matrix[3][3]; // d4
        b20 = pixels[d5+2]*matrix[3][4]; // d5
        b21 = pixels[e1+2]*matrix[4][0]; // e1
        b22 = pixels[e2+2]*matrix[4][1]; // e2
        b23 = pixels[e3+2]*matrix[4][2]; // e3
        b24 = pixels[e4+2]*matrix[4][3]; // e4
        b25 = pixels[e5+2]*matrix[4][4]; // e5
        var blue = (b1+b2+b3+b4+b5+b6+b7+b8+b9+b10+b11+b12+b13+b14+b15+b16+b17+b18+b19+b20+b21+b22+b23+b24+b25)/256;
					
        pixels[c3] = red;
        pixels[c3+1] = green;
        pixels[c3+2] = blue;
        pixels[c3+3] = pixels[e3+3];
			
	  	}	
  }
		updatePixels();
}
