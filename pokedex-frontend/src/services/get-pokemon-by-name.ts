import { HttpGateway } from "@/infra/gateways/http-gateway";

export interface PokemonAbility {
    name: string;
}

export interface GetPokemonByNameRequestResponse {
    abilities: PokemonAbility[]
}

export async function getPokemonByName(pokemon: string) {
    return await HttpGateway.get<GetPokemonByNameRequestResponse>(`http://localhost:8080/pokemons/${pokemon}`);
}