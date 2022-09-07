var barUserDataA_5 = [], barUserDataB_5 = [];
var barDataA_5, barDataB_5, barDataDay_5, barDataDate_5;

async function dummyChart() {
	await getDummyBarData_5();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_5,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#ABCAE9",
      				borderColor: "#ABCAE9",
					borderWidth: 1,
					data: barUserDataB_5,
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
		getDummyBarData_5()
		barUserDataA_5.push(barDataDay_5.pop());
		barUserDataB_5.push(barDataB_5.pop());
		if (barUserDataB_5.length > 10) {
			barUserDataA_5.shift();
			barUserDataB_5.shift();
		}
		console.log(barUserDataA_5);
		console.log(barUserDataB_5);
		chart.update();
		setTimeout(updateChart, 43200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_5() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=43200`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		barDataA_5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));
		barDataDate_5 = barChatData.data.map((x) => (x.time).slice(0, 9));
		barDataDay_5 = barChatData.data.map((x) => weekday[(new Date(x.time)).getDay()]);

    	barDataB_5 = barChatData.data.map((x) => x.d);

		if (barUserDataA_5.length == 0 && barUserDataB_5.length == 0) {
			barUserDataA_5 = barDataDay_5;
			barUserDataB_5 = barDataB_5;
		}
		while(barDataDay_5.length > 10 || barDataB_5.length > 10) {
			barDataDay_5.shift();
			barDataB_5.shift();
		}
		
		console.log("barDataDay_5",barDataDay_5);
		console.log("barDataA_5",barDataB_5);
	}
	catch(err) {
		// alert("No data available for Graph 2");
		barUserDataA_5 = [1,2,3,4,5];
		barUserDataB_5 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()