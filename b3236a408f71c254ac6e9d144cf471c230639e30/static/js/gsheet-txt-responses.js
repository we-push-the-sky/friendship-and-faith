const sheetId = '13OVk5vl9lJc7rcna-Vym-Xzh8mMYNGkGC81F2XmfGF8';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Sheet1';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
 
const data = []
//document.addEventListener('DOMContentLoaded', init)
 
const output = document.querySelector('#msg-output');
const loadingImg = document.createElement('img');
loadingImg.src = 'static/media/Eclipse-1s-200px.svg'
 
function initGsheet() {
    output.innerHTML = "";
    output.appendChild(loadingImg);
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            output.innerHTML = "";
            data.length = 0;
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            const tr = document.createElement('div');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {

                if (heading.label && heading.label !== "Email" && heading.label !== "Name") {
                    let column = heading.label;
                    console.log(column)
                    colz.push(column);
                    const th = document.createElement('div');
                    th.innerText = column;
                    //tr.appendChild(th);
                }
            });
            //output.appendChild(tr);
 
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    console.log(ind, ind+2)
                    if(ind === 0){
                        row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                    } else {
                        row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].f : '';  
                    }
                  
                });
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
        
        const tr = document.createElement('div');
        const keys = Object.keys(row);
     
        keys.forEach((key) => {
            const td = document.createElement('div');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);
    })
}