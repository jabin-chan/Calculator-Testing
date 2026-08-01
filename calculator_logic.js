// 1. Addition
function add(a, b) {
    return a + b;
}

// 2. Subtraction
function subtract(a, b) {
    return a - b;
}

// 3. Multiplication
function multiply(a, b) {
    return a * b;
}

// 4. Division
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a / b;
}

// 5. Percentage
function percentage(a) {
    return a / 100;
}