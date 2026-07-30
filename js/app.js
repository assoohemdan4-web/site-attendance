let saved =
localStorage.getItem(
"attendanceData"
);


if(saved){

attendanceData =
JSON.parse(saved);

}
