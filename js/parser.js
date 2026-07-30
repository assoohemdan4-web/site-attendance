/* ==========================================
   Attendance Management System
   parser.js
========================================== */

"use strict";

/* ==========================================
   Global Data
========================================== */

let attendanceData = {};

/* ==========================================
   Parse Attendance Sheet
========================================== */

function parseAttendanceSheet(sheet){

    attendanceData = {};

    const rows = XLSX.utils.sheet_to_json(sheet,{

        header:1,

        raw:true,

        defval:""

    });

    if(rows.length < 2){

        return attendanceData;

    }

    // رؤوس الأعمدة
    const headers = rows[0].map(h => safeString(h));

    const idIndex =
        headers.indexOf(CONFIG.COLUMNS.employeeId);

    const nameIndex =
        headers.indexOf(CONFIG.COLUMNS.employeeName);

    const dateIndex =
        headers.indexOf(CONFIG.COLUMNS.dateTime);

    if(idIndex === -1 ||
       nameIndex === -1 ||
       dateIndex === -1){

        alert("Required columns not found.");

        return attendanceData;

    }

    // قراءة البيانات
    for(let i=1;i<rows.length;i++){

        const row = rows[i];

        if(row.length===0) continue;

        const employeeId =
            safeString(row[idIndex]);

        if(employeeId==="") continue;

        const employeeName =
            safeString(row[nameIndex]);

        const dateObject =
            excelToDate(row[dateIndex]);

        if(!dateObject) continue;

        const isoDate =
            formatISODate(dateObject);

        const date =
            formatDate(dateObject);

        const time =
            formatTime(dateObject);

        const day =
            getDayName(dateObject);

        // إنشاء الموظف

        if(!attendanceData[employeeId]){

            attendanceData[employeeId]={

                employeeId:employeeId,

                employeeName:employeeName,

                records:{}

            };

        }

        // إنشاء اليوم

        if(!attendanceData[employeeId].records[isoDate]){

            attendanceData[employeeId].records[isoDate]={

                date:date,

                isoDate:isoDate,

                day:day,

                punches:[]

            };

        }

        // إضافة البصمة

        attendanceData[employeeId]
            .records[isoDate]
            .punches
            .push(time);

    }

    // ترتيب البصمات

    Object.values(attendanceData).forEach(employee=>{

        Object.values(employee.records).forEach(record=>{

            record.punches.sort((a,b)=>{

                return timeToMinutes(a)-timeToMinutes(b);

            });

        });

    });

    console.log(attendanceData);

    return attendanceData;

}

/* ==========================================
   Employees Count
========================================== */

function getEmployeesCount(){

    return Object.keys(attendanceData).length;

}

/* ==========================================
   Attendance Days Count
========================================== */

function getRecordsCount(){

    let total=0;

    Object.values(attendanceData).forEach(employee=>{

        total += Object.keys(employee.records).length;

    });

    return total;

}

/* ==========================================
   Search Employee
========================================== */

function getEmployee(employeeId){

    return attendanceData[employeeId] || null;

}

/* ==========================================
   Search By Name
========================================== */

function findEmployee(name){

    name = safeString(name).toLowerCase();

    return Object.values(attendanceData).find(emp=>{

        return emp.employeeName
            .toLowerCase()
            .includes(name);

    });

}

/* ==========================================
   Print Debug
========================================== */

function printAttendance(){

    console.table(attendanceData);

}

console.log("✅ parser.js Loaded");
