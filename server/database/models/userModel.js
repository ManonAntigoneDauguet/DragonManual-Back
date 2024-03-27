/**
 * @class
 * @classdesc Create a new user
 */
class User {
    /**
     * @constructor
     * @param { String } email 
     * @param { String } hashPassword as the password after secure transformation
     * @param { String } firstName
     * @param { String } lastName 
     */
    constructor(email, hashPassword, firstName, lastName) {
        this._email = email;
        this._hashPassword = hashPassword;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get email() {
        return this._email;
    }

    get hashPassword() {
        return this._hashPassword;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }
}

module.exports.User = User