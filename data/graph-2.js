var userDataA2 = [], userDataB2 = [];
var dataA2, dataB2;

async function dummyChart() {
	await getDummyData2();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA2,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(255, 255, 255, 1)",
      				borderColor: "rgba(255, 255, 255, 1)",
					borderWidth: 1,
					data: userDataB2,
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
		userDataA2.push(dataA2.pop());
		userDataB2.push(dataB2.pop());
		if (userDataB2.length > 30) {
			userDataA2.shift();
			userDataB2.shift();
		}
		console.log(userDataA2);
		console.log(userDataB2);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyData2() {
	try {
		const timeInterval2 = sessionStorage.getItem("timeinterval2") || "30";
		console.log(timeInterval2);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval2}`;
		console.log("This is Graph-2: ", apiUrl);

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		dataA2 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	dataB2 = barChatData.data.map((x) => x.y);

		if (userDataA2.length == 0 && userDataB2.length == 0) {
			userDataA2 = dataA2;
			userDataB2 = dataB2;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		userDataA2 = [1,2,3,4,5];
		userDataB2 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);
