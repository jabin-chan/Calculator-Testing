import React, { useState } from "react";

import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
} from "./calculator_first5.js";

import {
  squareRoot,
  power,
  factorial,
  reciprocal,
  signChange,
} from "./last5.js";

import { HackerBackground } from "./components/ui/hacker-background.jsx";

import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // -----------------------------
  // Number input
  // -----------------------------
  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
      return;
    }

    setDisplay((prev) => {
      if (prev === "0") return String(num);
      return prev + String(num);
    });
  };

  // -----------------------------
  // Decimal
  // -----------------------------
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  // -----------------------------
  // Clear
  // -----------------------------
  const clear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const deleteLast = () => {
    if (waitingForOperand) return;

    setDisplay((prev) => {
      if (prev.length <= 1) return "0";

      return prev.slice(0, -1);
    });
  };

  // -----------------------------
  // Calculate
  // -----------------------------
  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return add(a, b);

      case "-":
        return subtract(a, b);

      case "×":
        return multiply(a, b);

      case "÷":
        return divide(a, b);

      case "%":
        return percentage(a, b);

      default:
        return b;
    }
  };

  // -----------------------------
  // Operator
  // -----------------------------
  const chooseOperator = (nextOperator) => {
    const inputValue = Number(display);

    if (previous === null) {
      setPrevious(inputValue);
    } else if (operator) {
      const result = calculate(previous, inputValue, operator);

      if (!Number.isFinite(result)) {
        setDisplay("ERROR");
        setPrevious(null);
        setOperator(null);
        return;
      }

      setDisplay(String(result));
      setPrevious(result);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  // -----------------------------
  // Equals
  // -----------------------------
  const equals = () => {
    if (operator === null || previous === null) return;

    const currentValue = Number(display);

    const result = calculate(previous, currentValue, operator);

    if (!Number.isFinite(result)) {
      setDisplay("ERROR");
    } else {
      setDisplay(String(result));
    }

    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // -----------------------------
  // Scientific functions
  // -----------------------------
  const scientific = (type) => {
    const value = Number(display);

    let result;

    try {
      switch (type) {
        case "sqrt":
          result = squareRoot(value);
          break;

        case "square":
          result = power(value, 2);
          break;

        case "power":
          // xʸ will use the normal operator flow
          chooseOperator("power");
          return;

        case "factorial":
          result = factorial(value);
          break;

        case "reciprocal":
          result = reciprocal(value);
          break;

        case "sign":
          result = signChange(value);
          break;

        default:
          return;
      }

      if (!Number.isFinite(result)) {
        setDisplay("ERROR");
        return;
      }

      setDisplay(String(result));
    } catch {
      setDisplay("ERROR");
    }
  };

  // Special power handling
  const handlePowerEquals = () => {
    if (operator !== "power" || previous === null) {
      return;
    }

    const currentValue = Number(display);

    const result = Math.pow(previous, currentValue);

    if (!Number.isFinite(result)) {
      setDisplay("ERROR");
    } else {
      setDisplay(String(result));
    }

    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // -----------------------------
  // Button handler
  // -----------------------------
  const handleButton = (value) => {
    // Numbers
    if (!isNaN(value)) {
      inputNumber(value);
      return;
    }

    // Decimal
    if (value === ".") {
      inputDecimal();
      return;
    }

    // Clear
    if (value === "AC") {
      clear();
      return;
    }

    // Delete
    if (value === "DEL") {
      deleteLast();
      return;
    }

    // Sign
    if (value === "±") {
      scientific("sign");
      return;
    }

    // Scientific
    if (value === "√") {
      scientific("sqrt");
      return;
    }

    if (value === "x²") {
      scientific("square");
      return;
    }

    if (value === "xʸ") {
      scientific("power");
      return;
    }

    if (value === "1/x") {
      scientific("reciprocal");
      return;
    }

    if (value === "x!") {
      scientific("factorial");
      return;
    }

    // Equals
    if (value === "=") {
      if (operator === "power") {
        handlePowerEquals();
      } else {
        equals();
      }

      return;
    }

    // Operators
    if (["+", "-", "×", "÷", "%"].includes(value)) {
      chooseOperator(value);
    }
  };

  const buttons = [
    { label: "AC", type: "danger" },
    { label: "DEL", type: "warning" },
    { label: "%", type: "operator" },
    { label: "÷", type: "operator" },

    { label: "√", type: "scientific" },
    { label: "x²", type: "scientific" },
    { label: "xʸ", type: "scientific" },
    { label: "1/x", type: "scientific" },

    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operator" },

    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },

    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },

    { label: "±", type: "scientific" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "=", type: "equals" },

    { label: "x!", type: "scientific" },
  ];

  return (
    <main className="calculator-page">
      <HackerBackground />

      <section className="calculator-shell">

        {/* LEFT: BUTTONS */}
        <div className="calculator-controls">

          <div className="button-grid">
            {buttons.map((button) => (
              <button
                key={button.label}
                className={`calc-button ${button.type}`}
                onClick={() => handleButton(button.label)}
              >
                {button.label}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT: DISPLAY */}
        <div className="display-panel">

          <div className="display-top">
            <span>CALC://CORE</span>

            <span className="status">
              <i></i>
              READY
            </span>
          </div>

          <div className="display-line"></div>

          <div className="expression">
            {previous !== null && (
              <>
                {previous} {operator}
              </>
            )}
          </div>

          <div className="display-value">
            <span className="cursor-symbol">&gt;</span>
            <span>{display}</span>
          </div>

          <div className="display-line bottom-line"></div>

          <div className="display-footer">
            <span>PROCESSING UNIT</span>
            <span>V1.0.0</span>
          </div>

        </div>

      </section>
    </main>
  );
}