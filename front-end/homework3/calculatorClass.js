class Calculator {

    constructor() {
        this.formula = "";
        this.number = "0";
    }

    input(value, option) {
        switch(option) {
            case "number":
                if (this.number === "0") {
                    this.number = value;
                } else {
                    this.number += value;   
                }
                break;
            case "operator":
                if (this.number != "0") this.formula += this.number;
                this.formula += value;
                this.number = "0";
                break;
            default:
                console.log("[error] unsupported option: " + option);
                break;
        }
        return {
            formula: this.formula,
            number: this.number
        };
    }

    calc() {
        let result = {
            formula: "",
            number: "0"
        };
        try {
            if (this.number != "0") result.formula = this.formula + this.number;
            result.number = String(eval(result.formula));
            this.formula = result.number;
            this.number = "0";
        } catch(e) {
            result.formula = e.message;
            result.number = "ERROR";
        }
        return result;
    }

    erase() {
        this.number = "0";
        return {
            formula: this.formula,
            number: this.number
        }
    }

    clean() {
        this.formula = "";
        this.number = "0";
        return {
            formula: this.formula,
            number: this.number
        }
    }

    delete() {
        this.number = this.number.substring(0, this.number.length - 1);
        if (this.number.length === 0) {
            this.number = "0";
        }
        return {
            formula: this.formula,
            number: this.number
        }
    }

    unary() {
        if (this.number[0] === "-") {
            this.number = this.number.substring(1);
        } else {
            this.number = "-" + this.number;
        }
        return {
            formula: this.formula,
            number: this.number
        }
    }

    initialize() {
        this.formula = "";
        this.number = "0";
    }
}