var hourUserDataA_6 = [], hourUserDataB_6 = [];
var hourDataA_6, hourDataB_6;

async function dummyChart() {
	await getDummyHourData_6();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_6,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 255, 0, 1)",
      				borderColor: "rgba(0, 255, 0, 1)",
					borderWidth: 1,
					data: hourUserDataB_6,
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
		getDummyHourData_6()
		hourUserDataA_6.push(hourDataA_6.pop());
		hourUserDataB_6.push(hourDataB_6.pop());
		if (hourUserDataB_6.length > 30) {
			hourUserDataA_6.shift();
			hourUserDataB_6.shift();
		}
		console.log(hourUserDataA_6);
		console.log(hourUserDataB_6);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_6() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_6 = barChatData.data.map((x) => x.y);

		if (hourUserDataA_6.length == 0 && hourUserDataB_6.length == 0) {
			hourUserDataA_6 = hourDataA_6;
			hourUserDataB_6 = hourDataB_6;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		hourUserDataA_6 = [1,2,3,4,5];
		hourUserDataB_6 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);