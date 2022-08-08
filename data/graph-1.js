var userDataA = [], userDataB = [];

async function dummyChart() {
	await getDummyData();

	const ctx = document.getElementById("myChart-1").getContext("2d");

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
		},
	});
}

dummyChart();

//Fetch Data from API

async function getDummyData() {
	const apiUrl = "https://mocki.io/v1/e5430db8-d183-4682-8c18-bd27dc749ccc";

	const response = await fetch(apiUrl);
	const barChatData = await response.json();

	const dataA = barChatData.data.map((x) => x.a);
	console.log(dataA);
	const dataB = barChatData.data.map((x) => x.b);

	userDataA = dataA;
	userDataB = dataB;
}
