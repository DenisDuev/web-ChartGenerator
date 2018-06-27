function convert(callBack) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            function convertCSVToJSON(csv) {
                let lines = csv.split("\n");
                let result = [];
                let headers = lines[0].split(",");

                for (let i = 0; i < lines.length; i++) {
                    let obj = {};
                    let currentLine = lines[i].split(",");
                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentLine[j];
                    }

                    result.push(obj);
                }
                //JavaScript obj
                return result;
            }
            var result = convertCSVToJSON(this.responseText);
            callBack(result);
        }
    };
    xhttp.open("GET", "testData/data.csv", false);
    xhttp.send();
}