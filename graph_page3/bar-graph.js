var barUserDataA_3 = [], barUserDataB_3 = [];
var barDataA_3, barDataB_3;

async function dummyChart() {
	await getDummyBarData_3();

	const ctx = document.getElementById("myChart-2").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: barUserDataA_3,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
					borderWidth: 1,
					data: barUserDataB_3,
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
		getDummyBarData_3()
		barUserDataA_3.push(barDataA_3.pop());
		barUserDataB_3.push(barDataB_3.pop());
		if (barUserDataB_3.length > 10) {
			barUserDataA_3.shift();
			barUserDataB_3.shift();
		}
		console.log(barUserDataA_3);
		console.log(barUserDataB_3);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_3() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		barDataA_3 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	barDataB_3 = barChatData.data.map((x) => x.y);

		if (barUserDataA_3.length == 0 && barUserDataB_3.length == 0) {
			barUserDataA_3 = barDataA_3;
			barUserDataB_3 = barDataB_3;
		}
		while(barDataA_3.length > 10 || barDataB_3.length > 10) {
			barDataA_3.shift();
			barDataB_3.shift();
		}
		
		console.log("barDataA_3",barDataA_3);
		console.log("barDataA_3",barDataB_3);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barUserDataA_3 = [1,2,3,4,5];
		barUserDataB_3 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData(), 30000);