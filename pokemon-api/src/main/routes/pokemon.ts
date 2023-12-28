import { Router } from "express";

import { httpAdapter } from "@/infra/http/adapters/http";

import { findPokemonControllerFactory } from "../factories/controllers/pokemons/find-pokemon-controller-factory";

export const pokemonRoutes =  Router();

pokemonRoutes.get('/pokemons/:pokemon', httpAdapter(findPokemonControllerFactory()))