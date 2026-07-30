/**
 * Employee Search Module
 * مسؤول عن البحث عن الموظف وعرض تقريره
 */


function searchEmployee() {

    // جلب كود الموظف من مربع البحث
    const employeeCode = document
        .getElementById("employeeSearch")
        .value
        .trim();


    // التحقق من إدخال الكود
    if (!employeeCode) {

        alert("من فضلك أدخل كود الموظف");

        return;
    }


    // التأكد أن البيانات موجودة
    if (!window.attendanceData || attendanceData.length === 0) {

        alert("لا توجد بيانات حضور");

        return;
    }


    // البحث عن الموظف
    const employee = attendanceData.find(emp => {

        return String(emp.code) === String(employeeCode);

    });


    // لو الموظف غير موجود
    if (!employee) {

        alert("لم يتم العثور على الموظف");

        return;
    }


    // تحليل بيانات الموظف
    const analysis = analyzeEmployee(employee);


    // عرض التقرير
    renderEmployee(analysis);

}



// تشغيل البحث عند الضغط Enter
document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            const input = document.getElementById("employeeSearch");

            if (document.activeElement === input) {

                searchEmployee();

            }
        }

    }
);
