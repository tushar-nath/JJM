var userDataA6 = [], userDataB6 = [];
var dataA6, dataB6;

async function dummyChart() {
	await getDummyData6();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA6,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: userDataB6,
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
		getDummyData6()
		userDataA6.push(dataA6.pop());
		userDataB6.push(dataB6.pop());
		if (userDataB6.length > 30) {
			userDataA6.shift();
			userDataB6.shift();
		}
		console.log(userDataA6);
		console.log(userDataB6);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData6() {
	try {
		const timeInterval6 = sessionStorage.getItem("timeinterval6") || "30";
		console.log(timeInterval6);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval6}`;
		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB6 = barChatData.data.map((x) => x.y);

		if (userDataA6.length == 0 && userDataB6.length == 0) {
			userDataA6 = dataA6;
			userDataB6 = dataB6;
		}
	}
	catch(err) {
		alert("No data available for Graph 3");
		userDataA6 = [1,2,3,4,5];
		userDataB6 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);