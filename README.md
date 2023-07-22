# smogon-data-wrapper
A data wrapper for competitve pokemon data with raw data from Smogon.

### How to install
```
pnpm add smogon-data-wrapper
```

### How to use
```
// node
const { smogonDataAnalyzer } = require('smogon-data-wrapper');
// provides required information for finding specific data
const tester = new smogonDataAnalyzer({
    format: 'gen9vgc2023regulationd',
    rating: 1760,
    period: '2023-06'
});
// let the analyzer fetch data from smogon
await tester.init();
```

### Get latest usage data 
```
tester.getTopUsagePokemons()
```
### Get Common sets of each pokemon 
```
tester.getUsageOfPokemon("Flutter Mane")
tester.getCommonSpreadsOfPokemon("Flutter Mane")
tester.getCommonItemsOfPokemon("Flutter Mane")
tester.getAbilityUsageOfPokemon("Flutter Mane")
tester.getCommonMovesOfPokemon("Flutter Mane")
tester.getCommonTeammatesOfPokemon("Flutter Mane")
```
