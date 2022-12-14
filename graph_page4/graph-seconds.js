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
					backgroundColor: "#FF4500",
					borderColor: "#FF4500",
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
					labelString: 'Residual Chlorine'
				  }
				}], 
			},
		},
	});
	function updateChart() {
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
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_4() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if(districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=30`;
		}

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		secDataA_4 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_4 = barChatData.data.map((x) => x.b);
		secDataA_4 = secDataA_4.slice(0, 21);
		secDataB_4 = secDataB_4.slice(0, 21);

		if (secUserDataA_4.length == 0 && secUserDataB_4.length == 0) {
			secUserDataA_4 = secDataA_4;
			secUserDataB_4 = secDataB_4;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_4 = [1,2,3,4,5];
		secUserDataB_4 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()