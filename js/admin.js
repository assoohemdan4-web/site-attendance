function uploadFile(event){


const file = event.target.files[0];


if(!file)return;



const reader = new FileReader();



reader.onload=function(e){


const workbook = XLSX.read(
new Uint8Array(e.target.result),
{
type:"array"
}
);



const attendanceSheet =
workbook.Sheets["السحب"];


const dataSheet =
workbook.Sheets["داتا"];



if(!attendanceSheet){

alert("لا يوجد شيت السحب");

return;

}



const attendanceRaw =
XLSX.utils.sheet_to_json(
attendanceSheet,
{
defval:""
}
);



const employeesRaw =
XLSX.utils.sheet_to_json(
dataSheet,
{
defval:""
}
);



attendanceData =
parseAttendanceSheet(
attendanceRaw,
employeesRaw
);



localStorage.setItem(
"attendanceData",
JSON.stringify(attendanceData)
);



alert(
"تم تحميل الملف بنجاح"
);



}



reader.readAsArrayBuffer(file);



}
