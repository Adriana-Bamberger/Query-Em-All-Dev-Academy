//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import {
  // waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react/pure'
import nock from 'nock'
import { renderRoute } from '../../test/setup'




nock.disableNetConnect()

const generationNum = 1
const mockGeneration = {
  main_region: { name: 'Kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
  pokemon_species: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
  ],
}

describe('<PokemonList/>', () => {
  it('should render a loading indicator when waiting for data to load', async () => {
    // Arrange
    const scope = nock('https://pokeapi.co')
      .get(`/api/v2/generation/${generationNum}`)
      .reply(200, mockGeneration)

    // Act
    const { ...screen } = renderRoute('/')

    // Assert
    const loading = await screen.findByText(/loading/i)

    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('should render some Pokemon names', async () => {
    // Arrange
    const scope = nock('https://pokeapi.co')
      .get(`/api/v2/generation/${generationNum}`)
      .reply(200, mockGeneration)

    // Act
    const { ...screen } = renderRoute('/')

    // await waitForElementToBeRemoved(() => screen.findByText(/loading/i))

    // Assert
    const list = await screen.findByRole('list')
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)
    expect(listItems).toMatchInlineSnapshot(`
      [
        "bulbasaur",
        "charmander",
      ]
    `)
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong', async () => {
    // Arrange
    const scope = nock('https://pokeapi.co')
      .get(`/api/v2/generation/${generationNum}`)
      .reply(500)

    // Act
    const { ...screen } = renderRoute('/')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    // Assert
    const error = screen.getByText('Error!')

    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

})


