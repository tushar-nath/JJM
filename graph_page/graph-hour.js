var hourUserDataA_1 = [], hourUserDataB_1 = [];
var hourDataA_1, hourDataB_1;

async function dummyChart() {
	await getDummyHourData_1();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: hourUserDataB_1,
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
		getDummyHourData_1()
		hourUserDataA_1.push(hourDataA_1.pop());
		hourUserDataB_1.push(hourDataB_1.pop());
		if (hourUserDataB_1.length > 30) {
			hourUserDataA_1.shift();
			hourUserDataB_1.shift();
		}
		console.log(hourUserDataA_1);
		console.log(hourUserDataB_1);
		chart.update();
		setTimeout(updateChart, 30000);
	} 
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_1() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_1 = barChatData.data.map((x) => x.y);

		if (hourUserDataA_1.length == 0 && hourUserDataB_1.length == 0) {
			hourUserDataA_1 = hourDataA_1;
			hourUserDataB_1 = hourDataB_1;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		hourUserDataA_1 = [1,2,3,4,5];
		hourUserDataB_1 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()