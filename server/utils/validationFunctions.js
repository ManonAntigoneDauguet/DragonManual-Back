/**
 * Check if a value is a number between two values
 * @param { * } value 
 * @param { Number } [maxValue] 
 * @param { Number } [minValue]
 * @returns { Boolean }
 */
module.exports.isCorrectNumber = (value, minValue = 0, maxValue = Math.min()) => {
    if (isNaN(value) || value === null || value > maxValue || value < minValue) {
        return false;
    }
    return true;
}


/**
 * Return an error if incorrect or empty field
 * @param { String } errorMessage as the message to return if error
 * @param { * } value 
 * @param { Object } regexp
 */
module.exports.checkFieldValid = (errorMessage, value, regexp) => {
    Reg = new RegExp(regexp);
    if (!value.trim() || !Reg.test(value)) {
        throw new Error(`Unvalid field : ${errorMessage}`);
    };
}