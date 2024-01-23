type SmogonUsageObjectStructure = Record<string, number>

export type SmogonRawData = Record<string, { Moves: SmogonUsageObjectStructure, Abilities: SmogonUsageObjectStructure, Teammates: SmogonUsageObjectStructure, usage: number, Items: SmogonUsageObjectStructure, Spreads: SmogonUsageObjectStructure }>

export type ListOfData<T extends boolean> = T extends true ? SmogonUsageObjectStructure[] : string[]

export type GetTopUsagePokemons = <T extends boolean = true>(size?: number, withNumber?: T) => T extends true ? SmogonUsageObjectStructure[] : string[]

type PropertyInfoOfPokemon<T> = T extends true ? Record<string, number> : Array<string>

export type GetTopUsageOfCertainProperty = <T extends boolean = true>(pokemonName: string, propertyName: keyof SmogonRawData, withNumber: T) => 
    PropertyInfoOfPokemon<T>

export type GetAbilityUsageOfPokemon = <T extends boolean = true>(pokemonName: string, withNumber?: T) => PropertyInfoOfPokemon<T>

export type GetItemUsageOfPokemons = <T extends boolean = true>(pokemonName: string, size: number, withNumber?: T) => PropertyInfoOfPokemon<T>
