import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { NotFoundException } from '@/domain/errors/not-found-exception';

import { FindPokemonController } from './find-pokemon-controller';
import { FindPokemonByNameUseCase } from '@/usecases/pokemons/find-pokemon-by-name-usecase';

import { HttpGatewayMock } from '@/__mocks__/infra/gateways/http-gateway-mock';

const name = FindPokemonController.name;
describe(`[${name}] Tests`, () => {
    let httpGatewayMock: HttpGatewayMock;
    let findPokemonByNameUseCase: FindPokemonByNameUseCase;
    let findPokemonController: FindPokemonController;

    beforeAll(() => {
        httpGatewayMock = new HttpGatewayMock();
        findPokemonByNameUseCase = new FindPokemonByNameUseCase(httpGatewayMock);
        findPokemonController = new FindPokemonController(findPokemonByNameUseCase);
    });

    beforeEach(() => {
        httpGatewayMock.reset();
    })

    it(`[${name}] calls of FindPokemonByNameUseCase.findByname with correct params.`, async () => {
        const request = {
            params: {
                pokemon: 'pikachu'
            }
        };

        httpGatewayMock.mockGet(200, {
            abilities: [
                {
                    ability: {
                        name: faker.word.words(1),
                        url: faker.internet.url()
                    },
                    is_hidden: false,
                    slot: faker.number.int()
                }
            ]
        });

        await findPokemonController.handle(request);

        expect(httpGatewayMock.get).toBeCalledWith(`https://pokeapi.co/api/v2/pokemon/${request.params.pokemon}`);
    });

    it(`[${name}] FindPokemonByNameUseCase.findByname throws NotFoundException.`, async () => {
        const request = {
            params: {
                pokemon: 'pikachu'
            }
        };

        httpGatewayMock.mockGet(404, 'Not found');

        const sut = findPokemonController.handle(request);

        expect(sut).rejects.toThrowError(new NotFoundException(`Pokemon "${request.params.pokemon}" not found.`));
    });

    it(`[${name}] Throws NotFoundException if HttpGateway.get of FindPokemonByNameUseCase.findByname return 200 with incorrect response.`, async () => {
        const request = {
            params: {
                pokemon: 'pikachu'
            }
        };

        httpGatewayMock.mockGet(404, 'Not found');

        const sut = findPokemonController.handle(request);

        expect(sut).rejects.toThrowError(new NotFoundException(`Pokemon "${request.params.pokemon}" not found.`));
    });
});