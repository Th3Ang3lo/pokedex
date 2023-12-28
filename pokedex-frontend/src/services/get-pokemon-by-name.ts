import { HttpGateway } from "@/infra/gateways/http-gateway";

export interface PokemonAbility {
    name: string;
}

export interface GetPokemonByNameRequestResponse {
    abilities: PokemonAbility[]
}

export async function getPokemonByName(pokemon: string) {
    return await HttpGateway.get<GetPokemonByNameRequestResponse>(`${process.env.NEXT_PUBLIC_API_URL}/pokemons/${pokemon}`);
}