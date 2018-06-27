function createRadioButton(sLabel, sName, sId){

    var input = document.createElement("input");
    input.type = "radio";
    input.id = sId;
    input.name = sName;
    var label = document.createElement("label");
    label.setAttribute("for", sLabel);
    label.innerText = sLabel;

    var div = document.createElement("div");
    div.appendChild(input);
    div.appendChild(label);

    return div;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateColors(iCount) {
    var aColors = [];
    if (!iCount){
        iCount = 1;
    }
    for(var i = 0; i < iCount ; i++){
        aColors.push(getRandomColor())
    }

    return aColors;
}