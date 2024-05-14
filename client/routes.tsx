import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import PokemonList from './components/PokemonList.tsx'
import PokemonDetail from './components/PokemonDetail.tsx'
import Generation from './components/Generation.tsx'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Generation />} />
    <Route path="generation/:generation" element={<PokemonList />} />
    <Route path="pokemon/:name" element={<PokemonDetail />} />
  </Route>
)
