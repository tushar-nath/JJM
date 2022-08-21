var secUserDataA_4 = [], secUserDataB_4 = [];
var secDataA_4, secDataB_4;

async function dummyChart() {
	await getDummySecData_4();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_4,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(0, 0, 255, 1)",
      				borderColor: "rgba(0, 0, 255, 1)",
					borderWidth: 1,
					data: secUserDataB_4,
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
		getDummySecData_4()
		secUserDataA_4.push(secDataA_4.pop());
		secUserDataB_4.push(secDataB_4.pop());
		if (secUserDataB_4.length > 30) {
			secUserDataA_4.shift();
			secUserDataB_4.shift();
		}
		console.log(secUserDataA_4);
		console.log(secUserDataB_4);
		chart.update();
	} , 30000);
}

dummyChart();

//Fetch Data from API

async function getDummySecData_4() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		secDataA_4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_4 = barChatData.data.map((x) => x.y);

		if (secUserDataA_4.length == 0 && secUserDataB_4.length == 0) {
			secUserDataA_4 = secDataA_4;
			secUserDataB_4 = secDataB_4;
		}
	}
	catch(err) {
		alert("No data available for Graph 2");
		secUserDataA_4 = [1,2,3,4,5];
		secUserDataB_4 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);