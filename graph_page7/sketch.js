var sketchUserDataA_7 = [], sketchUserDataB_7 = [];
var sketchDataA_7 = 0, sketchDataB_7 = 0;
var sketchUserDataB_7 = 1

async function getDummySketchData_7() {
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
		

		sketchDataA_7 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
    sketchDataB_7 = barChatData.data.map((x) => x.f);
		sketchUserDataB_7 = Math.floor(sketchDataB_7.pop());
    // console.log("This is B: " + sketchUserDataB_7);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		sketchUserDataA_7 = [1,2,3,4,5];
		sketchUserDataB_7 = [0,0,0,0,0];
	}
}

getDummySketchData_7();

// Create a random variable
setInterval(function() {
    getDummySketchData_7();
} , 13000);

let x = 3.14 / 3;
let tds_colors = ['#00ff00', '#FFA500' , '#ff0000'];
val_list = ['0','20','50' , '100']
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
  createPointer(sketchUserDataB_7);
  noStroke()
  text("Temperature Scale : " + sketchUserDataB_7 , (width-65)/2 , (height/1.05));
}

function createPointer(val){
  fill(0);
  strokeWeight(4);
  stroke(0);
  if(val < 20){
    ang = map(val , 0 , 20 , 3.14 , 3.14+(3.14/3));
  }else if(val < 50){
    ang = map(val , 20 , 50 , 3.14+(3.14/3) , 3.14+2*(3.14/3));
  }else{
    ang = map(val , 50 , 100 , 3.14+2*(3.14/3) , 6.28);
  }
  colorv = round(map(val , 0 , 100 , 0 , 2));
  line(width/2 , (height/1.25) , (width)/2+100*cos(ang) , (height/1.25)+100*sin(ang));
  fill(tds_colors[colorv]);
  circle(width/2 , (height/1.25) , 15)
}