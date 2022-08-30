var sketchUserDataA_3 = [], sketchUserDataB_3 = [];
var sketchDataA_3 = 0, sketchDataB_3 = 0;
var sketchUserDataB_3 = 1

async function getDummySketchData_3() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=60`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		sketchDataA_3 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
    sketchDataB_3 = barChatData.data.map((x) => x.y);
		sketchUserDataB_3 = Math.floor(sketchDataB_3.pop());
    // console.log("This is B: " + sketchUserDataB_3);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		sketchUserDataA_3 = [1,2,3,4,5];
		sketchUserDataB_3 = [0,0,0,0,0];
	}
}

getDummySketchData_3();

// Create a random variable
setInterval(function() {
    getDummySketchData_3();
} , 13000);

let x = 3.14 / 3;
let tds_colors = ['#00ff00', '#FFA500' , '#ff0000'];
val_list = ['0','0.2','1' , '']
function setup() {
  createCanvas(300, 170);
}

function draw() {
  background('#EEE');
  noStroke();
  textSize(14)
  for(let i=2; i < 5 ; i++){
    fill(tds_colors[i-2])
  arc(width/2,(height/1.25),200,200,3.14+((i-2)*x),3.14+((i-1)*x))
    
  }
    for(let i=0; i < 4 ; i++){
     let ang = map(i , 0 , 3 , 3.14 , 6.38);
      fill(0);
     text(val_list[i] , (width-10)/2+108*cos(ang) , (height/1.25)+108*sin(ang));
  }
 
  fill(255)
  arc(width/2 , (height/1.25) , 90 , 90 , 3.14 , 6.28);
  fill(0)
  createPointer(sketchDataB_3);
  noStroke()
  text("Residual Chlorine : " + sketchDataB_3 , (width-65)/2 , (height/1.05));
}

function createPointer(val){
  fill(0);
  strokeWeight(4);
  stroke(0);
  if(val < 0.2){
    ang = map(val , 0 , 0.2 , 3.14 , 3.14+(3.14/3));
  }else if(val < 1){
    ang = map(val , 0.2 , 1 , 3.14+(3.14/3) , 3.14+2*(3.14/3));
  }else{
    ang = map(val , 1 , 2 , 3.14+2*(3.14/3) , 6.28);
  }
  colorv = round(map(val , 0 , 2 , 0 , 2));
  line(width/2 , (height/1.25) , (width)/2+100*cos(ang) , (height/1.25)+100*sin(ang));
  fill(tds_colors[colorv]);
  circle(width/2 , (height/1.25) , 15)
}