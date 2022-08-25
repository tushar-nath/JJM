var barUserDataA_1 = [], barUserDataB_1 = [];
var barDataA_1, barDataB_1;

async function dummyChart() {
	await getDummyBarData_1();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
					borderWidth: 1,
					data: barUserDataB_1,
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
		getDummyBarData_1()
		barUserDataA_1.push(barDataA_1.pop());
		barUserDataB_1.push(barDataB_1.pop());
		if (barUserDataB_1.length > 10) {
			barUserDataA_1.shift();
			barUserDataB_1.shift();
		}
		console.log(barUserDataA_1);
		console.log(barUserDataB_1);
		chart.update();
		setTimeout(updateChart, 30000);
	} 
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_1() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		barDataA_1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	barDataB_1 = barChatData.data.map((x) => x.y);

		if (barUserDataA_1.length == 0 && barUserDataB_1.length == 0) {
			barUserDataA_1 = barDataA_1;
			barUserDataB_1 = barDataB_1;
		}
		while(barDataA_1.length > 10 || barDataB_1.length > 10) {
			barDataA_1.shift();
			barDataB_1.shift();
		}
		
		console.log("barDataA_1",barDataA_1);
		console.log("barDataA_1",barDataB_1);
	}
	catch(err) {
		console.log(err);
		alert("No data available for Graph 2");
		barUserDataA_1 = [1,2,3,4,5];
		barUserDataB_1 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData()