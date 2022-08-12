var userDataA = [], userDataB = [];

async function dummyChart() {
	await getDummyData();

	const ctx = document.getElementById("myChart-2").getContext("2d");

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
		const apiUrl = "https://mocki.io/v1/be7d9952-7760-44ca-a5ac-8968e2040268";

		const response = await fetch(apiUrl);
		const barChatData = await response.json();

		const dataA = barChatData.data.map((x) => x.a);
		console.log(dataA);
		const dataB = barChatData.data.map((x) => x.b);

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