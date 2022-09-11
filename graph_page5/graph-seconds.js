var secUserDataA_5 = [], secUserDataB_5 = [];
var secDataA_5, secDataB_5;

async function dummyChart() {
	await getDummySecData_5();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_5,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#FF4500",
					borderColor: "#FF4500",
					borderWidth: 1,
					data: secUserDataB_5,
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
		getDummySecData_5()
		secUserDataA_5.push(secDataA_5.pop());
		secUserDataB_5.push(secDataB_5.pop());
		if (secUserDataB_5.length > 30) {
			secUserDataA_5.shift();
			secUserDataB_5.shift();
		}
		console.log(secUserDataA_5);
		console.log(secUserDataB_5);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_5() {
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
		

		secDataA_5 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_5 = barChatData.data.map((x) => x.d);
		secDataA_5 = secDataA_5.slice(0, 21);
		secDataB_5 = secDataB_5.slice(0, 21);

		if (secUserDataA_5.length == 0 && secUserDataB_5.length == 0) {
			secUserDataA_5 = secDataA_5;
			secUserDataB_5 = secDataB_5;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_5 = [1,2,3,4,5];
		secUserDataB_5 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()
