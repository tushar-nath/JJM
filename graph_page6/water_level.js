var barWaterDataA_6 = [], barWaterDataB_6 = [];
var barUserWaterDataA_6 = 0, barUserWaterDataB_6 = [], barWaterDay_6, barWaterDate_6;

async function dummyChart() {
	await getDummyBarData_6();

	const ctx = document.getElementById("myChart-1").getContext("2d");
	console.log("Hello")

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: [],
			datasets: [
				{
					barThickness: 2,
					fill: false,
					lineTension: 0,
					backgroundColor: "#00BFFF",
					borderColor: "#00BFFF",
					borderWidth: 1,
					data: barUserWaterDataB_6,
				}
			],
		},

		// Configuration options go here
		options: {
			maintainAspectRatio: false,
			legend: { display: false },
			tooltips: {
				mode: "index",
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Water Level",
					},
					gridLines: {
						display: false
					}
				}],
				yAxes: [{
					ticks: { min: 0 },
					scaleLabel: {
						display: false,
						labelString: 'Y-AXIS'
					},
					gridLines: {
						display: false
					}
				}],
			},
		},
	});
	function updateChart() {
		getDummyBarData_6()
		barUserWaterDataB_6.push(barWaterDataB_6.pop());
		console.log("This is water data in function: ", barUserWaterDataB_6);
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
		const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if(districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=43200`;
		}
		

		const response = await fetch(apiUrl);
		const barChatData = await response.json();

		barWaterDataA_6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

		barWaterDataB_6 = barChatData.data.map((x) => x.e);
		console.log("This is water data B: ", barWaterDataB_6.pop());
		console.log("This is water data A: ", barWaterDataA_6);

		barUserWaterDataB_6 = []

	}
	catch (err) {
		// alert("No data available for Bar Graph");
		barUserWaterDataA_6 = [1];
		barUserWaterDataB_6 = [0];
	}
}


// window.setInterval(getDummyData()