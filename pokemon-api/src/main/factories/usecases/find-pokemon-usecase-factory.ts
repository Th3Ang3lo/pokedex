import { FindPokemonByNameUseCase } from "@/usecases/pokemons/find-pokemon-by-name-usecase";

import { httpGatewayFactory } from "../gateways/http-gateway-factory";

export function findPokemonByNameUseCaseFactory() {
    return new FindPokemonByNameUseCase(httpGatewayFactory());
}