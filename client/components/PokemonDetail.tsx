import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByName } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function PokemonDetail() {
  const { name } = useParams()
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchPokemonByName(name as string),
  })
  if (pokemon)
    return (
      <div>
        <h1>{name}</h1>
        <h2>Types: </h2>
        {pokemon.types.map(({ type, slot }) => (
          <p key={slot}>{type.name}</p>
        ))}
        <img
          src={pokemon.sprites.front_default}
          alt={`Front Default Sprite for ${pokemon.name}`}
        />
        <section>
          <h2>Abilities: </h2>
          {pokemon.abilities.map(({ ability, slot }) => (
            <p key={slot}>{ability.name}</p>
          ))}
        </section>
        <section>
          <h2>Moves: </h2>
          {pokemon.moves.map(({ move }) => (
            <p key={move.name}>{move.name}</p>
          ))}
        </section>
      </div>
    )
  if (isLoading) return <LoadingSpinner />
  if (isError) return error.message
}
//this should run please <3

// const pokemon: Pokemon = {
//   id: 1,
//   name: 'bulbasaur',
//   sprites: {
//     front_default:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
//     back_default:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
//   },
//   abilities: [
//     {
//       ability: {
//         name: 'overgrow',
//         url: 'https://pokeapi.co/api/v2/ability/65/',
//       },
//       is_hidden: false,
//       slot: 1,
//     },
//     {
//       ability: {
//         name: 'chlorophyll',
//         url: 'https://pokeapi.co/api/v2/ability/34/',
//       },
//       is_hidden: true,
//       slot: 3,
//     },
//   ],
//   moves: [
//     {
//       move: {
//         name: 'razor-wind',
//         url: 'https://pokeapi.co/api/v2/move/13/',
//       },
//     },
//     {
//       move: {
//         name: 'swords-dance',
//         url: 'https://pokeapi.co/api/v2/move/14/',
//       },
//     },
//   ],
//   types: [
//     {
//       slot: 0,
//       type: {
//         name: 'grass',
//         url: 'https://pokeapi.co/api/v2/type/12/',
//       },
//     },
//     {
//       slot: 1,
//       type: {
//         name: 'poison',
//         url: 'https://pokeapi.co/api/v2/type/4/',
//       },
//     },
//   ],
// }
