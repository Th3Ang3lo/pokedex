import { FindPokemonRequestDTO } from "@/domain/dtos/requests/find-pokemon-request-dto";

import { NotFoundException } from "@/domain/errors/not-found-exception";

import { HttpGateway } from "@/infra/gateways/http-gateway";

export class FindPokemonByNameUseCase {
    constructor(private readonly httpGateway: HttpGateway) {}

    public async findByName(params: FindPokemonByNameUseCase.Params): Promise<FindPokemonByNameUseCase.Output> {
        const pokemon = params.pokemon;

        const findPokemon = await this.httpGateway.get<FindPokemonRequestDTO.Response>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (findPokemon.statusCode === 404) {
            throw new NotFoundException(`Pokemon "${pokemon}" not found.`);
        }

        const abilities = findPokemon.response?.abilities;

        if(!abilities) {
            throw new NotFoundException(`Pokemon "${pokemon}" not found.`);
        }

        const abilitiesNonHidden = abilities.filter(ability => !ability.is_hidden);

        const output = abilitiesNonHidden.map(ability => ({
            name: ability.ability.name
        }));

        return output;
    }
}

export namespace FindPokemonByNameUseCase {
    export interface Params {
        pokemon: string;
    }

    export type Output = Array<{
       name: string;
    }>;
}