import { FindPokemonController } from "@/controllers/pokemons/find-pokemon-controller";
import { findPokemonByNameUseCaseFactory } from "../../usecases/find-pokemon-usecase-factory";

export function findPokemonControllerFactory() {
    return new FindPokemonController(findPokemonByNameUseCaseFactory());
}