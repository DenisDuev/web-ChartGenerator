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