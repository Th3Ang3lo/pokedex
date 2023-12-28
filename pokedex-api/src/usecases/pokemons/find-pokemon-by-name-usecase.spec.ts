import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { HttpGatewayMock } from '@/__mocks__/infra/gateways/http-gateway-mock';
import { NotFoundException } from '@/domain/errors/not-found-exception';

import { FindPokemonByNameUseCase } from './find-pokemon-by-name-usecase';

const name = FindPokemonByNameUseCase.name;
describe(`[${name}] Tests`, () => {
    let httpGatewayMock: HttpGatewayMock;
    let findPokemonByNameUseCase: FindPokemonByNameUseCase;

    beforeAll(() => {
        httpGatewayMock = new HttpGatewayMock();
        findPokemonByNameUseCase = new FindPokemonByNameUseCase(httpGatewayMock);
    });

    beforeEach(() => {
        httpGatewayMock.reset();
    })

    it(`[${name}] calls of HttpGateway.get with correct params.`, async () => {
        const params = { pokemon: 'pikachu' };

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
        })

        await findPokemonByNameUseCase.findByName(params);

        expect(httpGatewayMock.get).toBeCalledWith(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`);
    });

    it(`[${name}] HttpGateway.get will returns 404.`, async () => {
        const params = { pokemon: 'pikachu' };

        httpGatewayMock.mockGet(404, 'Not found');

        const sut = findPokemonByNameUseCase.findByName(params);

        expect(sut).rejects.toThrowError(new NotFoundException(`Pokemon "${params.pokemon}" not found.`));
    });

    it(`[${name}] Throws NotFoundException if HttpGateway.get return 200 with incorrect response.`, async () => {
        const params = { pokemon: 'pikachu' };

        httpGatewayMock.mockGet(200, {});

        const sut = findPokemonByNameUseCase.findByName(params);

        expect(sut).rejects.toThrowError(new NotFoundException(`Pokemon "${params.pokemon}" not found.`));
    });

    it(`[${name}] HttpGateway.get will returns 200 with empty abilities.`, async () => {
        const params = { pokemon: 'pikachu' };

        httpGatewayMock.mockGet(200, {
            abilities: []
        });

        const sut = await findPokemonByNameUseCase.findByName(params);

        expect(sut.length).toBe(0);
    });
});