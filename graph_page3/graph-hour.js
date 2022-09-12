var hourUserDataA_3 = [], hourUserDataB_3 = [];
var hourDataA_3, hourDataB_3;

async function dummyChart() {
	await getDummyHourData_3();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_3,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: "#138808",
					borderColor: "#138808",
					borderWidth: 1,
					data: [101, 103, 97, 96, 98, 102, 102.5, 101.7, 104, 101,101, 103, 97, 96, 98, 102, 102.5, 101.7, 104, 101,102],
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
		getDummyHourData_3()
		hourUserDataA_3.push(hourDataA_3.pop());
		hourUserDataB_3.push(hourDataB_3.pop());
		if (hourUserDataB_3.length > 30) {
			hourUserDataA_3.shift();
			hourUserDataB_3.shift();
		}
		console.log(hourUserDataA_3);
		console.log(hourUserDataB_3);
		chart.update();
		setTimeout(updateChart, 7200000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_3() {
	try {
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const districtId = sessionStorage.getItem("districtId") || "1";
		const cityId = sessionStorage.getItem("cityId") || "1";
		if(districtId == 2 && cityId == 7) {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=3600`;
		} else {
			var apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${7}&timeInterval=3600`;
		}

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		hourDataA_3 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_3 = barChatData.data.map((x) => x.a);
		hourDataA_3 = hourDataA_3.slice(0, 21);
		hourDataB_3 = hourDataB_3.slice(0, 21);

		if (hourUserDataA_3.length == 0 && hourUserDataB_3.length == 0) {
			hourUserDataA_3 = hourDataA_3;
			hourUserDataB_3 = hourDataB_3;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		hourUserDataA_3 = [1,2,3,4,5];
		hourUserDataB_3 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()
