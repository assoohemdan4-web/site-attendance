/* ==========================================
   Attendance Management System
   rules.js
========================================== */

"use strict";

/* ==========================================
   هل اليوم إجازة؟
========================================== */

function isWeekend(day){

    return CONFIG.WEEKEND.includes(day);

}

/* ==========================================
   الحصول على قواعد اليوم
========================================== */

function getWorkingRule(day){

    if(isWeekend(day)){

        return{

            weekend:true,

            start:null,

            end:null,

            delayAllowance:0

        };

    }

    const rule = CONFIG.WORKING_HOURS[day];

    return{

        weekend:false,

        start:rule.start,

        end:rule.end,

        delayAllowance:getDelayAllowance(day)

    };

}

/* ==========================================
   سماح التأخير
========================================== */

function getDelayAllowance(day){

    // السبت ساعة سماح

    if(day==="Saturday"){

        return 60;

    }

    return 0;

}

/* ==========================================
   بداية الإضافي الصباحي
========================================== */

function getMorningOTStart(){

    return CONFIG.MORNING_OT.start;

}

/* ==========================================
   نهاية الإضافي المسائي
========================================== */

function getEveningOTEnd(){

    return CONFIG.EVENING_OT.end;

}

/* ==========================================
   هل يوجد سماح تأخير؟
========================================== */

function hasDelayAllowance(day){

    return getDelayAllowance(day)>0;

}

console.log("✅ rules.js Loaded");
