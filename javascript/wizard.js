function visualizeColumns(oData) {
    var columns = oData[0];
    var fieldSet = document.getElementById("radioFieldset");
    for (var key in columns) {
        var radioBtn = createRadioButton(columns[key], "asd", key);
        fieldSet.appendChild(radioBtn);
    }
}

function visualizeCheckboxColumns(oData) {
    var columns = oData[0];
    var fieldSet = document.getElementById("radioFieldset");
    for (var key in columns) {
        var radioBtn = createCheckboxButton(columns[key], "check", key);
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