var hourUserDataA_2 = [], hourUserDataB_2 = [];
var hourDataA_2, hourDataB_2;

async function dummyChart() {
	await getDummyHourData_2();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_2,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: hourUserDataB_2,
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
		getDummyHourData_2()
		hourUserDataA_2.push(hourDataA_2.pop());
		hourUserDataB_2.push(hourDataB_2.pop());
		if (hourUserDataB_2.length > 30) {
			hourUserDataA_2.shift();
			hourUserDataB_2.shift();
		}
		console.log(hourUserDataA_2);
		console.log(hourUserDataB_2);
		chart.update();
		setTimeout(updateChart, 600000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_2() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_2 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_2 = barChatData.data.map((x) => x.y);

		hourDataA_2 = hourDataA_2.slice(0, 21);
		hourDataB_2 = hourDataB_2.slice(0, 21);

		if (hourUserDataA_2.length == 0 && hourUserDataB_2.length == 0) {
			hourUserDataA_2 = hourDataA_2;
			hourUserDataB_2 = hourDataB_2;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		hourUserDataA_2 = [1,2,3,4,5];
		hourUserDataB_2 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()