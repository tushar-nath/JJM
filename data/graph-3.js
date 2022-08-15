var userDataA = [], userDataB = [];

async function dummyChart() {
	await getDummyData();

	const ctx = document.getElementById("myChart-3").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: userDataA,
			datasets: [
				{
					fill: false,
					lineTension: 0,
      				backgroundColor: "rgba(19, 136, 8, 1)",
      				borderColor: "rgba(19, 136, 8, 1)",
					borderWidth: 1,
					data: userDataB,
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
				yAxes: [{
				ticks: { min: 0},
				}], 
			},
		},
	});
}

dummyChart();

//Fetch Data from API 


async function getDummyData() {
	try {
		const timeInterval3 = sessionStorage.getItem("timeinterval3") || "30";
		console.log(timeInterval3);
		const sensorId = sessionStorage.getItem("sensorId") || "1";
		const apiUrl = `http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=${sensorId}&timeInterval=${timeInterval3}`;
		console.log("This is Graph-3: ", apiUrl);

		const response = await fetch(apiUrl);
		const barChatData = await response.json();
		

		const dataA = barChatData.data.map((x) => (new Date(x.time)).toTimeString().slice(0, 8));

    	const dataB = barChatData.data.map((x) => x.x);

		userDataA = dataA;
		userDataB = dataB;
	}
	catch(err) {
		alert("No data available for Graph 2");
		userDataA = [1,2,3,4,5];
		userDataB = [0,0,0,0,0];
	}
}


// window.setInterval(getDummyData(), 30000);
