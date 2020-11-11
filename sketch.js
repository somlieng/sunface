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
    background(100);
    
    video = createCapture(VIDEO);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', (results) => {
        pose = results[0].pose;
    });
    video.hide();
    pixelDensity(1); //simplify math
}

function modelLoaded() {
  select('#status').html('I can see thy eyes anon');
}

//every frame, clear old picture and update with new temperature using PoseNet eye tracking data
function draw(){
    clear();
    image(video, 0, 0);
    
    if (pose) {
     leftEye = pose.leftEye;
    
     x = map(leftEye.x,0,width,-25,25);
     temp = x
     temperature(temp);
    
     y = map(leftEye.y,0,height,50,-50);
     bright = y
     brighten(bright);   
    }
    
    if(keyIsDown(71)){
        softLight();
    }
    
    if(keyIsDown(70)){
        foggy();
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
function softLight(){
  
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
        var e3 = ((x-0+w)%w + w*((y+2+h)%h))*4; // e3 CENTER BOTTOm
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

function foggy(){
  
  let matrix = [[1, 8, 10, 12, 14, 12, 10, 8, 1],
		        [8, 64, 80, 96, 112, 96, 80, 64, 8],
                [10, 80, 100, 120, 140, 120, 100, 80, 10],
                [12, 96, 120, 144, 168, 144, 120, 96, 12],
                [14, 112, 140, 168, 196, 168, 140, 112, 14],
                [12, 96, 120, 144, 168, 144, 120, 96, 12],
                [10, 80, 100, 120, 140, 120, 100, 80, 10],
                [8, 64, 80, 96, 112, 96, 80, 64, 8],
                [1, 8, 10, 12, 14, 12, 10, 8, 1]
               ]; 
  //9x9 gaussian blur
  
  loadPixels();
  let w = width;
  let h = height;
  
  //9x9 gaussian blur
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
    
		var a1 = ((x-4+w)%w + w*((y-4+h)%h))*4; // a1
        var a2 = ((x-3+w)%w + w*((y-4+h)%h))*4; // a2
        var a3 = ((x-2+w)%w + w*((y-4+h)%h))*4; // a3
        var a4 = ((x-1+w)%w + w*((y-4+h)%h))*4; // a4
        var a5 = ((x+0+w)%w + w*((y-4+h)%h))*4; // a5
        var a6 = ((x+1+w)%w + w*((y-4+h)%h))*4; // a6
        var a7 = ((x+2+w)%w + w*((y-4+h)%h))*4; // a7
        var a8 = ((x+3+w)%w + w*((y-4+h)%h))*4; // a8
        var a9 = ((x+4+w)%w + w*((y-4+h)%h))*4; // a9
        var b1 = ((x-4+w)%w + w*((y-3+h)%h))*4; // b1
        var b2 = ((x-3+w)%w + w*((y-3+h)%h))*4; // b2
        var b3 = ((x-2+w)%w + w*((y-3+h)%h))*4; // b3
        var b4 = ((x-1+w)%w + w*((y-3+h)%h))*4; // b4
        var b5 = ((x+0+w)%w + w*((y-3+h)%h))*4; // b5
        var b6 = ((x+1+w)%w + w*((y-3+h)%h))*4; // b6
        var b7 = ((x+2+w)%w + w*((y-3+h)%h))*4; // b7
        var b8 = ((x+3+w)%w + w*((y-3+h)%h))*4; // b8
        var b9 = ((x+4+w)%w + w*((y-3+h)%h))*4; // b9
        var c1 = ((x-4+w)%w + w*((y-2+h)%h))*4; // c1
        var c2 = ((x-3+w)%w + w*((y-2+h)%h))*4; // c2
        var c3 = ((x-2+w)%w + w*((y-2+h)%h))*4; // c3
        var c4 = ((x-1+w)%w + w*((y-2+h)%h))*4; // c4
        var c5 = ((x+0+w)%w + w*((y-2+h)%h))*4; // c5
        var c6 = ((x+1+w)%w + w*((y-2+h)%h))*4; // c6
        var c7 = ((x+2+w)%w + w*((y-2+h)%h))*4; // c7
        var c8 = ((x+3+w)%w + w*((y-2+h)%h))*4; // c8
        var c9 = ((x+4+w)%w + w*((y-2+h)%h))*4; // c9
        var d1 = ((x-4+w)%w + w*((y-1+h)%h))*4; // d1
        var d2 = ((x-3+w)%w + w*((y-1+h)%h))*4; // d2
        var d3 = ((x-2+w)%w + w*((y-1+h)%h))*4; // d3
        var d4 = ((x-1+w)%w + w*((y-1+h)%h))*4; // d4
        var d5 = ((x+0+w)%w + w*((y-1+h)%h))*4; // d5
        var d6 = ((x+1+w)%w + w*((y-1+h)%h))*4; // d6
        var d7 = ((x+2+w)%w + w*((y-1+h)%h))*4; // d7
        var d8 = ((x+3+w)%w + w*((y-1+h)%h))*4; // d8
        var d9 = ((x+4+w)%w + w*((y-1+h)%h))*4; // d9
        var e1 = ((x-4+w)%w + w*((y-0+h)%h))*4; // e1
        var e2 = ((x-3+w)%w + w*((y-0+h)%h))*4; // e2
        var e3 = ((x-2+w)%w + w*((y-0+h)%h))*4; // e3
        var e4 = ((x-1+w)%w + w*((y-0+h)%h))*4; // e4
        var e5 = ((x+0+w)%w + w*((y-0+h)%h))*4; // e5 CENTER
        var e6 = ((x+1+w)%w + w*((y-0+h)%h))*4; // e6
        var e7 = ((x+2+w)%w + w*((y-0+h)%h))*4; // e7
        var e8 = ((x+3+w)%w + w*((y-0+h)%h))*4; // e8
        var e9 = ((x+4+w)%w + w*((y-0+h)%h))*4; // e9
        var f1 = ((x-4+w)%w + w*((y+1+h)%h))*4; // f1
        var f2 = ((x-3+w)%w + w*((y+1+h)%h))*4; // f2
        var f3 = ((x-2+w)%w + w*((y+1+h)%h))*4; // f3
        var f4 = ((x-1+w)%w + w*((y+1+h)%h))*4; // f4
        var f5 = ((x+0+w)%w + w*((y+1+h)%h))*4; // f5
        var f6 = ((x+1+w)%w + w*((y+1+h)%h))*4; // f6
        var f7 = ((x+2+w)%w + w*((y+1+h)%h))*4; // f7
        var f8 = ((x+3+w)%w + w*((y+1+h)%h))*4; // f8
        var f9 = ((x+4+w)%w + w*((y+1+h)%h))*4; // f9
        var g1 = ((x-4+w)%w + w*((y+2+h)%h))*4; // g1
        var g2 = ((x-3+w)%w + w*((y+2+h)%h))*4; // g2
        var g3 = ((x-2+w)%w + w*((y+2+h)%h))*4; // g3
        var g4 = ((x-1+w)%w + w*((y+2+h)%h))*4; // g4
        var g5 = ((x+0+w)%w + w*((y+2+h)%h))*4; // g5
        var g6 = ((x+1+w)%w + w*((y+2+h)%h))*4; // g6
        var g7 = ((x+2+w)%w + w*((y+2+h)%h))*4; // g7
        var g8 = ((x+3+w)%w + w*((y+2+h)%h))*4; // g8
        var g9 = ((x+4+w)%w + w*((y+2+h)%h))*4; // g9
        var h1 = ((x-4+w)%w + w*((y+3+h)%h))*4; // h1
        var h2 = ((x-3+w)%w + w*((y+3+h)%h))*4; // h2
        var h3 = ((x-2+w)%w + w*((y+3+h)%h))*4; // h3
        var h4 = ((x-1+w)%w + w*((y+3+h)%h))*4; // h4
        var h5 = ((x+0+w)%w + w*((y+3+h)%h))*4; // h5
        var h6 = ((x+1+w)%w + w*((y+3+h)%h))*4; // h6
        var h7 = ((x+2+w)%w + w*((y+3+h)%h))*4; // h7
        var h8 = ((x+3+w)%w + w*((y+3+h)%h))*4; // h8
        var h9 = ((x+4+w)%w + w*((y+3+h)%h))*4; // h9
        var i1 = ((x-4+w)%w + w*((y+4+h)%h))*4; // i1
        var i2 = ((x-3+w)%w + w*((y+4+h)%h))*4; // i2
        var i3 = ((x-2+w)%w + w*((y+4+h)%h))*4; // i3
        var i4 = ((x-1+w)%w + w*((y+4+h)%h))*4; // i4
        var i5 = ((x+0+w)%w + w*((y+4+h)%h))*4; // i5 CENTER BOTTOM
        var i6 = ((x+1+w)%w + w*((y+4+h)%h))*4; // i6
        var i7 = ((x+2+w)%w + w*((y+4+h)%h))*4; // i7
        var i8 = ((x+3+w)%w + w*((y+4+h)%h))*4; // i8
        var i9 = ((x+4+w)%w + w*((y+4+h)%h))*4; // i9
		
					
        r1 = pixels[a1]*matrix[0][0]; // a1
        r2 = pixels[a2]*matrix[0][1]; // a2
        r3 = pixels[a3]*matrix[0][2]; // a3
        r4 = pixels[a4]*matrix[0][3]; // a4
        r5 = pixels[a5]*matrix[0][4]; // a5
        r6 = pixels[a6]*matrix[0][5]; // a6
        r7 = pixels[a7]*matrix[0][6]; // a7
        r8 = pixels[a8]*matrix[0][7]; // a8
        r9 = pixels[a9]*matrix[0][8]; // a9
        r10 = pixels[b1]*matrix[1][0]; // b1
        r11 = pixels[b2]*matrix[1][1]; // b2
        r12 = pixels[b3]*matrix[1][2]; // b3
        r13 = pixels[b4]*matrix[1][3]; // b4
        r14 = pixels[b5]*matrix[1][4]; // b5
        r15 = pixels[b6]*matrix[1][5]; // b6
        r16 = pixels[b7]*matrix[1][6]; // b7
        r17 = pixels[b8]*matrix[1][7]; // b8
        r18 = pixels[b9]*matrix[1][8]; // b9
        r19 = pixels[c1]*matrix[2][0]; // c1
        r20 = pixels[c2]*matrix[2][1]; // c2
        r21 = pixels[c3]*matrix[2][2]; // c3
        r22 = pixels[c4]*matrix[2][3]; // c4
        r23 = pixels[c5]*matrix[2][4]; // c5
        r24 = pixels[c6]*matrix[2][5]; // c6
        r25 = pixels[c7]*matrix[2][6]; // c7
        r26 = pixels[c8]*matrix[2][7]; // c8
        r27 = pixels[c9]*matrix[2][8]; // c9
        r28 = pixels[d1]*matrix[3][0]; // d1
        r29 = pixels[d2]*matrix[3][1]; // d2
        r30 = pixels[d3]*matrix[3][2]; // d3
        r31 = pixels[d4]*matrix[3][3]; // d4
        r32 = pixels[d5]*matrix[3][4]; // d5
        r33 = pixels[d6]*matrix[3][5]; // d6
        r34 = pixels[d7]*matrix[3][6]; // d7
        r35 = pixels[d8]*matrix[3][7]; // d8
        r36 = pixels[d9]*matrix[3][8]; // d9
        r37 = pixels[e1]*matrix[4][0]; // e1
        r38 = pixels[e2]*matrix[4][1]; // e2
        r39 = pixels[e3]*matrix[4][2]; // e3
        r40 = pixels[e4]*matrix[4][3]; // e4
        r41 = pixels[e5]*matrix[4][4]; // e5
        r42 = pixels[e6]*matrix[4][5]; // e6
        r43 = pixels[e7]*matrix[4][6]; // e7
        r44 = pixels[e8]*matrix[4][7]; // e8
        r45 = pixels[e9]*matrix[4][8]; // e9
        r46 = pixels[f1]*matrix[5][0]; // f1
        r47 = pixels[f2]*matrix[5][1]; // f2
        r48 = pixels[f3]*matrix[5][2]; // f3
        r49 = pixels[f4]*matrix[5][3]; // f4
        r50 = pixels[f5]*matrix[5][4]; // f5
        r51 = pixels[f6]*matrix[5][5]; // f6
        r52 = pixels[f7]*matrix[5][6]; // f7
        r53 = pixels[f8]*matrix[5][7]; // f8
        r54 = pixels[f9]*matrix[5][8]; // f9
        r55 = pixels[g1]*matrix[6][0]; // g1
        r56 = pixels[g2]*matrix[6][1]; // g2
        r57 = pixels[g3]*matrix[6][2]; // g3
        r58 = pixels[g4]*matrix[6][3]; // g4
        r59 = pixels[g5]*matrix[6][4]; // g5
        r60 = pixels[g6]*matrix[6][5]; // g6
        r61 = pixels[g7]*matrix[6][6]; // g7
        r62 = pixels[g8]*matrix[6][7]; // g8
        r63 = pixels[g9]*matrix[6][8]; // g9
        r64 = pixels[h1]*matrix[7][0]; // h1
        r65 = pixels[h2]*matrix[7][1]; // h2
        r66 = pixels[h3]*matrix[7][2]; // h3
        r67 = pixels[h4]*matrix[7][3]; // h4
        r68 = pixels[h5]*matrix[7][4]; // h5
        r69 = pixels[h6]*matrix[7][5]; // h6
        r70 = pixels[h7]*matrix[7][6]; // h7
        r71 = pixels[h8]*matrix[7][7]; // h8
        r72 = pixels[h9]*matrix[7][8]; // h9
        r73 = pixels[i1]*matrix[8][0]; // i1
        r74 = pixels[i2]*matrix[8][1]; // i2
        r75 = pixels[i3]*matrix[8][2]; // i3
        r76 = pixels[i4]*matrix[8][3]; // i4
        r77 = pixels[i5]*matrix[8][4]; // i5
        r78 = pixels[i6]*matrix[8][5]; // i6
        r79 = pixels[i7]*matrix[8][6]; // i7
        r80 = pixels[i8]*matrix[8][7]; // i8
        r81 = pixels[i9]*matrix[8][8]; // i9
        var red = (r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+
                   r11+r12+r13+r14+r15+r16+r17+r18+r19+r20+
                   r21+r22+r23+r24+r25+r26+r27+r28+r29+r30+
                   r31+r32+r33+r34+r35+r36+r37+r38+r39+r40+
                   r41+r42+r43+r44+r45+r46+r47+r48+r49+r50+
                   r51+r52+r53+r54+r55+r56+r57+r58+r59+r60+
                   r61+r62+r63+r64+r65+r66+r67+r68+r69+r70+
                   r71+r72+r73+r74+r75+r76+r77+r78+r79+r80+
                   r81)/5776;
        
        r1 = pixels[a1+1]*matrix[0][0]; // a1
        r2 = pixels[a2+1]*matrix[0][1]; // a2
        r3 = pixels[a3+1]*matrix[0][2]; // a3
        r4 = pixels[a4+1]*matrix[0][3]; // a4
        r5 = pixels[a5+1]*matrix[0][4]; // a5
        r6 = pixels[a6+1]*matrix[0][5]; // a6
        r7 = pixels[a7+1]*matrix[0][6]; // a7
        r8 = pixels[a8+1]*matrix[0][7]; // a8
        r9 = pixels[a9+1]*matrix[0][8]; // a9
        r10 = pixels[b1+1]*matrix[1][0]; // b1
        r11 = pixels[b2+1]*matrix[1][1]; // b2
        r12 = pixels[b3+1]*matrix[1][2]; // b3
        r13 = pixels[b4+1]*matrix[1][3]; // b4
        r14 = pixels[b5+1]*matrix[1][4]; // b5
        r15 = pixels[b6+1]*matrix[1][5]; // b6
        r16 = pixels[b7+1]*matrix[1][6]; // b7
        r17 = pixels[b8+1]*matrix[1][7]; // b8
        r18 = pixels[b9+1]*matrix[1][8]; // b9
        r19 = pixels[c1+1]*matrix[2][0]; // c1
        r20 = pixels[c2+1]*matrix[2][1]; // c2
        r21 = pixels[c3+1]*matrix[2][2]; // c3
        r22 = pixels[c4+1]*matrix[2][3]; // c4
        r23 = pixels[c5+1]*matrix[2][4]; // c5
        r24 = pixels[c6+1]*matrix[2][5]; // c6
        r25 = pixels[c7+1]*matrix[2][6]; // c7
        r26 = pixels[c8+1]*matrix[2][7]; // c8
        r27 = pixels[c9+1]*matrix[2][8]; // c9
        r28 = pixels[d1+1]*matrix[3][0]; // d1
        r29 = pixels[d2+1]*matrix[3][1]; // d2
        r30 = pixels[d3+1]*matrix[3][2]; // d3
        r31 = pixels[d4+1]*matrix[3][3]; // d4
        r32 = pixels[d5+1]*matrix[3][4]; // d5
        r33 = pixels[d6+1]*matrix[3][5]; // d6
        r34 = pixels[d7+1]*matrix[3][6]; // d7
        r35 = pixels[d8+1]*matrix[3][7]; // d8
        r36 = pixels[d9+1]*matrix[3][8]; // d9
        r37 = pixels[e1+1]*matrix[4][0]; // e1
        r38 = pixels[e2+1]*matrix[4][1]; // e2
        r39 = pixels[e3+1]*matrix[4][2]; // e3
        r40 = pixels[e4+1]*matrix[4][3]; // e4
        r41 = pixels[e5+1]*matrix[4][4]; // e5
        r42 = pixels[e6+1]*matrix[4][5]; // e6
        r43 = pixels[e7+1]*matrix[4][6]; // e7
        r44 = pixels[e8+1]*matrix[4][7]; // e8
        r45 = pixels[e9+1]*matrix[4][8]; // e9
        r46 = pixels[f1+1]*matrix[5][0]; // f1
        r47 = pixels[f2+1]*matrix[5][1]; // f2
        r48 = pixels[f3+1]*matrix[5][2]; // f3
        r49 = pixels[f4+1]*matrix[5][3]; // f4
        r50 = pixels[f5+1]*matrix[5][4]; // f5
        r51 = pixels[f6+1]*matrix[5][5]; // f6
        r52 = pixels[f7+1]*matrix[5][6]; // f7
        r53 = pixels[f8+1]*matrix[5][7]; // f8
        r54 = pixels[f9+1]*matrix[5][8]; // f9
        r55 = pixels[g1+1]*matrix[6][0]; // g1
        r56 = pixels[g2+1]*matrix[6][1]; // g2
        r57 = pixels[g3+1]*matrix[6][2]; // g3
        r58 = pixels[g4+1]*matrix[6][3]; // g4
        r59 = pixels[g5+1]*matrix[6][4]; // g5
        r60 = pixels[g6+1]*matrix[6][5]; // g6
        r61 = pixels[g7+1]*matrix[6][6]; // g7
        r62 = pixels[g8+1]*matrix[6][7]; // g8
        r63 = pixels[g9+1]*matrix[6][8]; // g9
        r64 = pixels[h1+1]*matrix[7][0]; // h1
        r65 = pixels[h2+1]*matrix[7][1]; // h2
        r66 = pixels[h3+1]*matrix[7][2]; // h3
        r67 = pixels[h4+1]*matrix[7][3]; // h4
        r68 = pixels[h5+1]*matrix[7][4]; // h5
        r69 = pixels[h6+1]*matrix[7][5]; // h6
        r70 = pixels[h7+1]*matrix[7][6]; // h7
        r71 = pixels[h8+1]*matrix[7][7]; // h8
        r72 = pixels[h9+1]*matrix[7][8]; // h9
        r73 = pixels[i1+1]*matrix[8][0]; // i1
        r74 = pixels[i2+1]*matrix[8][1]; // i2
        r75 = pixels[i3+1]*matrix[8][2]; // i3
        r76 = pixels[i4+1]*matrix[8][3]; // i4
        r77 = pixels[i5+1]*matrix[8][4]; // i5
        r78 = pixels[i6+1]*matrix[8][5]; // i6
        r79 = pixels[i7+1]*matrix[8][6]; // i7
        r80 = pixels[i8+1]*matrix[8][7]; // i8
        r81 = pixels[i9+1]*matrix[8][8]; // i9
        var green = (r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+
                   r11+r12+r13+r14+r15+r16+r17+r18+r19+r20+
                   r21+r22+r23+r24+r25+r26+r27+r28+r29+r30+
                   r31+r32+r33+r34+r35+r36+r37+r38+r39+r40+
                   r41+r42+r43+r44+r45+r46+r47+r48+r49+r50+
                   r51+r52+r53+r54+r55+r56+r57+r58+r59+r60+
                   r61+r62+r63+r64+r65+r66+r67+r68+r69+r70+
                   r71+r72+r73+r74+r75+r76+r77+r78+r79+r80+
                   r81)/5776;
        
        r1 = pixels[a1+2]*matrix[0][0]; // a1
        r2 = pixels[a2+2]*matrix[0][1]; // a2
        r3 = pixels[a3+2]*matrix[0][2]; // a3
        r4 = pixels[a4+2]*matrix[0][3]; // a4
        r5 = pixels[a5+2]*matrix[0][4]; // a5
        r6 = pixels[a6+2]*matrix[0][5]; // a6
        r7 = pixels[a7+2]*matrix[0][6]; // a7
        r8 = pixels[a8+2]*matrix[0][7]; // a8
        r9 = pixels[a9+2]*matrix[0][8]; // a9
        r10 = pixels[b1+2]*matrix[1][0]; // b1
        r11 = pixels[b2+2]*matrix[1][1]; // b2
        r12 = pixels[b3+2]*matrix[1][2]; // b3
        r13 = pixels[b4+2]*matrix[1][3]; // b4
        r14 = pixels[b5+2]*matrix[1][4]; // b5
        r15 = pixels[b6]*matrix[1][5]; // b6
        r16 = pixels[b7+2]*matrix[1][6]; // b7
        r17 = pixels[b8+2]*matrix[1][7]; // b8
        r18 = pixels[b9+2]*matrix[1][8]; // b9
        r19 = pixels[c1+2]*matrix[2][0]; // c1
        r20 = pixels[c2+2]*matrix[2][1]; // c2
        r21 = pixels[c3+2]*matrix[2][2]; // c3
        r22 = pixels[c4+2]*matrix[2][3]; // c4
        r23 = pixels[c5+2]*matrix[2][4]; // c5
        r24 = pixels[c6+2]*matrix[2][5]; // c6
        r25 = pixels[c7+2]*matrix[2][6]; // c7
        r26 = pixels[c8+2]*matrix[2][7]; // c8
        r27 = pixels[c9+2]*matrix[2][8]; // c9
        r28 = pixels[d1+2]*matrix[3][0]; // d1
        r29 = pixels[d2+2]*matrix[3][1]; // d2
        r30 = pixels[d3+2]*matrix[3][2]; // d3
        r31 = pixels[d4+2]*matrix[3][3]; // d4
        r32 = pixels[d5+2]*matrix[3][4]; // d5
        r33 = pixels[d6+2]*matrix[3][5]; // d6
        r34 = pixels[d7+2]*matrix[3][6]; // d7
        r35 = pixels[d8+2]*matrix[3][7]; // d8
        r36 = pixels[d9+2]*matrix[3][8]; // d9
        r37 = pixels[e1+2]*matrix[4][0]; // e1
        r38 = pixels[e2+2]*matrix[4][1]; // e2
        r39 = pixels[e3+2]*matrix[4][2]; // e3
        r40 = pixels[e4+2]*matrix[4][3]; // e4
        r41 = pixels[e5+2]*matrix[4][4]; // e5
        r42 = pixels[e6+2]*matrix[4][5]; // e6
        r43 = pixels[e7+2]*matrix[4][6]; // e7
        r44 = pixels[e8+2]*matrix[4][7]; // e8
        r45 = pixels[e9+2]*matrix[4][8]; // e9
        r46 = pixels[f1+2]*matrix[5][0]; // f1
        r47 = pixels[f2+2]*matrix[5][1]; // f2
        r48 = pixels[f3+2]*matrix[5][2]; // f3
        r49 = pixels[f4+2]*matrix[5][3]; // f4
        r50 = pixels[f5+2]*matrix[5][4]; // f5
        r51 = pixels[f6+2]*matrix[5][5]; // f6
        r52 = pixels[f7+2]*matrix[5][6]; // f7
        r53 = pixels[f8+2]*matrix[5][7]; // f8
        r54 = pixels[f9+2]*matrix[5][8]; // f9
        r55 = pixels[g1+2]*matrix[6][0]; // g1
        r56 = pixels[g2+2]*matrix[6][1]; // g2
        r57 = pixels[g3+2]*matrix[6][2]; // g3
        r58 = pixels[g4+2]*matrix[6][3]; // g4
        r59 = pixels[g5+2]*matrix[6][4]; // g5
        r60 = pixels[g6+2]*matrix[6][5]; // g6
        r61 = pixels[g7+2]*matrix[6][6]; // g7
        r62 = pixels[g8+2]*matrix[6][7]; // g8
        r63 = pixels[g9+2]*matrix[6][8]; // g9
        r64 = pixels[h1+2]*matrix[7][0]; // h1
        r65 = pixels[h2+2]*matrix[7][1]; // h2
        r66 = pixels[h3+2]*matrix[7][2]; // h3
        r67 = pixels[h4+2]*matrix[7][3]; // h4
        r68 = pixels[h5+2]*matrix[7][4]; // h5
        r69 = pixels[h6+2]*matrix[7][5]; // h6
        r70 = pixels[h7+2]*matrix[7][6]; // h7
        r71 = pixels[h8+2]*matrix[7][7]; // h8
        r72 = pixels[h9+2]*matrix[7][8]; // h9
        r73 = pixels[i1+2]*matrix[8][0]; // i1
        r74 = pixels[i2+2]*matrix[8][1]; // i2
        r75 = pixels[i3+2]*matrix[8][2]; // i3
        r76 = pixels[i4+2]*matrix[8][3]; // i4
        r77 = pixels[i5+2]*matrix[8][4]; // i5
        r78 = pixels[i6+2]*matrix[8][5]; // i6
        r79 = pixels[i7+2]*matrix[8][6]; // i7
        r80 = pixels[i8+2]*matrix[8][7]; // i8
        r81 = pixels[i9+2]*matrix[8][8]; // i9
        var blue = (r1+r2+r3+r4+r5+r6+r7+r8+r9+r10+
                   r11+r12+r13+r14+r15+r16+r17+r18+r19+r20+
                   r21+r22+r23+r24+r25+r26+r27+r28+r29+r30+
                   r31+r32+r33+r34+r35+r36+r37+r38+r39+r40+
                   r41+r42+r43+r44+r45+r46+r47+r48+r49+r50+
                   r51+r52+r53+r54+r55+r56+r57+r58+r59+r60+
                   r61+r62+r63+r64+r65+r66+r67+r68+r69+r70+
                   r71+r72+r73+r74+r75+r76+r77+r78+r79+r80+
                   r81)/5776;
					
        pixels[e5] = red+20;
        pixels[e5+1] = green+20;
        pixels[e5+2] = blue+20;
        pixels[e5+3] = pixels[i5+3];
        //added to calculated value to make it brighter
	  	}	
  }
		updatePixels();
}
