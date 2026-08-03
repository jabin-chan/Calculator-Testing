// Square Root
export function squareRoot(num) {
    if (num < 0) {
        return "Error: Cannot calculate square root of a negative number.";
    }

    return Number(Math.sqrt(num).toFixed(6));
}

// Power
export function power(base, exponent) {
    return Number(Math.pow(base, exponent).toFixed(6));
}

// Factorial
export function factorial(num) {
    if (num < 0) {
        return "Error: Factorial is not defined for negative numbers.";
    }

    if (!Number.isInteger(num)) {
        return "Error: Factorial is only defined for integers.";
    }

    let result = 1;

    for (let i = 2; i <= num; i++) {
        result *= i;
    }

    return Number(result.toFixed(6));
}

// Reciprocal
export function reciprocal(num) {
    if (num === 0) {
        return "Error: Cannot divide by zero.";
    }

    return Number((1 / num).toFixed(6));
}

// Sign Change
export function signChange(num) {
    return Number((-num).toFixed(6));
}