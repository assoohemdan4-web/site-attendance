/* ==========================================
   Attendance Management System
   report.js
========================================== */

"use strict";

/* ==========================================
   عرض بيانات الموظف
========================================== */

function renderEmployee(employee, report){

    if(!employee){

        hideEmployeeCard();

        showEmptyTable();

        return;

    }

    document.getElementById("employeeCard").style.display="block";

    document.getElementById("empId").textContent=
        employee.employeeId;

    document.getElementById("empName").textContent=
        employee.employeeName;

    document.getElementById("empDays").textContent=
        report.length;

    document.getElementById("empOvertime").textContent=
        calculateTotalOT(report);

    document.getElementById("empDelay").textContent=
        calculateTotalDelay(report);

    renderTable(report);

}

/* ==========================================
   إنشاء الجدول
========================================== */

function renderTable(report){

    const body =
        document.getElementById("reportBody");

    body.innerHTML="";

    if(report.length===0){

        showEmptyTable();

        return;

    }

    report.forEach(day=>{

        body.innerHTML += createRow(day);

    });

}

/* ==========================================
   صف واحد
========================================== */

function createRow(day){

    return `

<tr>

<td>${day.date}</td>

<td>${day.day}</td>

<td>${day.firstIn}</td>

<td>${day.lastOut}</td>

<td>${day.delay}</td>

<td>${day.earlyLeave}</td>

<td>${day.morningOT}</td>

<td>${day.eveningOT}</td>

<td>${day.workingHours}</td>

</tr>

`;

}

/* ==========================================
   جدول فارغ
========================================== */

function showEmptyTable(){

    document.getElementById("reportBody").innerHTML=

    `
    <tr>

        <td colspan="9">

            No Attendance Data

        </td>

    </tr>

    `;

}

/* ==========================================
   إخفاء بطاقة الموظف
========================================== */

function hideEmployeeCard(){

    document.getElementById("employeeCard").style.display="none";

}

/* ==========================================
   إجمالي التأخير
========================================== */

function calculateTotalDelay(report){

    let total=0;

    report.forEach(day=>{

        total += timeToMinutes(day.delay);

    });

    return minutesToTime(total);

}

/* ==========================================
   إجمالي الإضافي
========================================== */

function calculateTotalOT(report){

    let total=0;

    report.forEach(day=>{

        total +=
            timeToMinutes(day.morningOT);

        total +=
            timeToMinutes(day.eveningOT);

    });

    return minutesToTime(total);

}

console.log("✅ report.js Loaded");
