var secUserDataA_7 = [], secUserDataB_7 = [];
var secDataA_7, secDataB_7;

async function dummyChart() {
	await getDummySecData_7();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_7,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#FF4500",
					borderColor: "#FF4500",
					borderWidth: 1,
					data: secUserDataB_7,
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
					labelString: 'Temperature'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummySecData_7()
		secUserDataA_7.push(secDataA_7.pop());
		secUserDataB_7.push(secDataB_7.pop());
		if (secUserDataB_7.length > 30) {
			secUserDataA_7.shift();
			secUserDataB_7.shift();
		}
		console.log(secUserDataA_7);
		console.log(secUserDataB_7);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_7() {
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
		

		secDataA_7 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_7 = barChatData.data.map((x) => x.f);
		secDataA_7 = secDataA_7.slice(0, 21);
		secDataB_7 = secDataB_7.slice(0, 21);

		if (secUserDataA_7.length == 0 && secUserDataB_7.length == 0) {
			secUserDataA_7 = secDataA_7;
			secUserDataB_7 = secDataB_7;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_7 = [1,2,3,4,5];
		secUserDataB_7 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()