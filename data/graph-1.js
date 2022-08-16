var userDataA1 = [], userDataB1 = [];
var dataA1, dataB1;
var timeInterval1;

async function dummyChart() {
	await getDummyData1();

	const ctx = document.getElementById("myChart-1").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "rgba(255, 0, 0, 1)",
					borderColor: 'rgba(255, 0, 0, 1)',
					borderWidth: 1,
					data: userDataB1,
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
		getDummyData1();
		userDataA1.push(dataA1.pop());
		userDataB1.push(dataB1.pop());
		if (userDataB1.length > 30) {
			userDataA1.shift();
			userDataB1.shift();
		}
		console.log(userDataA1);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData1() {
	try {
		timeInterval1 = sessionStorage.getItem("timeinterval1") || "30";
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		// console.log(sensorId);
		console.log(timeInterval1);
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval1}`;
		console.log("This is Graph-1: ", apiUrl);

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		
		dataA1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB1 = barChatData.data.map((x) => x.y);

		if (userDataA1.length == 0 && userDataB1.length == 0) {
			userDataA1 = dataA1;
			userDataB1 = dataB1;
		}

	}
	catch(err) {
		alert("No data available for Graph 1");
		userDataA1 = [1,2,3,4,5];
		userDataB1 = [0,0,0,0,0];
	}
}

//window.setInterval(getDummyData(), 30000);
