let loadedData = {}
jQuery.getJSON('./data.json', function(data) {
    console.log(data);
    // get local storage data named sensor id
    const sensorId = sessionStorage.getItem("sensorId") || "0";
    console.log(sensorId);
    loadedData = data[sensorId-1];
    afterLoaded();
}).fail(function() {
    console.log('error');
}).always(function() {
    console.log('complete');
})

function afterLoaded(){
    const block_data = document.getElementById('block_data');
    const district_data = document.getElementById('district_data');
    const village_data = document.getElementById('village_data');
    const panchayat_data = document.getElementById('panchayat_data');
    const inhab_data = document.getElementById('inhab_data');
    const served_data = document.getElementById('served_data');
    const scheme_data = document.getElementById('scheme_data');
    const year_data = document.getElementById('year_data');
    const supervisor_data = document.getElementById('supervisor_data');

    console.log(loadedData);
    block_data.innerHTML = "BLOCK : " + loadedData['Block'].toUpperCase();
    district_data.innerHTML = "DISTRICT : " + loadedData['District'].toUpperCase();
    village_data.innerHTML = "VILLAGE : " + loadedData['Village'].toUpperCase();
    panchayat_data.innerHTML = "PANCHAYAT : " + loadedData['Panchayat'].toUpperCase();
    inhab_data.innerHTML = "NO OF INHABITANTS: : " + loadedData['Inhabitants'].toUpperCase();
    served_data.innerHTML = "POPULATION SERVED THROUGH SCHEME : " + loadedData['Served'].toUpperCase();
    scheme_data.innerHTML = "SCHEME : " + loadedData['Scheme'].toUpperCase();
    year_data.innerHTML = "YEAR OF COMMISSION: " + loadedData['Year'].toUpperCase();
    supervisor_data.innerHTML = "SUPERVISOR NAME : : " + loadedData['Supervisor'].toUpperCase();
}