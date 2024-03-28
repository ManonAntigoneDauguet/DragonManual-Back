/**
 * @class
 * @classdesc Create a new token
 */
class Token {
    /**
     * @constructor
     * @param { Number } userId 
     */
    constructor(userId) {
        this._userId = userId;
        this._value = Math.floor(Math.random() * 100000);
        this._createdAt = new Date();
        this._expiry = this._createdAt.getTime() + 1 * 60*60*1000;
    }

    get value() {
        return this._value;
    }

    get userId() {
        return this._userId;
    }

    get createdAt() {
        return this._createdAt;
    }

    get expiry() {
        return this._expiry;
    }
}

module.exports.Token = Token