
/**
 * Description placeholder
 * @date 2024/1/23 - 上午10:00:23
 * @template {T}
 * @typedef {import('../types/smogon').ListOfData<T>} ListOfData
 * @typedef {import('../types/smogon').SmogonRawData} rawData
 */

/**
 * Accepts format, rating, and period to target specific JSON for analyzing.
 * @date 2023/7/19 - 下午10:52:08
 *
 * @export
 * @class smogonDataAnalyzer
 * @typedef {smogonDataAnalyzer}
 * @classdesc Core class that provides methods for cleaner information of chaos data from smogon
 */

export class smogonDataAnalyzer {
    /**
     * The format you want to analyze. ex. gen9vgc2023regulationd
     * @date 2024/1/23 - 上午9:39:15
     * @type {string}
     */
    format;
    
    /**
     * The rating threshold you want to analyze. ex. 0, 1760, etc. 
     * @date 2024/1/23 - 上午9:39:50
     * @type {number}
     */
    rating;
    
    /**
     * The time period you want to analyze, mainly grouped by month. ex. 2023-06;
     * @date 2024/1/23 - 上午9:40:17
     *
     * @type {string}
     */
    period;
    
    /**
     * Data from Smogon chaos json waiting for being anaylzed.
     * @date 2024/1/23 - 上午9:40:37
     *
     * @type {rawData}
     */
    rawData;
    /**
     * Creates an instance of smogonDataAnalyzer.
     * @date 2023/7/19 - 下午11:02:44
     *
     * @constructor
     * @param {Object} identifierOption data from Smogon is grouped by the format battles use, the ratings/level players at, and when does the battles take place. 
     * @param {string} identifierOption.format  
     * @param {number} [identifierOption.rating] 
     * @param {string} identifierOption.period
     * @param {rawData} [identifierOption.rawData] 
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
        this.rawData = rawData
    }


    /**
     * Check if user actually init the analyzer before doing every analyze.
     * @date 2023/7/19 - 下午11:06:24
     *
     * @param {rawData} [rawData]
     * @returns {boolean}
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
     * @param {rawData} [rawData]
     */
    async init(rawData) {
        if (this.rawData) {
            return
        }
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
     * @type {import('../types/smogon').GetTopUsagePokemons}
     */
    getTopUsagePokemons(size = 30, withNumber = true) {
        if (!this.#checkRawDataExist(this.rawData)) return [];
        const slicedEntry = Object.entries(this.rawData)
            .sort(function (monA, monB) {
                return monB[1].usage - monA[1].usage
            })
            .slice(0, size)
        if (!withNumber) {
            return slicedEntry.map(function ([name,]) { return name })
        }
        return slicedEntry.map(function (monEntry) {
            return {
                [monEntry[0]]: +(monEntry[1].usage*100).toFixed(2)
            }
        })

    }


    /**
     * Check if user actually init the analyzer before doing every analyze.
     * @date 2023/7/19 - 下午11:06:24
     *
     * @param {rawData} rawData
     * @param {string} pokemonName
     * @returns {pokemonName is keyof rawData}
     */
    #checkPokemonExist(rawData, pokemonName) {
        const pokemonSpecificData = rawData[pokemonName]
        if (!pokemonSpecificData) {
            throw new Error('The pokemon name provided is invalid. If the pokemon is a region variation, please specify the region, ex. Moltres-Galar')
        }
        return true
    }

    /**
     * Abstraction of smogon data parser
     * @date 2023/7/21 - 下午3:52:04
     * @type {import("../types/smogon").GetTopUsageOfCertainProperty}
     */

    #getTopUsageOfCertainProperty(pokemonName, propertyName, option) {
        if (!this.#checkRawDataExist(this.rawData)) return [];
        if (!this.#checkPokemonExist(this.rawData, pokemonName)) return [];
        const rawDataOfProperty = this.rawData[pokemonName][propertyName]

        /**
         * @type {[string, number][]} entries
         */
        const entries = Object.entries(rawDataOfProperty)
            .sort(function (usageA, usageB) {
                return usageB[1] - usageA[1]
            })

        /**
         * @type {number} usageSum
         */
        const usageSum = entries.map(function ([, usage]) {
            return usage
        }).reduce(function (pre, cur) {
            return pre + cur
        }, 0)

        const sliceOfEntries = option?.size ? entries.slice(0, option.size) : entries

        if (option?.withNumber) {
            return sliceOfEntries
                .reduce((pre, cur) => {
                    pre[[cur[0]]] = +((cur[1] / usageSum)*100).toFixed(2)
                    return pre
                }, {})
        }
        return sliceOfEntries.map(function ([name,]) {
            return name
        })
    }
    /**
     * Provide the usage rate of certain pokemon 
     * @date 2023/7/20 - 下午5:25:12
     *
     * @param {string} pokemonName
     * @returns {number} usage rate of certain pokemon 
     */
    getUsageOfPokemon(pokemonName) {
        if (!this.#checkRawDataExist(this.rawData)) return 0;
        if (!this.#checkPokemonExist(this.rawData, pokemonName)) return 0;
        return this.rawData[pokemonName].usage
    }

    /**
     * Provide the top common EV spreads of certain pokemon. Useful when modifying own spread.  
     * @date 2023/7/20 - 下午5:37:15
     *
     * @param {string} pokemonName
     * @param {number} [size]
     * @param {boolean} [withNumber=true]
     * @returns {ListOfData<boolean>} commonEVList
     */
    getCommonSpreadsOfPokemon(pokemonName, size = 5, withNumber = true) {
        return this.#getTopUsageOfCertainProperty(pokemonName, 'Spreads', { size, withNumber })
    }

    /**
     * Provide the top common item choices of certain pokemon.  
     * @date 2023/7/21 - 下午3:44:48
     *
     * @type {import('../types/smogon').GetItemUsageOfPokemons}
     */

    getCommonItemsOfPokemon(pokemonName, size = 5, withNumber = true) {
        return this.#getTopUsageOfCertainProperty(pokemonName, 'Items', { size, withNumber })
    }
    /**
    * Provide information on which ability players use the most.  
    * @date 2023/7/21 - 下午3:44:48
    *
     * @type {import('../types/smogon').GetAbilityUsageOfPokemon}
    */
    getAbilityUsageOfPokemon(pokemonName, withNumber = true) {
        return this.#getTopUsageOfCertainProperty(pokemonName, 'Abilities', { withNumber })
    }

    /**
    * Provide the top common move choices of certain pokemon.  
    * @date 2023/7/21 - 下午3:44:48
    *
    * @param {string} pokemonName
    * @param {number} [size]
    * @param {boolean} [withNumber=true]
    * @returns {ListOfData<boolean>} commonMoveList
    */
    getCommonMovesOfPokemon(pokemonName, size = 5, withNumber = true) {
        const unWeighted = this.#getTopUsageOfCertainProperty(pokemonName, 'Moves', { size, withNumber })
        if (!withNumber) {
            return unWeighted
        }
        return unWeighted
            .map(function (move) {
                const [moveName, moveUsage] = Object.entries(move)[0]
                return {
                    [moveName]: moveUsage * 4
                }
            })
    }

    /**
     * Get common teammates of pokemon WITHOUT usage. Could nor figure out how smogon parse usage data for now.
     * @date 2023/7/22 - 下午12:39:15
     *
     * @param {string} pokemonName
     * @param {number} [size=5]
     * @returns {ListOfData<false>} commonTeammateList
     */
    getCommonTeammatesOfPokemon(pokemonName, size = 5) {
        return this.#getTopUsageOfCertainProperty(pokemonName, 'Teammates', { size, })
            .map(function (teammate) {
                if (typeof teammate === 'string') return teammate;
                return Object.keys(teammate)[0]
            })
    }
}
