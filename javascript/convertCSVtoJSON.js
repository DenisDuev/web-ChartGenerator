
$ajax({
    type : "GET",
    url : "data.csv",
    dataType : "text",
    success : function convertCSVToJSON(csv) {
                let lines = csv.split("\n");
                let result = [];
                let headers = lines[0].split(",");

                for(let i = 1; i<=lines.length; i++){
                let obj = {};
                let currentLine = lines[i].split(",");

                    for(let j = 0; j < headers.length; j++){
                       obj[headers[j]] = currentLine[j];
                    }   

                    result.push(obj);
                }
                //JavaScript obj
                return JSON.stringify(result);
            }
        });