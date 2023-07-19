class smogonDataAnalyzer {
    constructor(format, rating = 0, period) {
        // TODO add verification
        if (period) {
            this.period = period
        } else {
            const today = new Date()
            today.setMonth(today.getMonth() - 1)
            const latestDataMonth = today.toISOString().substring(0, 7)
            this.period = latestDataMonth
        }
        this.format = format
        this.rating = rating

    }
    async init(rawData) {
        if (rawData) {
            this.rawData = rawData;
            return;
        }
        const smogonBaseUrl = 'https://www.smogon.com/stats/';
        try {
            const response = await fetch(`${smogonBaseUrl}/${this.period}/chaos/${this.format}-${this.rating}.json`)
            const data = await response.json();
            this.data = data;
        } catch (err) {
            throw Error('Init data from smogon failed. Please check your internect connection.')
        }
    }
    getTopUsagePokemons() {

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

    getUsageOfPokemon() {

    }
}

// test code 
(async function () {
    const tester = new smogonDataAnalyzer('gen9vgc2023regulationd', 1760, '2023-06');
    await tester.init();
    console.log(tester.data)
})()


module.exports = {
    smogonDataAnalyzer
}
