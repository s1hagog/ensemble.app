// Function to check for Int safety
// Credits: https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

// Function to check for Float safety
// Credits: https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

module.exports = { isInt, isFloat };