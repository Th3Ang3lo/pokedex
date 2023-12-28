export namespace FindPokemonRequestDTO {
    export interface Response {
        abilities: Array<{
            ability: {
                name: string,
                url: string,
            },
            is_hidden: boolean,
            slot: number
        }>
    }
}