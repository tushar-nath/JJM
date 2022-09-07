var hourUserDataA_5 = [], hourUserDataB_5 = [];
var hourDataA_5, hourDataB_5;

async function dummyChart() {
	await getDummyHourData_5();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_5,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#138808",
					borderColor: "#138808",
					borderWidth: 1,
					data: hourUserDataB_5,
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
					labelString: 'Waterflow'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummyHourData_5()
		hourUserDataA_5.push(hourDataA_5.pop());
		hourUserDataB_5.push(hourDataB_5.pop());
		if (hourUserDataB_5.length > 30) {
			hourUserDataA_5.shift();
			hourUserDataB_5.shift();
		}
		console.log(hourUserDataA_5);
		console.log(hourUserDataB_5);
		chart.update();
		setTimeout(updateChart, 60000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_5() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_5 = barChatData.data.map((x) => x.d);
		hourDataA_5 = hourDataA_5.slice(0, 21);
		hourDataB_5 = hourDataB_5.slice(0, 21);

		if (hourUserDataA_5.length == 0 && hourUserDataB_5.length == 0) {
			hourUserDataA_5 = hourDataA_5;
			hourUserDataB_5 = hourDataB_5;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		hourUserDataA_5 = [1,2,3,4,5];
		hourUserDataB_5 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()