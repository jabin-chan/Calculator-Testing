// 1. Addition
export function add(a, b) {
    return Number((a + b).toFixed(6));
}

// 2. Subtraction
export function subtract(a, b) {
    return Number((a - b).toFixed(6));
}

// 3. Multiplication
export function multiply(a, b) {
    return Number((a * b).toFixed(6));
}

// 4. Division
export function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }

    return Number((a / b).toFixed(6));
}

// 5. Percentage
export function percentage(a) {
    return Number((a / 100).toFixed(6));
}