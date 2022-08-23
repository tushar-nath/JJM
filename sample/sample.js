function login() {
	$.getJSON("json/login.json", function (jsdata) {
		json = JSON.parse(jsdata);
		user = i1.value;
		password = i2.value;

		if (json.user[password]) {
			console.log("success");
		}
	});
}
