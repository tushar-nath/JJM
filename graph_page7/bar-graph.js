var barUserDataA_7 = [], barUserDataB_7 = [];
var barDataA_7, barDataB_7, barDataDay_7, barDataDate_7;

async function dummyChart() {
	await getDummyBarData_7();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_7,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#ABCAE9",
      				borderColor: "#ABCAE9",
					borderWidth: 1,
					data: barUserDataB_7,
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
					labelString: 'Temperature'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummyBarData_7()
		barUserDataA_7.push(barDataDay_7.pop());
		barUserDataB_7.push(barDataB_7.pop());
		if (barUserDataB_7.length > 10) {
			barUserDataA_7.shift();
			barUserDataB_7.shift();
		}
		console.log(barUserDataA_7);
		console.log(barUserDataB_7);
		chart.update();
		setTimeout(updateChart, 43200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_7() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();

		const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		barDataA_7 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
		barDataDate_7 = barChatData.data.map((x) => (x.time).slice(0, 9));
		barDataDay_7 = barChatData.data.map((x) => weekday[(new Date(x.time)).getDay()]);

    	barDataB_7 = barChatData.data.map((x) => x.f);

		if (barUserDataA_7.length == 0 && barUserDataB_7.length == 0) {
			barUserDataA_7 = barDataDay_7;
			barUserDataB_7 = barDataB_7;
		}
		while(barDataDay_7.length > 10 || barDataB_7.length > 10) {
			barDataDay_7.shift();
			barDataB_7.shift();
		}
		
		console.log("barDataDay_7",barDataDay_7);
		console.log("barDataA_7",barDataB_7);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barUserDataA_7 = [1,2,3,4,5];
		barUserDataB_7 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()