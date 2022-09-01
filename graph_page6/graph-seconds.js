var secUserDataA_6 = [], secUserDataB_6 = [];
var secDataA_6, secDataB_6;

async function dummyChart() {
	await getDummySecData_6();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_6,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 0, 255, 1)",
      				borderColor: "rgba(0, 0, 255, 1)",
					borderWidth: 1,
					data: secUserDataB_6,
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
		getDummySecData_6()
		secUserDataA_6.push(secDataA_6.pop());
		secUserDataB_6.push(secDataB_6.pop());
		if (secUserDataB_6.length > 30) {
			secUserDataA_6.shift();
			secUserDataB_6.shift();
		}
		console.log(secUserDataA_6);
		console.log(secUserDataB_6);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_6() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		secDataA_6 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_6 = barChatData.data.map((x) => x.e);
		secDataA_6 = secDataA_6.slice(0, 21);
		secDataB_6 = secDataB_6.slice(0, 21);

		if (secUserDataA_6.length == 0 && secUserDataB_6.length == 0) {
			secUserDataA_6 = secDataA_6;
			secUserDataB_6 = secDataB_6;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		secUserDataA_6 = [1,2,3,4,5];
		secUserDataB_6 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()