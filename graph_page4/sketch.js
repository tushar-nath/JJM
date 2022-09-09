var sketchUserDataA_4 = [], sketchUserDataB_4 = [];
var sketchDataA_4 = 0, sketchDataB_4 = 0;
var sketchUserDataB_4 = 1

async function getDummySketchData_4() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
    const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if(districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=60`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=60`;
		}

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		sketchDataA_4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
    sketchDataB_4 = barChatData.data.map((x) => x.b);
		sketchUserDataB_4 = sketchDataB_4.pop();
    sketchUserDataB_4 = sketchUserDataB_4.toFixed(3);
    // console.log("This is B: " + sketchUserDataB_4);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		sketchUserDataA_4 = [1,2,3,4,5];
		sketchUserDataB_4 = [0,0,0,0,0];
	}
}

getDummySketchData_4();

// Create a random variable
setInterval(function() {
    getDummySketchData_4();
} , 13000);

let x = 3.14 / 3;
let tds_colors = ['#00ff00', '#FFA500' , '#ff0000'];
val_list = ['0','1','5' , '']
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
  createPointer(sketchUserDataB_4);
  noStroke()
  text("Turbidity SCALE : " + float(sketchUserDataB_4) , (width-65)/2 , (height/1.05));
}

function createPointer(val){
  fill(0);
  strokeWeight(4);
  stroke(0);
  if(val < 1){
    ang = map(val , 0 , 1 , 3.14 , 3.14+(3.14/3));
  }else if(val < 5){
    ang = map(val , 1 , 5 , 3.14+(3.14/3) , 3.14+2*(3.14/3));
  }else{
    ang = map(val , 5 , 10 , 3.14+2*(3.14/3) , 6.28);
  }
  colorv = round(map(val , 0 , 10 , 0 , 2));
  line(width/2 , (height/1.25) , (width)/2+100*cos(ang) , (height/1.25)+100*sin(ang));
  fill(tds_colors[colorv]);
  circle(width/2 , (height/1.25) , 15)
}