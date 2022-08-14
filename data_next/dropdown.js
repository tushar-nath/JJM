var dropdown4 = document.getElementById("rc-dropdown");
var dropdown5 = document.getElementById("lc-dropdown");
var dropdown6 = document.getElementById("dlc-dropdown");

dropdown4.value = sessionStorage.getItem('timeinterval4');
dropdown5.value = sessionStorage.getItem('timeinterval5');
dropdown6.value = sessionStorage.getItem('timeinterval6');


function dropDownChange4() {
    var rc_dropdown_value = dropdown4.options[dropdown4.selectedIndex].value;
    sessionStorage.timeinterval4 = rc_dropdown_value;
    window.location.reload();
}

function dropDownChange5() {
    var lc_dropdown_value = dropdown5.options[dropdown5.selectedIndex].value;
    sessionStorage.timeinterval5 = lc_dropdown_value;
    window.location.reload();
}

function dropDownChange6() {
    var dlc_dropdown_value = dropdown6.options[dropdown6.selectedIndex].value;
    sessionStorage.timeinterval6 = dlc_dropdown_value;
    window.location.reload();
}

