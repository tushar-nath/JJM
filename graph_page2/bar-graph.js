var barUserDataA_2 = [], barUserDataB_2 = [];
var barDataA_2, barDataB_2;

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
      				backgroundColor: "#FFA500",
      				borderColor: "#FFA500",
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
					labelString: 'Y-AXIS'
				  }
				}], 
			},
		},
	});
	setInterval(() => {
		getDummyBarData_2()
		barUserDataA_2.push(barDataA_2.pop());
		barUserDataB_2.push(barDataB_2.pop());
		if (barUserDataB_2.length > 10) {
			barUserDataA_2.shift();
			barUserDataB_2.shift();
		}
		console.log(barUserDataA_2);
		console.log(barUserDataB_2);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummyBarData_2() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		barDataA_2 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	barDataB_2 = barChatData.data.map((x) => x.y);

		if (barUserDataA_2.length == 0 && barUserDataB_2.length == 0) {
			barUserDataA_2 = barDataA_2;
			barUserDataB_2 = barDataB_2;
		}
		while(barDataA_2.length > 10 || barDataB_2.length > 10) {
			barDataA_2.shift();
			barDataB_2.shift();
		}
		
		console.log("barDataA_2",barDataA_2);
		console.log("barDataA_2",barDataB_2);
	}
	catch(err) {
		alert("No data available for Graph 2");
		barUserDataA_2 = [1,2,3,4,5];
		barUserDataB_2 = [10,30,20,11,12];
	}
}


// window.setInterval(getDummyData(), 30000);