var barWaterDataA_6 = [], barWaterDataB_6 = [];
var barWaterDataA_6, barWaterDataB_6, barWaterDay_6, barWaterDate_6;

async function dummyChart() {
	await getDummyBarData_6();

	const ctx = document.getElementById("myChart-1").getContext("2d");
    console.log("Hello")

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: ["Water Level"],
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
					borderWidth: 1,
					data: [10],
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
		getDummyBarData_6()
		barWaterDataA_6.push(barWaterDataA_6.pop());
		barWaterDataB_6.push(barWaterDataB_6.pop());
		if (barWaterDataB_6.length > 10) {
			barWaterDataA_6.shift();
			barWaterDataB_6.shift();
		}
		console.log(barWaterDataA_6);
		console.log(barWaterDataB_6);
		chart.update();
		setTimeout(updateChart, 43200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_6() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();

		const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		barWaterDataA_6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	barWaterDataB_6 = barChatData.data.map((x) => x.e);

		if (barWaterDataA_6.length == 0 && barWaterDataB_6.length == 0) {
			barWaterDataA_6 = barWaterDataA_6;
			barWaterDataB_6 = barWaterDataB_6;
		}
		
		console.log("barWaterDay_6",barWaterDataA_6);
		console.log("barWaterDataB_6",barWaterDataB_6);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barWaterDataA_6 = [1,2,3,4,5];
		barWaterDataB_6 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()