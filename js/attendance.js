/* ==========================================
   Attendance Management System
   attendance.js
   Part 1
========================================== */

"use strict";

/* ==========================================
   تحليل جميع أيام الموظف
========================================== */

function analyzeEmployee(employee){

    const report = [];

    const dates = Object.keys(employee.records).sort();

    dates.forEach(date=>{

        const dayRecord = employee.records[date];

        report.push(

            analyzeDay(dayRecord)

        );

    });

    return report;

}

/* ==========================================
   تحليل يوم واحد
========================================== */

function analyzeDay(record){

    const punches = [...record.punches];

    punches.sort((a,b)=>{

        return timeToMinutes(a)-timeToMinutes(b);

    });

    const firstIn =
        punches.length ? punches[0] : "";

    const lastOut =
        punches.length ? punches[punches.length-1] : "";

    const rule =
        getWorkingRule(record.day);

    const result = {

        date:record.date,

        isoDate:record.isoDate,

        day:record.day,

        punches:punches,

        firstIn:firstIn,

        lastOut:lastOut,

        startTime:rule.start,

        endTime:rule.end,

        isWeekend:rule.weekend,

        delay:"00:00",

        earlyLeave:"00:00",

        morningOT:"00:00",

        eveningOT:"00:00",

        workingHours:"00:00",

        status:"Absent"

    };

    // الجمعة

    if(rule.weekend){

        result.status="Weekend";

        return result;

    }

    // لا توجد بصمات

    if(punches.length===0){

        result.status="Absent";

        return result;

    }

    // سيتم الحساب في Part 2

    result.status="Present";

    return result;

}

/* ==========================================
   قواعد اليوم
========================================== */

function getWorkingRule(day){

    if(isWeekend(day)){

        return{

            weekend:true,

            start:null,

            end:null

        };

    }

    return{

        weekend:false,

        start:CONFIG.WORKING_HOURS[day].start,

        end:CONFIG.WORKING_HOURS[day].end

    };

}

/* ==========================================
   هل اليوم إجازة؟
========================================== */

function isWeekend(day){

    return CONFIG.WEEKEND.includes(day);

}

/* ==========================================
   Debug
========================================== */

function printEmployeeReport(report){

    console.table(report);

}

console.log("✅ attendance.js Part 1 Loaded");
/* ==========================================
   Attendance Management System
   attendance.js
   Part 2
========================================== */

/* ==========================================
   تحديث الحسابات اليومية
========================================== */

function finalizeAttendance(result){

    if(result.isWeekend){

        result.status = "Weekend";
        return result;

    }

    if(result.firstIn === "" || result.lastOut === ""){

        result.status = "Absent";
        return result;

    }

    result.delay =
        calculateDelay(result.firstIn, result.startTime);

    result.earlyLeave =
        calculateEarlyLeave(result.lastOut, result.endTime);

    result.morningOT =
        calculateMorningOT(result.firstIn, result.day);

    result.eveningOT =
        calculateEveningOT(result.lastOut, result.endTime);

    result.workingHours =
        calculateWorkingHours(result.firstIn, result.lastOut);

    if(result.delay !== "00:00"){

        result.status = "Late";

    }else{

        result.status = "Present";

    }

    return result;

}

/* ==========================================
   التأخير
========================================== */

function calculateDelay(firstIn,startTime){

    const delay =
        timeToMinutes(firstIn) -
        timeToMinutes(startTime);

    if(delay <= 0){

        return "00:00";

    }

    return minutesToTime(delay);

}

/* ==========================================
   الانصراف المبكر
========================================== */

function calculateEarlyLeave(lastOut,endTime){

    const early =
        timeToMinutes(endTime) -
        timeToMinutes(lastOut);

    if(early <= 0){

        return "00:00";

    }

    return minutesToTime(early);

}

/* ==========================================
   إضافي صباحي
========================================== */

function calculateMorningOT(firstIn,day){

    const workStart =
        getWorkingRule(day).start;

    const minTime =
        CONFIG.MORNING_OT.start;

    let start =
        timeToMinutes(firstIn);

    let min =
        timeToMinutes(minTime);

    let max =
        timeToMinutes(workStart);

    if(start >= max){

        return "00:00";

    }

    if(start < min){

        start = min;

    }

    return minutesToTime(max-start);

}

/* ==========================================
   إضافي مسائي
========================================== */

function calculateEveningOT(lastOut,endTime){

    const end =
        timeToMinutes(lastOut);

    const official =
        timeToMinutes(endTime);

    const max =
        timeToMinutes(CONFIG.EVENING_OT.end);

    if(end <= official){

        return "00:00";

    }

    const finish =
        Math.min(end,max);

    return minutesToTime(finish-official);

}

/* ==========================================
   ساعات العمل
========================================== */

function calculateWorkingHours(firstIn,lastOut){

    const minutes =
        timeToMinutes(lastOut)-
        timeToMinutes(firstIn);

    if(minutes<=0){

        return "00:00";

    }

    return minutesToTime(minutes);

}
