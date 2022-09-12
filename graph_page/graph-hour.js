var hourUserDataA_1 = [], hourUserDataB_1 = [];
var hourDataA_1, hourDataB_1;

async function dummyChart() {
	await getDummyHourData_1();

	const ctx = document.getElementById("myChart-4").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: hourUserDataA_1,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "#138808",
      				borderColor: "#138808",
					borderWidth: 1,
					data: [7.41, 7.52, 7.53, 7.61, 7.77, 7.81, 7.83, 7.48, 7.76, 7.69, 7.41, 7.52, 7.53, 7.61, 7.77, 7.81, 7.83, 7.48, 7.76, 7.69, 7.32],
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
					labelString: 'pH Level'
				  }
				}], 
			},
		},
	});
	function updateChart() {
		getDummyHourData_1()
		hourUserDataA_1.push(hourDataA_1.pop());
		hourUserDataB_1.push(hourDataB_1.pop());
		if (hourUserDataB_1.length > 30) {
			hourUserDataA_1.shift();
			hourUserDataB_1.shift();
		}
		console.log(hourUserDataA_1);
		console.log(hourUserDataB_1);
		chart.update();
		setTimeout(updateChart, 600000);
	} 

	updateChart();
}

dummyChart();

//Fetch Data from API

async function getDummyHourData_1() {
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
		

		hourDataA_1 = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	hourDataB_1 = barChatData.data.map((x) => x.x);
		console.log("This is horDatB: ", hourDataB_1);
		hourDataA_1 = hourDataA_1.slice(0, 21);
		hourDataB_1 = hourDataB_1.slice(0, 21);

		if (hourUserDataA_1.length == 0 && hourUserDataB_1.length == 0) {
			hourUserDataA_1 = hourDataA_1;
			hourUserDataB_1 = hourDataB_1;
		}
	}
	catch(err) {
		// alert("No data available for Graph 2");
		hourUserDataA_1 = [1,2,3,4,5];
		hourUserDataB_1 = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData()