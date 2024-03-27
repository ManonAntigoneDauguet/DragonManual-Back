/**
 * @class
 * @classdesc Create a new dragon character
 */
class Dragon {
    /**
     * @constructor
     * @param { String } name 
     * @param { String } specie 
     * @param { String } [rider ]
     * @param { String } [description] 
     */
    constructor(name, specie, rider = "none", description = "") {
        this._name = name;
        this._specie = specie;
        this._rider = rider;
        this._description = description;
    }

    get name() {
        return this._name;
    }

    get specie() {
        return this._specie;
    }

    get rider() {
        return this._rider;
    }

    get description() {
        return this._description;
    }
}

module.exports.Dragon = Dragon