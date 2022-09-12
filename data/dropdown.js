var dropdown = document.getElementById("rc-dropdown");
var dropdown2 = document.getElementById("lc-dropdown");
var dropdown3 = document.getElementById("dlc-dropdown");

dropdown.value = sessionStorage.getItem('timeinterval1') || "30";
dropdown2.value = sessionStorage.getItem('timeinterval2') || "30";
dropdown3.value = sessionStorage.getItem('timeinterval3') || "30";


function dropDownChange1() {
    var rc_dropdown_value = dropdown.options[dropdown.selectedIndex].value;
    sessionStorage.timeinterval1 = rc_dropdown_value;
    window.location.reload();
}

function dropDownChange2() {
    var lc_dropdown_value = dropdown2.options[dropdown2.selectedIndex].value;
    sessionStorage.timeinterval2 = lc_dropdown_value;
    window.location.reload();
}

function dropDownChange3() {
    var dlc_dropdown_value = dropdown3.options[dropdown3.selectedIndex].value;
    sessionStorage.timeinterval3 = dlc_dropdown_value;
    window.location.reload();
}

