function parseAttendanceSheet(
attendance,
employees
){


let result=[];



employees.forEach(emp=>{


let code =
String(
emp["الكود"] ||
emp["ID"] ||
""
);



let records =
attendance.filter(row=>

String(row.ID)==code

);



result.push({

code:code,

name:
emp["الاسم"] || "",


job:
emp["الوظيفة"] || "",


department:
emp["القسم"] || "",


records:records.map(r=>({

date:r["date"] || "",

time:r["time"] || ""

}))


});


});



return result;


}
