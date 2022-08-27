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

let x = 3.14 / 14;
let ph_colors = ['#ff0000','#FF2626','#FF5656' ,'#FF914C', '#FFBD58' , '#FFDE59' , '#C9E264' , '#008805' , '#02979E' , '#02669E' , '#1C6EDB' , '#8041A8' , '#9F21EF' , '#4F00FF'];
function setup() {
  createCanvas(300, 170);
}

function draw() {
  background('#EEE');
  noStroke();
  textSize(14)
  for(let i=2; i < 16 ; i++){
    fill(ph_colors[i-2])
  arc(width/2,(height/1.25),200,200,3.14+((i-2)*x),3.14+((i-1)*x))
    
  }
    for(let i=2; i < 16 ; i++){
     let ang = map(i , 2 , 16 , 3.14 , 6.48);
      fill(0);
     text(i-1 , (width-10)/2+108*cos(ang) , (height/1.25)+108*sin(ang));
  }
 
  fill(255)
  arc(width/2 , (height/1.25) , 90 , 90 , 3.14 , 6.28);
  fill(0)
  createPointer(sketchUserDataB_3);
  noStroke()
  text("PH SCALE" , (width-65)/2 , (height/1.05));
}

function createPointer(val){
  fill(0);
  strokeWeight(4);
  stroke(0);
  ang = map(val , 1 , 14 , 3.14 , 6.28);
  line(width/2 , (height/1.25) , (width)/2+100*cos(ang) , (height/1.25)+100*sin(ang));
  fill(ph_colors[val])
  circle(width/2 , (height/1.25) , 15)
}