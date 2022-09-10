var barUserDataA_1 = [], barUserDataB_1 = [];
var barDataA_1, barDataB_1, barDataDay_1, barDataDate_1;
const barData = [0.101, 0.100, 0.101999 , 0.105999, 0.103, 0.0977, 0.090909, 0.10497, 0.105999 , 0.102776];
barUserDataA_1 = [0];
var bar;

const sensorId = sessionStorage.getItem("sensorId") || "1";
const districtId = sessionStorage.getItem("districtId") || "1";
const cityId = sessionStorage.getItem("cityId") || "1";
if (districtId == 2 && cityId == 7) {
	bar = barData;
} else {
	bar = barDataA_1;
}

async function dummyChart() {
	await getDummyBarData_1();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barDataDay_1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#ABCAE9",
					borderColor: "#ABCAE9",
					borderWidth: 1,
					data: bar,
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
						labelString: "Time",
					},
				}],
				yAxes: [{
					ticks: { min: 0 },
					scaleLabel: {
						display: true,
						labelString: 'pH Level'
					}
				}],
			},
		},
	});
	function updateChart() {
		getDummyBarData_1()
		barUserDataA_1.push(barDataDay_1.pop());
		barUserDataB_1.push(barDataB_1.pop());
		if (barUserDataB_1.length > 10) {
			barDataDay_1.shift();
			barUserDataB_1.shift();
		}
		console.log(barUserDataA_1);
		console.log(barUserDataB_1);
		chart.update();
		setTimeout(updateChart, 600000);
	}

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_1() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if (districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=43200`;
		}


		const response = await fetch(apiUrl);
		const barChatData = await response.json();

		const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		barDataA_1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
		barDataDate_1 = barChatData.data.map((x) => (x.time).slice(0, 9));
		barDataDay_1 = barChatData.data.map((x) => weekday[(new Date(x.time)).getDay()]);

		barDataB_1 = barChatData.data.map((x) => x.x);

		if (barUserDataA_1.length == 0 && barUserDataB_1.length == 0) {
			barUserDataA_1 = barDataDay_1;
			barUserDataB_1 = barDataB_1;
		}
		while (barDataDay_1.length > 10 || barDataB_1.length > 10) {
			barDataDay_1.shift();
			barDataB_1.shift();
		}

		console.log("barDataDay_1", barDataDay_1);
		console.log("barDataDay_1", barDataB_1);
	}
	catch (err) {
		console.log(err);
		// alert("No data available for Graph 2");
		barUserDataA_1 = [1];
		barUserDataB_1 = [0];
	}
}


// window.setInterval(getDummyData()
