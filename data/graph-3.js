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
      				backgroundColor: "rgba(0,0,255,1.0)",
      				borderColor: "rgba(0,0,255,0.1)",
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

setInterval(dummyChart(),5000);

//Fetch Data from API

async function getDummyData() {
	try {
		const apiUrl = "http://api-env.eba-2mhqamyx.us-east-1.elasticbeanstalk.com/fetch?api_key=tPmAT5Ab3j7F9&sensor=1&timeInterval=30";

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
