// js/report.js
class ReportGenerator {
    static render(records, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        container.classList.remove('hidden');

        if (!records || records.length === 0) {
            container.innerHTML = `<p>${CONFIG.MESSAGES.notFound}</p>`;
            return;
        }

        // إنشاء الجدول
        let html = `<table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
            <tr>
                <th>التاريخ</th>
                <th>وقت الدخول</th>
                <th>وقت الخروج</th>
                <th>الحالة</th>
            </tr>`;

        records.forEach(record => {
            html += `
            <tr>
                <td>${record.date}</td>
                <td>${record.checkIn}</td>
                <td>${record.checkOut}</td>
                <td>${record.status}</td>
            </tr>`;
        });

        html += `</table>`;
        container.innerHTML = html;
    }
}
