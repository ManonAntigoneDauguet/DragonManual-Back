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
        this._genesisTime = new Date();
        this._expiry = this._genesisTime.getTime() + 1 * 60*60*1000;
    }

    get value() {
        return this._value;
    }

    get userId() {
        return this._userId;
    }

    get genesisTime() {
        return this._genesisTime;
    }

    get expiry() {
        return this._expiry;
    }
}

module.exports.Token = Token