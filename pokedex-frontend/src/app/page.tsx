"use client";

import Image from 'next/image'

import search from '@/assets/icons/search.svg';
import React, { useRef, useState } from 'react';
import { Loading } from '@/components/loading';
import { PokemonAbility, getPokemonByName } from '@/services/get-pokemon-by-name';

export default function Home() {
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const [abilities, setAbilities] = useState<PokemonAbility[]>([]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const pokemonName = inputRef.current?.value;

        if(pokemonName?.trim() == ''|| !pokemonName) return;

        setLoading(true);
        setAbilities([]);

        const findPokemonAbilitiesByName = await getPokemonByName(pokemonName!);

        if(findPokemonAbilitiesByName.statusCode == 200) {
            setAbilities(findPokemonAbilitiesByName.response.abilities);
        }

        console.log(findPokemonAbilitiesByName);
        setLoading(false);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-10/12 md:w-6/12 mt-40">
                <h1 className="text-center text-3xl mb-4">Buscar habilidades de pokemon</h1>

                <form className="w-full h-14 bg-gray-200 rounded-md flex" onSubmit={handleSubmit}>
                    <input ref={inputRef} className="bg-gray-200 rounded-l-lg p-3 w-11/12" placeholder="Ex: pikachu" />

                    <button className="text-center bg-gray-700 w-1/12 rounded-r-lg flex items-center justify-center">
                        <Image  src={search} alt='search' className='h-8 w-8' />
                    </button>
                </form>

                <div className='mt-4'>
                    {loading ? (<>
                        <div className='flex items-center justify-center'>
                            <Loading />
                        </div>
                    </>) : (
                        <>
                            {abilities.length == 0
                            ? <p className='text-center'>Nenhum pokemon encontrado.</p>
                            : abilities.map((ability, index) => (
                                <>
                                    <div key={index} className='bg-gray-200 px-3 py-1 rounded-md'>
                                        Habilidade: {ability.name}
                                    </div>
                                </>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
