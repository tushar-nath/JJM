var userDataC = [],
	userDataA = [],
	userDataB = [];

async function dummyChart() {
	await getDummyData();

	const ctx = document.getElementById("myChart-1").getContext("2d");

	const chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: userDataC,
			datasets: [
				{
					label: "Label-1",
					backgroundColor: "blue",
					borderColor: "rgb(255, 99, 132)",
					data: userDataA,
				},
				{
					label: "Label-2",
					backgroundColor: "pink",
					borderColor: "rgb(255, 99, 132)",
					data: userDataB,
				},
			],
		},

		// Configuration options go here
		options: {
			tooltips: {
				mode: "index",
			},
		},
	});
}

dummyChart();

//Fetch Data from API

async function getDummyData() {
	const apiUrl = "https://jjmendpoint.free.beeceptor.com/data";

	const response = await fetch(apiUrl);
	const barChatData = await response.json();

	const dataA = barChatData.data.map((x) => x.a);
	console.log(dataA);
	const dataB = barChatData.data.map((x) => x.b);
	const dataC = barChatData.data.map((x) => x.c);

	userDataA = dataA;
	userDataB = dataB;
	userDataC = dataC;
}
