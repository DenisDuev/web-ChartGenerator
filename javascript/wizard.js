function visualizeColumns(oData) {
    var columns = oData[0];
    var fieldSet = document.getElementById("radioFieldset");
    for (var key in columns) {
        var radioBtn = createRadioButton(columns[key], "asd", key);
        fieldSet.appendChild(radioBtn);
    }
}

function getColumnNames(oData) {
    var aColumnNames = [];
    var columns = oData[0];
    var index = 0;
    for (var key in columns) {
        aColumnNames[index] = columns[key];
        index++;
    }
}

function getCheckedRadioKey(oData) {
    var columns = oData[0];
    for (var key in columns) {
        var input = document.getElementById(key);
        if (input.checked) {
            return key;
        }
    }
}

function getDataForColumn(oData, sColumn, iSize) {
    if (!iSize){
        iSize = oData.length;
    }
    var aData = [];
    for (var i = 1; i < oData.length && i <= iSize; i++) {
        var chunk = oData[i];
        var fNumber = parseFloat(chunk[sColumn].replace(",", "."));
        aData.push(fNumber);
    }

    return aData;
}

function changeSlider() {
    var sliderLabel = document.getElementById("sliderLabel");
    sliderLabel.innerText = document.getElementById("numberColumnsSlider").value;
}

function setMaxValueSlider(oData) {
    var slider = document.getElementById("numberColumnsSlider");
    slider.setAttribute("max",oData.length - 1);
    changeSlider();
}

function getNumberOfRows() {
    var input = document.getElementById("numberColumnsSlider");
    return parseInt(input.value);
}

var aTestData = [
    {
        "FIELD1": "Брой нишки",
        "FIELD2": "Тест 1",
        "FIELD3": "Тест 2",
        "FIELD4": "Тест 3",
        "FIELD5": "Средно време в miliseconds",
        "FIELD6": "Ускорение(S(p))",
        "FIELD7": " Ефективност (Е(р))"
    },
    {
        "FIELD1": "1",
        "FIELD2": "48870",
        "FIELD3": "48563",
        "FIELD4": "48636",
        "FIELD5": "48689,66667",
        "FIELD6": "1",
        "FIELD7": "1"
    },
    {
        "FIELD1": "2",
        "FIELD2": "25494",
        "FIELD3": "25459",
        "FIELD4": "25596",
        "FIELD5": "25516,33333",
        "FIELD6": "1,908176463",
        "FIELD7": "0,954088231"
    },
    {
        "FIELD1": "3",
        "FIELD2": "22256",
        "FIELD3": "22873",
        "FIELD4": "22013",
        "FIELD5": "22380,66667",
        "FIELD6": "2,175523517",
        "FIELD7": "0,725174506"
    },
    {
        "FIELD1": "4",
        "FIELD2": "20816",
        "FIELD3": "20330",
        "FIELD4": "20253",
        "FIELD5": "20466,33333",
        "FIELD6": "2,379012688",
        "FIELD7": "0,594753172"
    },
    {
        "FIELD1": "5",
        "FIELD2": "17492",
        "FIELD3": "17077",
        "FIELD4": "17495",
        "FIELD5": "17354,66667",
        "FIELD6": "2,805566226",
        "FIELD7": "0,561113245"
    },
    {
        "FIELD1": "6",
        "FIELD2": "15333",
        "FIELD3": "15208",
        "FIELD4": "15684",
        "FIELD5": "15408,33333",
        "FIELD6": "3,159956734",
        "FIELD7": "0,561113245"
    },
    {
        "FIELD1": "7",
        "FIELD2": "13175",
        "FIELD3": "13447",
        "FIELD4": "13156",
        "FIELD5": "13259,33333",
        "FIELD6": "3,672105185",
        "FIELD7": "0,526659456"
    },
    {
        "FIELD1": "8",
        "FIELD2": "11725",
        "FIELD3": "11755",
        "FIELD4": "11987",
        "FIELD5": "11822,33333",
        "FIELD6": "4,118448136",
        "FIELD7": "0,514806017"
    },
    {
        "FIELD1": "9",
        "FIELD2": "9253",
        "FIELD3": "9314",
        "FIELD4": "9170",
        "FIELD5": "9245,666667",
        "FIELD6": "5,266214804",
        "FIELD7": "0,585134978"
    },
    {
        "FIELD1": "10",
        "FIELD2": "8559",
        "FIELD3": "8186",
        "FIELD4": "8629",
        "FIELD5": "8458",
        "FIELD6": "5,756640656",
        "FIELD7": "0,575664066"
    },
    {
        "FIELD1": "11",
        "FIELD2": "7270",
        "FIELD3": "7669",
        "FIELD4": "7392",
        "FIELD5": "7443,666667",
        "FIELD6": "6,541086383",
        "FIELD7": "0,594644217"
    },
    {
        "FIELD1": "12",
        "FIELD2": "6700",
        "FIELD3": "6782",
        "FIELD4": "6602",
        "FIELD5": "6694,666667",
        "FIELD6": "7,272903801",
        "FIELD7": "0,606075317"
    },
    {
        "FIELD1": "13",
        "FIELD2": "6116",
        "FIELD3": "6009",
        "FIELD4": "6843",
        "FIELD5": "6322,666667",
        "FIELD6": "7,700811894",
        "FIELD7": "0,592370146"
    },
    {
        "FIELD1": "14",
        "FIELD2": "5864",
        "FIELD3": "5149",
        "FIELD4": "5883",
        "FIELD5": "5632",
        "FIELD6": "8,645182292",
        "FIELD7": "0,617513021"
    },
    {
        "FIELD1": "15",
        "FIELD2": "5337",
        "FIELD3": "5125",
        "FIELD4": "5092",
        "FIELD5": "5184,666667",
        "FIELD6": "9,361089109",
        "FIELD7": "0,626072607"
    },
    {
        "FIELD1": "16",
        "FIELD2": "5036",
        "FIELD3": "5393",
        "FIELD4": "5088",
        "FIELD5": "5172,333333",
        "FIELD6": "9,413481989",
        "FIELD7": "0,588342624"
    }
];

visualizeColumns(aTestData);
setMaxValueSlider(aTestData);

