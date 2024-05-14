// import { PokemonGeneration } from '../../models/pokemon.ts'
import { usePokemon } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Link, useParams } from 'react-router-dom'
//fetch pokemon list from api

export default function PokemonList() {
  const { generation } = useParams()
  const { data, isLoading, isError, error } = usePokemon(generation as string)
  if (data)
    return (
      <>
        <h1>Got em</h1>
        <h2>Pokémon in {data.main_region.name}:</h2>
        <ul>
          {data.pokemon_species.map((p) => (
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
