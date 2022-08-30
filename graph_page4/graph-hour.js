var hourUserDataA_4 = [], hourUserDataB_4 = [];
var hourDataA_4, hourDataB_4;

async function dummyChart() {
	await getDummyHourData_4();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_4,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: hourUserDataB_4,
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
	function updateChart() {
		getDummyHourData_4()
		hourUserDataA_4.push(hourDataA_4.pop());
		hourUserDataB_4.push(hourDataB_4.pop());
		if (hourUserDataB_4.length > 30) {
			hourUserDataA_4.shift();
			hourUserDataB_4.shift();
		}
		console.log(hourUserDataA_4);
		console.log(hourUserDataB_4);
		chart.update();
		setTimeout(updateChart, 60000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_4() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_4 = barChatData.data.map((x) => x.y);
		hourDataA_4 = hourDataA_4.slice(0, 21);
		hourDataB_4 = hourDataB_4.slice(0, 21);

		if (hourUserDataA_4.length == 0 && hourUserDataB_4.length == 0) {
			hourUserDataA_4 = hourDataA_4;
			hourUserDataB_4 = hourDataB_4;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		hourUserDataA_4 = [1,2,3,4,5];
		hourUserDataB_4 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()