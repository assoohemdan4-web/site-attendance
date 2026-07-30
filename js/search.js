function searchEmployee(){


let data =
JSON.parse(
localStorage.getItem("attendanceData")
)
||
[];



let code =
document.getElementById(
"employeeCode"
).value;



let employee =
data.find(e=>

String(e.code)==String(code)

);



if(!employee){

alert("الموظف غير موجود");

return;

}



renderEmployee(employee);


}
