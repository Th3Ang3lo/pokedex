import { Controller } from "@/infra/http/adapters/http";

import { HttpParams } from "@/infra/http/types";

import { FindPokemonByNameUseCase } from "@/usecases/pokemons/find-pokemon-by-name-usecase";

export class FindPokemonController implements Controller {
    constructor(private readonly findPokemonByNameUseCase: FindPokemonByNameUseCase) { }

    public async handle(request: FindPokemonController.Request): Promise<FindPokemonController.Response> {
        const pokemon = request.params?.pokemon!;

        const findPokemon = await this.findPokemonByNameUseCase.findByName({
            pokemon
        });

        return {
            abilities: findPokemon
        };
    }
}

export namespace FindPokemonController {
    export type Request = HttpParams<{
        pokemon: string
    }>;

    interface AbilitiesResponse {
        name: string;
    }

    export interface Response {
        abilities: AbilitiesResponse[]
    };
}