import { expect, test } from "bun:test"
import { smogonDataAnalyzer } from "../src/smogon"
import raw from './test.json'
const testSmogonAnaylyzer = new smogonDataAnalyzer({
    format: "gen9vgc2024regfbo3",
    rating: 1760,
    period: "2023-12-DLC2",
    rawData: raw
})

const TEST_POKEMON = "Dondozo"

test("successfully get most used pokemon", function () {
    const actual = testSmogonAnaylyzer.getTopUsagePokemons(1)[0];
    expect(actual["Dondozo"]).toBe(3.88);
})

test("successfully get most used abilities of pokemon", function () {
    const actual = testSmogonAnaylyzer.getAbilityUsageOfPokemon("Dondozo", false);
    expect(actual).toEqual(["oblivious", "unaware", "waterveil"])
    const actualWithNumber = testSmogonAnaylyzer.getAbilityUsageOfPokemon("Dondozo");
    // from https://www.smogon.com/stats/2023-12-DLC2/moveset/gen9vgc2024regfbo3-1760.txt
    expect(actualWithNumber).toEqual({
        oblivious: 54.07, 
        unaware: 45.93, 
        waterveil: 0
    })
})

test("get correct mostly used item", function() {
    const actual = testSmogonAnaylyzer.getCommonItemsOfPokemon("Dondozo", 1, false);
    expect(actual).toEqual([
        "rockyhelmet"
    ])
    const actualWithNumber = testSmogonAnaylyzer.getCommonItemsOfPokemon("Dondozo", 1);
    expect(actualWithNumber).toEqual({
        "rockyhelmet": 49.61
    })
    
})