
const { smogonDataAnalyzer } = require('./src/index');
// FIXME test code 
(async function () {
    const tester = new smogonDataAnalyzer({
        format: 'gen9vgc2023regulationd',
        rating: 1760,
        period: '2023-06'
    });
    await tester.init();
    console.log(tester.getCommonTeammatesOfPokemon('Tornadus'))
})()

