var barUserDataA_6 = [], barUserDataB_6 = [];
var barDataA_6, barDataB_6;

async function dummyChart() {
	await getDummyBarData_6();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_6,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
					borderWidth: 1,
					data: barUserDataB_6,
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
		barUserDataA_6.push(barDataA_6.pop());
		barUserDataB_6.push(barDataB_6.pop());
		if (barUserDataB_6.length > 10) {
			barUserDataA_6.shift();
			barUserDataB_6.shift();
		}
		console.log(barUserDataA_6);
		console.log(barUserDataB_6);
		chart.update();
		setTimeout(updateChart, 30000);
	} 
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_6() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		barDataA_6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	barDataB_6 = barChatData.data.map((x) => x.y);

		if (barUserDataA_6.length == 0 && barUserDataB_6.length == 0) {
			barUserDataA_6 = barDataA_6;
			barUserDataB_6 = barDataB_6;
		}
		while(barDataA_6.length > 10 || barDataB_6.length > 10) {
			barDataA_6.shift();
			barDataB_6.shift();
		}
		
		console.log("barDataA_6",barDataA_6);
		console.log("barDataA_6",barDataB_6);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barUserDataA_6 = [1,2,3,4,5];
		barUserDataB_6 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()