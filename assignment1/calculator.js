        // const numberButtons = document.querySelectorAll(".number_button");
        // const data = {
        //   runningSum: "",
        // };

        // function updateView(elementId) {
        //   document.getElementById(elementId).textContent = data.runningSum;
        //   console.log("updating view", data.runningSum);
        // }

        // function updateRunningSum(value) {
        //   data.runningSum += value;
        //   updateView("runningSum");
        // }

        // numberButtons.forEach((button) => {
        //   button.addEventListener("click", (e) => {
        //     updateRunningSum(e.target.textContent);
        //   });
        // });


        const numbersArr = Array.from(document.getElementsByClassName("number"));
        const operatorsArr = Array.from(document.getElementsByClassName("operator"));
        const parenthesisArr = Array.from(document.getElementsByClassName("parenthesis"));
        const decimalArr = Array.from(document.getElementsByClassName("decimal"));
        const equalsArr = Array.from(document.getElementsByClassName("equals"));
        const clearArr = Array.from(document.getElementsByClassName("clear"));
        const numberStrs = "0123456789".split("");

        const data = {
        displayString: "0",
        isResult: false,

        appendStringNum: (newChar) => {
            if (data.isResult) {
            data.displayString = newChar === '.' ? '0.' : newChar;
            data.isResult = false;
            data.updateDisplay();
            return;
            }

            if (newChar === '.') {
            const parts = data.displayString.split(/[\+\-\*\/\(\)]/);
            const lastNumber = parts[parts.length - 1];
            
            if (lastNumber.includes('.')) return;
            if (lastNumber === '') {
                data.displayString += '0.';
            } else {
                data.displayString += '.';
            }
            } else {
            if (data.displayString === "0") {
                data.displayString = "";
            }
            data.displayString += newChar;
            }
            data.updateDisplay();
        },

        appendStringOperator: (newChar) => {
            if (numberStrs.includes(data.displayString.slice(-1)) || data.displayString.slice(-1) === ")") {
            data.displayString += newChar;
            data.isResult = false;
            data.updateDisplay();
            }
        },

        appendStringParenthesis: (newChar) => {
            if (newChar === ")") {
            if (data.displayString.split("(").length <= data.displayString.split(")").length) return;
            if (operatorsArr.map(o => o.innerText).includes(data.displayString.slice(-1))) return;
            }
            
            if (data.displayString === "0") {
            data.displayString = newChar;
            } else {
            data.displayString += newChar;
            }
            data.isResult = false;
            data.updateDisplay();
        },

        updateDisplay: () => {
        const display = document.getElementById("display");
        display.innerText = data.displayString;
        },


        evaluate: () => {
            try {
            const result = eval(data.displayString);
            data.displayString = Number.isInteger(result) ? result.toString() : result.toFixed(4);
            data.isResult = true;
            } catch (error) {
            data.displayString = "Error";
            setTimeout(() => {
                data.displayString = "0";
                data.updateDisplay();
            }, 1000);
            }
            data.updateDisplay();
        },

        clear: () => {
            data.displayString = "0";
            data.isResult = false;
            data.updateDisplay();
        },
        };

/*
        const display = document.getElementById("display");
        display.innerText = data.displayString;

        numbersArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
            data.appendStringNum(elem.innerText);
        });
        });

        operatorsArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
        data.appendStringOperator(elem.innerText);
        });
        });

        parenthesisArr.map((elem, i) => {
        elem.addEventListener("click", (evt) => {
        data.appendStringParenthesis(elem.innerText);
        });
        });
*/

        document.getElementById("display").textContent = data.displayString;
        numbersArr.map(elem => {
        elem.addEventListener("click", () => data.appendStringNum(elem.innerText));
        });

        operatorsArr.map(elem => {
        elem.addEventListener("click", () => data.appendStringOperator(elem.innerText));
        });

        parenthesisArr.map(elem => {
        elem.addEventListener("click", () => data.appendStringParenthesis(elem.innerText));
        });

        decimalArr.map(elem => {
        elem.addEventListener("click", () => data.appendStringNum(elem.innerText));
        });

        equalsArr.map(elem => {
        elem.addEventListener("click", () => data.evaluate());
        });

        clearArr.map(elem => {
        elem.addEventListener("click", () => data.clear());
        });