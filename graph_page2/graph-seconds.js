var secUserDataA_2 = [], secUserDataB_2 = [];
var secDataA_2, secDataB_2;

async function dummyChart() {
	await getDummySecData_2();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_2,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#FF4500",
					borderColor: "#FF4500",
					borderWidth: 1,
					data: secUserDataB_2,
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
					labelString: 'TDS Level'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummySecData_2()
		secUserDataA_2.push(secDataA_2.pop());
		secUserDataB_2.push(secDataB_2.pop());
		if (secUserDataB_2.length > 30) {
			secUserDataA_2.shift();
			secUserDataB_2.shift();
		}
		console.log(secUserDataA_2);
		console.log(secUserDataB_2);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_2() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if(districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=30`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=30`;
		}
		
		console.log(apiUrl);

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		secDataA_2 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_2 = barChatData.data.map((x) => x.y);
		secDataA_2 = secDataA_2.slice(0, 21);
		secDataB_2 = secDataB_2.slice(0, 21);

		if (secUserDataA_2.length == 0 && secUserDataB_2.length == 0) {
			secUserDataA_2 = secDataA_2;
			secUserDataB_2 = secDataB_2;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_2 = [1,2,3,4,5];
		secUserDataB_2 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()