// Square Root
function squareRoot(num) {
    if (num < 0) {
        return "Error: Cannot calculate square root of a negative number.";
    }
    return Math.sqrt(num);
}

// Power
function power(base, exponent) {
    return Math.pow(base, exponent);
}

// Factorial
function factorial(num) {
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

    return result;
}

// Reciprocal
function reciprocal(num) {
    if (num === 0) {
        return "Error: Cannot divide by zero.";
    }

    return 1 / num;
}

// Sign Change
function signChange(num) {
    return -num;
}

module.exports = {
    squareRoot,
    power,
    factorial,
    reciprocal,
    signChange
};