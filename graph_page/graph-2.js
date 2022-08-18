var userDataA5 = [], userDataB5 = [];
var dataA5, dataB5;

async function dummyChart() {
	await getDummyData5();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA5,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 0, 255, 1)",
      				borderColor: "rgba(0, 0, 255, 1)",
					borderWidth: 1,
					data: userDataB5,
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
		getDummyData5()
		userDataA5.push(dataA5.pop());
		userDataB5.push(dataB5.pop());
		if (userDataB5.length > 30) {
			userDataA5.shift();
			userDataB5.shift();
		}
		console.log(userDataA5);
		console.log(userDataB5);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData5() {
	try {
		const timeInterval5 = sessionStorage.getItem("timeinterval5") || "30";
		console.log(timeInterval5);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval5}`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB5 = barChatData.data.map((x) => x.y);

		if (userDataA5.length == 0 && userDataB5.length == 0) {
			userDataA5 = dataA5;
			userDataB5 = dataB5;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		userDataA5 = [1,2,3,4,5];
		userDataB5 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);