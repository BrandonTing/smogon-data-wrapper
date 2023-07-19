
/**
 * Description placeholder
 * @date 2023/7/19 - 下午11:13:00
 * @typedef {Object<string, number>} smogonUsageObjectStructure 
 * @typedef {Object<string, { Moves: smogonUsageObjectStructure, Abilities: smogonUsageObjectStructure, Teammates: smogonUsageObjectStructure, usage: number, Items: smogonUsageObjectStructure, Spreads: smogonUsageObjectStructure }>} smogonRawData
 */

/**
 * Accepts format, rating, and period to target specific JSON for analyzing.
 * @date 2023/7/19 - 下午10:52:08
 *
 * @class smogonDataAnalyzer
 * @classdesc Core class that provides methods for cleaner information of chaos data from smogon
 */
class smogonDataAnalyzer {

    /**
     * Creates an instance of smogonDataAnalyzer.
     * @date 2023/7/19 - 下午11:02:44
     *
     * @constructor
     * @param {Object} identifierOption data from Smogon is grouped by the format battles use, the ratings/level players at, and when does the battles take place. 
     * @param {string} identifierOption.format  The format you want to analyze. ex. gen9vgc2023regulationd
     * @param {number} [identifierOption.rating] The rating threshold you want to analyze. ex. 0, 1760, etc. 
     * @param {string} identifierOption.period   The time period you want to analyze, mainly grouped by month. ex. 2023-06;
     * @param {smogonRawData} [identifierOption.rawData] Data from Smogon chaos json waiting for being anaylzed.
     */
    constructor({ format, rating = 0, period, rawData }) {
        if (!format) {
            throw new Error('Format is required. Please check folder names at https://www.smogon.com/stats/2023-06/ for reference.')
        }
        // if user doesn't provide period, get last month in yyyy-mm format
        if (period) {
            this.period = period
        } else {
            const today = new Date()
            today.setMonth(today.getMonth() - 1)
            const latestDataMonth = today.toISOString().substring(0, 7)
            this.period = latestDataMonth
        }

        this.format = format;
        this.rating = rating;
        if (this.rawData) {
            this.rawData = rawData
        }
    }


    /**
     * Check if user actually init the analyzer before doing every analyze.
     * @date 2023/7/19 - 下午11:06:24
     */

    /**
     * Description placeholder
     * @date 2023/7/19 - 下午11:45:50
     *
     * @param {smogonRawData} [rawData]
     * @returns {rawData is smogonRawData}
     */
    #checkRawDataExist(rawData) {
        if (!rawData) {
            throw new Error('Please init the instance with data from smogon correctly by load existing JSON data or let the module fetch from smogon with provided info.')
        }
        return true
    }


    /**
     * Standalone init function to load data locally or fetch from smogon asynchronously;
     * @date 2023/7/19 - 下午11:47:17
     *
     * @async
     * @param {smogonRawData} [rawData]
     */
    async init(rawData) {
        if (rawData) {
            this.rawData = rawData;
            return;
        }
        const smogonBaseUrl = 'https://www.smogon.com/stats/';
        try {
            const response = await fetch(`${smogonBaseUrl}/${this.period}/chaos/${this.format}-${this.rating}.json`)
            const data = await response.json();
            this.rawData = data.data;
        } catch (err) {
            throw new Error('Init data from smogon failed. Please check your internect connection.')
        }
    }


    /**
     * Description placeholder
     * @date 2023/7/19 - 下午11:48:50
     *
     * @param {number} [size=30]
     * @param {boolean} [withNumber=true]
     * @returns {(string | smogonUsageObjectStructure)[]} topUsageList
     */
    getTopUsagePokemons(size = 30, withNumber = true) {
        if (!this.#checkRawDataExist(this.rawData)) return [];
        return Object.entries(this.rawData)
            .sort(function (monA, monB) {
                return monB[1].usage - monA[1].usage
            })
            .slice(0, size)
            .map(function (monEntry) {
                if (withNumber) {
                    return {
                        [monEntry[0]]: monEntry[1].usage
                    }
                }
                return monEntry[0]
            })

    }


    getUsageOfPokemon() {

    }

    getCommonEVsOfPokemon() {

    }

    getCommonItemsOfPokemon() {

    }

    getCommonMovesOfPokemon() {

    }

    getAbilityUsageOfPokemon() {

    }

    getCommonTeammatesOfPokemon() {

    }

}

// test code 
(async function () {
    const tester = new smogonDataAnalyzer({
        format: 'gen9vgc2023regulationd',
        rating: 1760,
        period: '2023-06'
    });
    await tester.init();
    console.log(tester.period)
    console.log(tester.rawData)
    const topUsage = tester.getTopUsagePokemons()
    console.log(topUsage)
})()


module.exports = {
    smogonDataAnalyzer
}