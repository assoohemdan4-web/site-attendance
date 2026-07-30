// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const codeInput = document.getElementById('employeeCode');

    searchBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        if (!code) {
            alert('برجاء إدخال كود الموظف');
            return;
        }

        try {
            // 1. جلب البيانات
            const data = await AttendanceSearch.getRecords(code);
            // 2. عرض البيانات
            ReportGenerator.render(data, 'resultsContainer');
        } catch (error) {
            console.error(error);
            alert(CONFIG.MESSAGES.error);
        }
    });
});
