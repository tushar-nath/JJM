var secUserDataA_1 = [], secUserDataB_1 = [];
var secDataA_1, secDataB_1;

async function dummyChart() {
	await getDummySecData_1();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: secUserDataA_1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#FF4500",
      				borderColor: "#FF4500",
					borderWidth: 1,
					data: secUserDataB_1,
				},
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
						labelString: 'pH Level'
					}
				}], 
			},
		},
	});
	function updateChart() {
		getDummySecData_1()
		secUserDataA_1.push(secDataA_1.pop());
		secUserDataB_1.push(secDataB_1.pop());
		if (secUserDataB_1.length > 30) {
			secUserDataA_1.shift();
			secUserDataB_1.shift();
		}
		console.log(secUserDataA_1);
		console.log(secUserDataB_1);
		chart.update();
		setTimeout(updateChart, 30000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummySecData_1() {
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
		

		secDataA_1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	secDataB_1 = barChatData.data.map((x) => x.x);
		secDataA_1 = secDataA_1.slice(0, 21);
		secDataB_1 = secDataB_1.slice(0, 21);
		console.log(secDataA_1);
		console.log(secDataB_1);

		if (secUserDataA_1.length == 0 && secUserDataB_1.length == 0) {
			secUserDataA_1 = secDataA_1;
			secUserDataB_1 = secDataB_1;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		secUserDataA_1 = [1,2,3,4,5];
		secUserDataB_1 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()
