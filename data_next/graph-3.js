var userDataA3 = [], userDataB3 = [];
var dataA3, dataB3;

async function dummyChart() {
	await getDummyData3();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA3,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: userDataB3,
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
		getDummyData2()
		userDataA3.push(dataA3.pop());
		userDataB3.push(dataB3.pop());
		if (userDataB3.length > 30) {
			userDataA3.shift();
			userDataB3.shift();
		}
		console.log(userDataA3);
		console.log(userDataB3);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData3() {
	try {
		const timeInterval6 = sessionStorage.getItem("timeinterval6")
		console.log(timeInterval6);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval6}`;
		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA3 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB3 = barChatData.data.map((x) => x.y);

		if (userDataA3.length == 0 && userDataB3.length == 0) {
			userDataA3 = dataA3;
			userDataB3 = dataB3;
		}
	}
	catch(err) {
		alert("No data available for Graph 3");
		userDataA = [1,2,3,4,5];
		userDataB = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);