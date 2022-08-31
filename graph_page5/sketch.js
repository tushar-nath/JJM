var sketchUserDataA_5 = [], sketchUserDataB_5 = [];
var sketchDataA_5 = 0, sketchDataB_5 = 0;
var sketchUserDataB_5 = 1

async function getDummySketchData_5() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=60`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		sketchDataA_5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
    sketchDataB_5 = barChatData.data.map((x) => x.d);
		sketchUserDataB_5 = Math.floor(sketchDataB_5.pop());
    // console.log("This is B: " + sketchUserDataB_5);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		sketchUserDataA_5 = [1,2,3,4,5];
		sketchUserDataB_5 = [0,0,0,0,0];
	}
}

getDummySketchData_5();

// Create a random variable
setInterval(function() {
    getDummySketchData_5();
} , 13000);

let x = 3.14 / 3;
let tds_colors = ['#ff0000', '#FFA500','#00ff00'];
val_list = ['0','60','150' , '']
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
  createPointer(sketchUserDataB_5);
  noStroke()
  text("Water Flow: " + sketchUserDataB_5 , (width-65)/2 , (height/1.05));
}

function createPointer(val){
  fill(0);
  strokeWeight(4);
  stroke(0);
  if(val < 60){
    ang = map(val , 0 , 60 , 3.14 , 3.14+(3.14/3));
  }else if(val < 150){
    ang = map(val , 60 , 150 , 3.14+(3.14/3) , 3.14+2*(3.14/3));
  }else{
    ang = map(val , 150 , 300 , 3.14+2*(3.14/3) , 6.28);
  }
  colorv = round(map(val , 0 , 300 , 0 , 2));
  line(width/2 , (height/1.25) , (width)/2+100*cos(ang) , (height/1.25)+100*sin(ang));
  fill(tds_colors[colorv]);
  circle(width/2 , (height/1.25) , 15)
}