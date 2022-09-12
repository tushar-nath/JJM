var userDataA8 = [], userDataB8 = [];
var dataA5, dataB5;

async function dummyChart() {
	await getDummyData8();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA8,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 0, 255, 1)",
      				borderColor: "rgba(0, 0, 255, 1)",
					borderWidth: 1,
					data: userDataB8,
				}
			],
		},

		// Configuration options go here
		options: {
			maintainAspectRatio: false,
			legend: {display: false},
			tooltips: {
				mode: "index",
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Time",
					},
				}],
				yAxes: [{
				ticks: { min: 0},
				scaleLabel: {
					display: true,
					labelString: 'Y-AXIS'
				  }
				}], 
			},
		},
	});
	setInterval(() => {
		getDummyData8()
		userDataA8.push(dataA5.pop());
		userDataB8.push(dataB5.pop());
		if (userDataB8.length > 30) {
			userDataA8.shift();
			userDataB8.shift();
		}
		console.log(userDataA8);
		console.log(userDataB8);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData8() {
	try {
		const timeInterval5 = sessionStorage.getItem("timeinterval5") || "30";
		console.log(timeInterval5);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval5}`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB5 = barChatData.data.map((x) => x.y);

		if (userDataA8.length == 0 && userDataB8.length == 0) {
			userDataA8 = dataA5;
			userDataB8 = dataB5;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		userDataA8 = [1,2,3,4,5];
		userDataB8 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);