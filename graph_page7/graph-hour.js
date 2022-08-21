var hourUserDataA_7 = [], hourUserDataB_7 = [];
var hourDataA_7, hourDataB_7;

async function dummyChart() {
	await getDummyHourData_7();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_7,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: hourUserDataB_7,
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
		getDummyHourData_7()
		hourUserDataA_7.push(hourDataA_7.pop());
		hourUserDataB_7.push(hourDataB_7.pop());
		if (hourUserDataB_7.length > 30) {
			hourUserDataA_7.shift();
			hourUserDataB_7.shift();
		}
		console.log(hourUserDataA_7);
		console.log(hourUserDataB_7);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_7() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_7 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_7 = barChatData.data.map((x) => x.y);

		if (hourUserDataA_7.length == 0 && hourUserDataB_7.length == 0) {
			hourUserDataA_7 = hourDataA_7;
			hourUserDataB_7 = hourDataB_7;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		hourUserDataA_7 = [1,2,3,4,5];
		hourUserDataB_7 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);