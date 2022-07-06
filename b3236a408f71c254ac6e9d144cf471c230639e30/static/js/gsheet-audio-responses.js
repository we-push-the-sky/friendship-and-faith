//const sheetId = '13OVk5vl9lJc7rcna-Vym-Xzh8mMYNGkGC81F2XmfGF8';
//const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const secondSheetName = 'audio';
//const query = encodeURIComponent('Select *')
const secondUrl = `${base}&sheet=${secondSheetName}&tq=${query}`
 
const audioData = []
//document.addEventListener('DOMContentLoaded', init)
 
const secondOutput = document.querySelector('#audio-output');
//const loadingImg = document.createElement('img');
//loadingImg.src = 'static/media/Eclipse-1s-200px.svg'
 
function initAudioGsheet() {
    secondOutput.innerHTML = "";
    secondOutput.appendChild(loadingImg);
    fetch(secondUrl)
        .then(res => res.text())
        .then(rep => {

            secondOutput.innerHTML = "";
            audioData.length = 0;
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            const tr = document.createElement('div');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {

                if (heading.id) {
                    let column = heading.id;
                    colz.push(column);
                }
            });
            //output.appendChild(tr);
             
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {

                    if(rowData.c[ind].v !== "AudioUrl") {
                        row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                    }
                    
                  
                })
                audioData.push(row);
            });

            processAudioRows(audioData);
        })
}
  
function processAudioRows(json) {
    json.splice(0, 1)
    while(secondOutput.childNodes.length > 1){
      secondOutput.removeChild(secondOutput.lastChild);
    }

    json.forEach((row) => {
        
        const tr = document.createElement('div');
        const keys = Object.keys(row);
     
        keys.forEach((key) => {
            console.log(row[key])
            const td = document.createElement('iframe');
            var urlArray = row[key].split('/');
            urlArray[4] = "embed";
            td.src = urlArray.join('/');
            td.allow = "microphone";
            td.frameBorder = 0;
            td.style = "width: 100%; height: 240px;";
            td.width = "100%";
            td.height = "240";
            tr.appendChild(td);
        })
        secondOutput.appendChild(tr);
    })
}