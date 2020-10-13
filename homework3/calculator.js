let power = false;
let formula = "";
let inputNumber = "";
let formulaDisplay = $("#formula");
let mainDisplay = $("#input");
let onOffButton = $("#onoff");

$("#onoff").on("click", function() {
    if (power === true) {
        power = false;
        formulaDisplay.text("formula");
        mainDisplay.text("NOT POWERED...");
        onOffButton.text("ON");
    } else {
        power = true;
        formulaDisplay.text("");
        mainDisplay.text("0");
        onOffButton.text("OFF");
        formula = "";
    }
});

$("#equal").on("click", function() {
    if (power != true) return;
    formula += inputNumber;
    inputNumber = "";
    formulaDisplay.text(formula);
    let value = eval(formula);
    if (value != undefined) {
        mainDisplay.text(value);
    } else {
        mainDisplay.text("formula is abnormal");
    }
});

$(".number").on("click", function() {
    if (power != true) return;
    let num = $(this).text()
    inputNumber += num;
    mainDisplay.text(inputNumber);
});

$(".operator").on("click", function() {
    if (power != true) return;
    let oper = $(this).text();
    formula += inputNumber;
    if (oper === "x") {
        formula += "*";
    } else {
        formula += oper;
    }
    inputNumber = "";
    formulaDisplay.text(formula);
    mainDisplay.text("0");
});

$("#erase").on("click", function() {
    if (power != true) return;
    mainDisplay.text("0");
    inputNumber = "";
});

$("#clean").on("click", function() {
    if (power != true) return;
    mainDisplay.text("0")
    inputNumber = "";
    formulaDisplay.text("");
    formula = "";
});

$("#delete").on("click", function() {
    if (power != true) return;
    inputNumber = inputNumber.substring(0, inputNumber.length - 1);
    if (inputNumber.length === 0) {
        mainDisplay.text("0");
    } else {
        mainDisplay.text(inputNumber);
    }
});

$("#unary").on("click", function() {
    if (power != true) return;
    if (inputNumber[0] === "-") {
        inputNumber = inputNumber.substring(1);
    } else {
        inputNumber = "-" + inputNumber;
    }
    mainDisplay.text(inputNumber);
});