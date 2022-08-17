var userDataA7 = [], userDataB7 = [];
var dataA4, dataB4;

async function dummyChart() {
	await getDummyData7();

	const ctx = document.getElementById("myChart-1").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA7,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(255, 0, 0, 1)",
					borderColor: 'rgba(255, 0, 0, 1)',
					borderWidth: 1,
					data: userDataB7,
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
		getDummyData7()
		userDataA7.push(dataA4.pop());
		userDataB7.push(dataB4.pop());
		if (userDataB7.length > 30) {
			userDataA7.shift();
			userDataB7.shift();
		}
		console.log(userDataA7);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData7() {
	try {
		const timeInterval4 = sessionStorage.getItem("timeinterval4") || "30"
		console.log(timeInterval4);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval4}`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB4 = barChatData.data.map((x) => x.y);

		if (userDataA7.length == 0 && userDataB7.length == 0) {
			userDataA7 = dataA4;
			userDataB7 = dataB4;
		}
	}
	catch(err) {
		alert("No data available for Graph 1");
		userDataA7 = [1,2,3,4,5];
		userDataB7 = [0,0,0,0,0];
	}
}