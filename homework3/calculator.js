let power = false;
let formulaDisplay = $("#formula");
let mainDisplay = $("#input");
let onOffButton = $("#onoff");
let calculator = new Calculator();

$("#onoff").on("click", function() {
    if (power === true) {
        power = false;
        formulaDisplay.text("formula");
        mainDisplay.text("NOT POWERED...");
        onOffButton.text("ON");
        calculator.initialize();
    } else {
        power = true;
        formulaDisplay.text("");
        mainDisplay.text("0");
        onOffButton.text("OFF");
    }
});

$("#equal").on("click", function() {
    if (power != true) return;
    let result = calculator.calc();
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$(".number").on("click", function() {
    if (power != true) return;
    let num = $(this).text()
    let result = calculator.input(num, "number");
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$(".operator").on("click", function() {
    if (power != true) return;
    let oper = ($(this).text() === "x") ? "*" : $(this).text();
    let result = calculator.input(oper, "operator");
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$("#erase").on("click", function() {
    if (power != true) return;
    let result = calculator.erase();
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$("#clean").on("click", function() {
    if (power != true) return;
    let result = calculator.clean();
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$("#delete").on("click", function() {
    if (power != true) return;
    let result = calculator.delete();
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});

$("#unary").on("click", function() {
    if (power != true) return;
    let result = calculator.unary();
    formulaDisplay.text(result.formula);
    mainDisplay.text(result.number);
});