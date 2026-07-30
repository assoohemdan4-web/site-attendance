Enter/* ==========================================
   Attendance Management System
   utils.js
========================================== */

"use strict";

/* ==========================================
   تحويل أي قيمة إلى String
========================================== */

function safeString(value){

    if(value === null || value === undefined){

        return "";

    }

    return String(value).trim();

}

/* ==========================================
   تحويل Excel Date إلى JavaScript Date
========================================== */

function excelToDate(value){

    if(value === "" || value === null){

        return null;

    }

    // لو القيمة Date بالفعل
    if(value instanceof Date){

        return value;

    }

    // لو القيمة رقم Excel
    if(typeof value === "number"){

        return XLSX.SSF.parse_date_code(value)
            ? new Date(Math.round((value - 25569) * 86400 * 1000))
            : null;

    }

    // لو القيمة نص
    const d = new Date(value);

    if(isNaN(d)){

        return null;

    }

    return d;

}

/* ==========================================
   DD/MM/YYYY
========================================== */

function formatDate(date){

    const day = String(date.getDate()).padStart(2,"0");

    const month = String(date.getMonth()+1).padStart(2,"0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

}

/* ==========================================
   YYYY-MM-DD
========================================== */

function formatISODate(date){

    const day = String(date.getDate()).padStart(2,"0");

    const month = String(date.getMonth()+1).padStart(2,"0");

    const year = date.getFullYear();

    return `${year}-${month}-${day}`;

}

/* ==========================================
   HH:MM
========================================== */

function formatTime(date){

    const hour = String(date.getHours()).padStart(2,"0");

    const minute = String(date.getMinutes()).padStart(2,"0");

    return `${hour}:${minute}`;

}

/* ==========================================
   اسم اليوم
========================================== */

function getDayName(date){

    return CONFIG.DAYS[date.getDay()];

}

/* ==========================================
   الوقت إلى دقائق
========================================== */

function timeToMinutes(time){

    const parts = time.split(":");

    return Number(parts[0])*60 + Number(parts[1]);

}

/* ==========================================
   دقائق إلى HH:MM
========================================== */

function minutesToTime(minutes){

    const h = Math.floor(minutes/60);

    const m = minutes%60;

    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;

}

/* ==========================================
   الفرق بين وقتين
========================================== */

function diffMinutes(start,end){

    return timeToMinutes(end)-timeToMinutes(start);

}

console.log("✅ utils.js Loaded");
