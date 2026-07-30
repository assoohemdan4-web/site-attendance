/* ==========================================
   Attendance Management System
   config.js
========================================== */

"use strict";

const CONFIG = {

    // اسم الشيت الذي يحتوي على البصمات
    SHEET_NAME: "السحب",

    // أيام الأسبوع
    DAYS: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],

    // أيام الإجازة
    WEEKEND: [
        "Friday"
    ],

    // مواعيد العمل الرسمية
    WORKING_HOURS: {

        Sunday: {
            start: "08:00",
            end: "16:00"
        },

        Monday: {
            start: "08:00",
            end: "16:00"
        },

        Tuesday: {
            start: "08:00",
            end: "16:00"
        },

        Wednesday: {
            start: "08:00",
            end: "16:00"
        },

        Thursday: {
            start: "08:00",
            end: "14:00"
        },

        Saturday: {
            start: "09:00",
            end: "16:00"
        }

    },

    // الإضافي الصباحي
    MORNING_OT: {

        start: "07:00",

        end: "08:00"

    },

    // الإضافي المسائي
    EVENING_OT: {

        end: "17:00"

    },

    // أسماء الأعمدة داخل ملف البصمة
    COLUMNS: {

        employeeId: "EnrollNumber",

        employeeName: "Name",

        dateTime: "Date/Time"

    }

};

console.log("✅ config.js Loaded");
