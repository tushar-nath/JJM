var barUserDataA_2 = [], barUserDataB_2 = [];
var barDataA_2, barDataB_2,  barDataDay_2, barDataDate_2;

async function dummyChart() {
	await getDummyBarData_2();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_2,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#ABCAE9",
					borderColor: "#ABCAE9",
					borderWidth: 1,
					data: barUserDataB_2,
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
					labelString: 'TDS Level'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummyBarData_2()
		barUserDataA_2.push(barDataDay_2.pop());
		barUserDataB_2.push(barDataB_2.pop());
		if (barUserDataB_2.length > 10) {
			barUserDataA_2.shift();
			barUserDataB_2.shift();
		}
		console.log(barUserDataA_2);
		console.log(barUserDataB_2);
		chart.update();
		setTimeout(updateChart, 43200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_2() {
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

		const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		barDataA_2 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
		barDataDate_2 = barChatData.data.map((x) => (x.time).slice(0, 9));
		barDataDay_2 = barChatData.data.map((x) => weekday[(new Date(x.time)).getDay()]);

    	barDataB_2 = barChatData.data.map((x) => x.y);

		if (barUserDataA_2.length == 0 && barUserDataB_2.length == 0) {
			barUserDataA_2 = barDataDay_2;
			barUserDataB_2 = barDataB_2;
		}
		while(barDataDay_2.length > 10 || barDataB_2.length > 10) {
			barDataDay_2.shift();
			barDataB_2.shift();
		}
		
		console.log("barDataDay_2",barDataDay_2);
		console.log("barDataA_2",barDataB_2);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		barUserDataA_1 = [1];
		barUserDataB_1 = [0];
	}
}


// window.setInterval(getDummyData()