/**
 * Admin Module
 * مسؤول عن رفع ملف Excel وتجهيز بيانات الحضور
 */


function uploadAttendanceFile(event) {

    const file = event.target.files[0];


    // التحقق من وجود ملف
    if (!file) {

        alert("لم يتم اختيار ملف");

        return;
    }


    // قراءة ملف Excel
    const reader = new FileReader();


    reader.onload = function(e) {


        const data = new Uint8Array(e.target.result);


        // تحويل الملف إلى Workbook
        const workbook = XLSX.read(data, {
            type: "array"
        });



        // التأكد من وجود Sheet السحب
        const sheetName = "السحب";


        if (!workbook.Sheets[sheetName]) {

            alert("لم يتم العثور على شيت السحب");

            return;
        }



        // جلب الشيت
        const worksheet = workbook.Sheets[sheetName];



        // تحويل الشيت إلى بيانات خام
        const rawData = XLSX.utils.sheet_to_json(
            worksheet,
            {
                defval: ""
            }
        );



        // إرسال البيانات إلى Parser
        attendanceData = parseAttendanceSheet(rawData);



        console.log(
            "Attendance Loaded:",
            attendanceData
        );



        alert(
            `تم تحميل ${attendanceData.length} موظف بنجاح`
        );


        // تحديث الواجهة لو موجودة
        if (typeof refreshDashboard === "function") {

            refreshDashboard();

        }

    };



    reader.readAsArrayBuffer(file);

}
