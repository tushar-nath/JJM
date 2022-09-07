var secUserDataA_3 = [], secUserDataB_3 = [];
var secDataA_3, secDataB_3;

async function dummyChart() {
	await getDummySecData_3();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_3,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#FF4500",
					borderColor: "#FF4500",
					borderWidth: 1,
					data: secUserDataB_3,
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
					labelString: 'Turbidity Level'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummySecData_3()
		secUserDataA_3.push(secDataA_3.pop());
		secUserDataB_3.push(secDataB_3.pop());
		if (secUserDataB_3.length > 30) {
			secUserDataA_3.shift();
			secUserDataB_3.shift();
		}
		console.log(secUserDataA_3);
		console.log(secUserDataB_3);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_3() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		secDataA_3 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_3 = barChatData.data.map((x) => x.a);
		secDataA_3 = secDataA_3.slice(0, 21)
		secDataB_3 = secDataB_3.slice(0, 21)

		if (secUserDataA_3.length == 0 && secUserDataB_3.length == 0) {
			secUserDataA_3 = secDataA_3;
			secUserDataB_3 = secDataB_3;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_3 = [1,2,3,4,5];
		secUserDataB_3 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()