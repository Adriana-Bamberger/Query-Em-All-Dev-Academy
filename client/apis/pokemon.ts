import request from 'superagent'
import type {
  ApiLink,
  Pokemon,
  PokemonGeneration,
} from '../../models/pokemon.ts'
import { useQuery } from '@tanstack/react-query'

export async function fetchPokemonGeneration(generation: string) {
  console.log(generation)
  const res = await request.get(
    `https://pokeapi.co/api/v2/generation/${generation}`
  )

  return res.body as PokemonGeneration
}

export async function fetchPokemonByName(name: string) {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.body as Pokemon
}
export async function fetchGenerations() {
  const res = await request.get(`https://pokeapi.co/api/v2/generation`)

  return res.body.results as ApiLink[]
}
export function usePokemon(gen: string) {
  return useQuery({
    queryKey: ['generation'],
    queryFn: () => fetchPokemonGeneration(gen),
  })
}
