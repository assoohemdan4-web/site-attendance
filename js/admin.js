// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    const processBtn = document.getElementById('processBtn');
    const fileInput = document.getElementById('attendanceFile');
    const statusMsg = document.getElementById('statusMessage');

    processBtn.addEventListener('click', async () => {
        if (!fileInput.files.length) {
            statusMsg.textContent = "الرجاء اختيار ملف أولاً.";
            return;
        }

        try {
            statusMsg.textContent = "جاري المعالجة...";
            const rawData = await FileParser.parse(fileInput.files[0]);
            // سيتم إرسال rawData إلى Google Apps Script لاحقاً
            statusMsg.textContent = "تمت معالجة البيانات بنجاح!";
        } catch (error) {
            statusMsg.textContent = error;
        }
    });
});
