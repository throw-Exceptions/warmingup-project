let power = false;
let formula = "";
let inputNumber = "";
let element = document.getElementById("onoff");
element.addEventListener("click", function() {
    if (power === true) {
        power = false;
        let e = document.getElementById("input");
        e.textContent = "NOT POWERED...";
        e = document.getElementById("onoff");
        e.textContent = "ON";
        e = document.getElementById("formula");
        e.textContent = "formula";
    } else {
        power = true;
        let e = document.getElementById("input");
        e.textContent = "0";
        e = document.getElementById("onoff");
        e.textContent = "OFF";
        e = document.getElementById("formula");
        e.textContent = "";
        formula = "";
    }
});

element = document.getElementById("equal");
element.addEventListener("click", function() {
    if (power === true) {
        formula += inputNumber;
        inputNumber = "";
        let e = document.getElementById("formula");
        e.textContent = formula;
        let value = eval(formula);
        e = document.getElementById("input");
        if (value != undefined) {
            e.textContent = value;
        } else {
            e.textContent = "formula is abnormal";
        }
    }
});

element = document.getElementsByClassName("number");
for(let i = 0; i < element.length; i++) {
    let text = element[i].textContent;
    element[i].addEventListener("click", function() {
        if (power === true) {
            inputNumber += text;
            let e = document.getElementById("input");
            e.textContent = inputNumber;
        }
    });
}

element = document.getElementsByClassName("operator");
for(let i = 0; i < element.length; i++) {
    let text = element[i].textContent;
    element[i].addEventListener("click", function() {
        if (power === true) {
            formula += inputNumber;
            if (text === "x") {
                formula += "*";
            } else {
                formula += text;
            }
            inputNumber = "";
            let e = document.getElementById("formula");
            e.textContent = formula;
            e = document.getElementById("input");
            e.textContent = "0";
        }
    });
}

element = document.getElementById("erase");
element.addEventListener("click", function() {
    if (power === true) {
        let e = document.getElementById("input");
        e.textContent = "0";
        inputNumber = "";
    }
});

element = document.getElementById("clean");
element.addEventListener("click", function() {
    if (power === true) {
        let e = document.getElementById("input");
        e.textContent = "0";
        inputNumber = "";
        e = document.getElementById("formula");
        e.textContent = "";
        formula = "";
    }
});