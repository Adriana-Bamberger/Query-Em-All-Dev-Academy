import { Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { fetchGenerations } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function Generation() {
  const {
    data: generations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['generations'],
    queryFn: () => fetchGenerations(),
  })
  if (generations)
    return (
      <div>
        <h1>Choose a Generation:</h1>
        <ul>
          {generations.map((g, i: number) => (
            <li key={i}>
              <Link to={`/generation/${i + 1}`}>{g.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  if (isLoading) return <LoadingSpinner />
  if (isError) return error.message
}
