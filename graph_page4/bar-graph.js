var barUserDataA_4 = [], barUserDataB_4 = [];
var barDataA_4, barDataB_4, barDataDay_4, barDataDate_4;

async function dummyChart() {
	await getDummyBarData_4();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_4,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
					borderWidth: 1,
					data: barUserDataB_4,
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
		getDummyBarData_4()
		barUserDataA_4.push(barDataDay_4.pop());
		barUserDataB_4.push(barDataB_4.pop());
		if (barUserDataB_4.length > 10) {
			barUserDataA_4.shift();
			barUserDataB_4.shift();
		}
		console.log(barUserDataA_4);
		console.log(barUserDataB_4);
		chart.update();
		setTimeout(updateChart, 43200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_4() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		
		const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		barDataA_4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
		barDataDate_4 = barChatData.data.map((x) => (x.time).slice(0, 9));
		barDataDay_4 = barChatData.data.map((x) => weekday[(new Date(x.time)).getDay()]);

    	barDataB_4 = barChatData.data.map((x) => x.y);

		if (barUserDataA_4.length == 0 && barUserDataB_4.length == 0) {
			barUserDataA_4 = barDataDay_4;
			barUserDataB_4 = barDataB_4;
		}
		while(barDataDay_4.length > 10 || barDataB_4.length > 10) {
			barDataDay_4.shift();
			barDataB_4.shift();
		}
		
		console.log("barDataDay_4",barDataDay_4);
		console.log("barDataA_4",barDataB_4);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barUserDataA_4 = [1,2,3,4,5];
		barUserDataB_4 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()