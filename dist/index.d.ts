/**
 * Typeof Data from smogon chaos folder
 */
export type smogonUsageObjectStructure = {
    [x: string]: number;
};
/**
 * Typeof Data from smogon chaos folder
 */
export type smogonRawData = {
    [x: string]: {
        Moves: smogonUsageObjectStructure;
        Abilities: smogonUsageObjectStructure;
        Teammates: smogonUsageObjectStructure;
        usage: number;
        Items: smogonUsageObjectStructure;
        Spreads: smogonUsageObjectStructure;
    };
};
/**
 * Typeof Data from smogon chaos folder
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
export class smogonDataAnalyzer {
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
    constructor({ format, rating, period, rawData }: {
        format: string;
        rating?: number;
        period: string;
        rawData?: smogonRawData;
    });
    period: string;
    format: string;
    rating: number;
    rawData: {
        [x: string]: {
            Moves: smogonUsageObjectStructure;
            Abilities: smogonUsageObjectStructure;
            Teammates: smogonUsageObjectStructure;
            usage: number;
            Items: smogonUsageObjectStructure;
            Spreads: smogonUsageObjectStructure;
        };
    };
    /**
     * Standalone init function to load data locally or fetch from smogon asynchronously;
     * @date 2023/7/19 - 下午11:47:17
     *
     * @async
     * @param {smogonRawData} [rawData]
     */
    init(rawData?: smogonRawData): Promise<void>;
    /**
     * Description placeholder
     * @date 2023/7/19 - 下午11:48:50
     *
     * @param {number} [size=30]
     * @param {boolean} [withNumber=true]
     * @returns {string[] | smogonUsageObjectStructure[]} topUsageList
     */
    getTopUsagePokemons(size?: number, withNumber?: boolean): string[] | smogonUsageObjectStructure[];
    /**
     * Provide the usage rate of certain pokemon
     * @date 2023/7/20 - 下午5:25:12
     *
     * @param {string} pokemonName
     * @returns {number} usage rate of certain pokemon
     */
    getUsageOfPokemon(pokemonName: string): number;
    /**
     * Provide the top common EV spreads of certain pokemon. Useful when modifying own spread.
     * @date 2023/7/20 - 下午5:37:15
     *
     * @param {string} pokemonName
     * @param {number} [size]
     * @param {boolean} [withNumber=true]
     * @returns {ListOfData<boolean>} commonEVList
     */
    getCommonSpreadsOfPokemon(pokemonName: string, size?: number, withNumber?: boolean): string[] | {
        [x: string]: number;
    }[];
    /**
     * Provide the top common item choices of certain pokemon.
     * @date 2023/7/21 - 下午3:44:48
     *
     * @param {string} pokemonName
     * @param {number} [size]
     * @param {boolean} [withNumber=true]
     * @returns {ListOfData<boolean>} commonItemList
     */
    getCommonItemsOfPokemon(pokemonName: string, size?: number, withNumber?: boolean): string[] | {
        [x: string]: number;
    }[];
    /**
    * Provide information on which ability players use the most.
    * @date 2023/7/21 - 下午3:44:48
    *
    * @param {string} pokemonName
    * @param {boolean} [withNumber=true]
    * @returns {ListOfData<boolean>} abilityList
    */
    getAbilityUsageOfPokemon(pokemonName: string, withNumber?: boolean): string[] | {
        [x: string]: number;
    }[];
    /**
    * Provide the top common move choices of certain pokemon.
    * @date 2023/7/21 - 下午3:44:48
    *
    * @param {string} pokemonName
    * @param {number} [size]
    * @param {boolean} [withNumber=true]
    * @returns {ListOfData<boolean>} commonMoveList
    */
    getCommonMovesOfPokemon(pokemonName: string, size?: number, withNumber?: boolean): string[] | {
        [x: string]: number;
    }[];
    /**
     * Get common teammates of pokemon WITHOUT usage. Could nor figure out how smogon parse usage data for now.
     * @date 2023/7/22 - 下午12:39:15
     *
     * @param {string} pokemonName
     * @param {number} [size=5]
     * @returns {ListOfData<false>} commonTeammateList
     */
    getCommonTeammatesOfPokemon(pokemonName: string, size?: number): string[];
    #private;
}
//# sourceMappingURL=index.d.ts.map