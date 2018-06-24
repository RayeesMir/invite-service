class CodeGenerator {
    constructor(characterSet) {
        this.characterSet = characterSet || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @description Generate Random Number between min and max
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description Generate Random Character from CharacterSet
     */
    randomCharacter() {
        const min = 0;
        const max = this.characterSet.length - 1;
        const index = this.randomNumber(min, max);
        return this.characterSet[index];
    }

    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @description Generate Token of size between min and max. if min and max is ignored default size will be between 6 to 12 
     */
    generate(min, max) {
        let token = "";
        const length = this.randomNumber(min || 6, max || 12);
        for (let index = 0; index < length; index++) {
            token += this.randomCharacter();
        }
        return token;
    }
    
    /**
     * @param {Date} date
     * @param {Number} days
     * @returns {Date} 
     * @description Adds specified number of days to the passedin date
     */
    addDays (date, days){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, date.getHours(), date.getMinutes(), date.getSeconds());
    }
}

module.exports = CodeGenerator;