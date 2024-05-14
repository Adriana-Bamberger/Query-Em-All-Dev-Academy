// import { PokemonGeneration } from '../../models/pokemon.ts'
import { fetchPokemonGeneration } from '../apis/pokemon.ts'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Link } from 'react-router-dom'
//fetch pokemon list from api

export default function PokemonList() {
  const {
    data: generation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['generation'],
    queryFn: () => fetchPokemonGeneration(1),
  })
  if (generation)
    return (
      <>
        <h1>Got em</h1>
        <h2>Pokémon in {generation.main_region.name}:</h2>
        <ul>
          {generation.pokemon_species.map((p) => (
            <li key={p.name}>
              <Link to={`/pokemon/${p.name}`}>{p.name}</Link>
            </li>
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
    return error.message
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
