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
      				backgroundColor: "rgba(19, 136, 8, 1)",
      				borderColor: "rgba(19, 136, 8, 1)",
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
		const timeInterval3 = sessionStorage.getItem("timeinterval3") || "30";
		console.log(timeInterval3);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval3}`;
		console.log("This is Graph-3: ", apiUrl);

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
		alert("No data available for Graph 2");
		userDataA3 = [1,2,3,4,5];
		userDataB3 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);
