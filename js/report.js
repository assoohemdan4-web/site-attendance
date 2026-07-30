function renderEmployee(emp){


let html = `

<div class="card">

<h2>
${emp.name}
</h2>


<p>
الكود: ${emp.code}
</p>


<p>
الوظيفة: ${emp.job}
</p>


<table>

<tr>
<th>
التاريخ
</th>

<th>
الوقت
</th>

</tr>


${

emp.records.map(r=>`

<tr>

<td>${r.date}</td>

<td>${r.time}</td>

</tr>

`).join("")

}


</table>


</div>

`;



document.getElementById(
"result"
).innerHTML=html;


}
