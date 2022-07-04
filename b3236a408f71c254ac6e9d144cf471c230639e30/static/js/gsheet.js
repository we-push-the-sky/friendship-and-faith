const sheetId = '13OVk5vl9lJc7rcna-Vym-Xzh8mMYNGkGC81F2XmfGF8';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'user-data';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
 
const data = []
//document.addEventListener('DOMContentLoaded', init)
 
const output = document.querySelector('#msg-output');

 
function initGsheet() {

    fetch(url)
        .then(res => res.text())
        .then(rep => {
            output.innerHTML = "";
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log(rep)
 
            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            });

            output.appendChild(tr);
 
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            });

            processRows(data);
        })
}
  
function processRows(json) {
    
    while(output.childNodes.length > 1){
      output.removeChild(output.lastChild);
    }
    json.forEach((row) => {
 
        const tr = document.createElement('tr');
        const keys = Object.keys(row);
     
        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);
    })
}