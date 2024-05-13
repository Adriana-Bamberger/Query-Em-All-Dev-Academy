// import { PokemonGeneration } from '../../models/pokemon.ts'
import { fetchPokemonGeneration } from '../apis/pokemon.ts'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner.tsx'
//fetch pokemon list from api

export default function PokemonList() {
  const {
    data: generation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['name'],
    queryFn: () => fetchPokemonGeneration(1),
  })
  if (generation)
    return (
      <>
        <h1>Got em!</h1>
        <h2>Pokémon in {generation.main_region.name}:</h2>
        <ul>
          {generation.pokemon_species.map((p) => (
            <li key={p.url}>{p.name}</li>
          ))}
        </ul>
      </>
    )
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }
  if (isError) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    )
  }
}

// const generation = {
//   id: 1,
//   main_region: { name: 'Kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
//   name: 'generation-i',
//   pokemon_species: [
//     { url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur', name: 'Bulbasaur' },
//   ],
// } as PokemonGeneration
