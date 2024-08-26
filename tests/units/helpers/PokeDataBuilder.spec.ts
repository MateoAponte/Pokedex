import { describe, it, expect, beforeEach, vi } from 'vitest';

import {
  getSprite,
  getPokemonTypes,
  getPokemonPassives,
  getDecenes,
  getStats,
  buildCurrentPokemonData,
} from '@/helpers/PokeDataBuilder';
import PokemonByName from '../__mocks__/payloads/PokemonByName.json';
import PokemonTypes from '../__mocks__/payloads/PokemonTypes.json';
import PokemonPassives from '../__mocks__/payloads/PokemonPassives.json';
import PokemonData from '../__mocks__/payloads/PokemonPassives.json';

describe('The PokeDataBuilder File should works correctly and will build the data by the helpers', () => {
  beforeEach(() => {
    // Resetea los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('Should get the sprite from all the data', () => {
    const sprite = getSprite(PokemonByName.sprites);
    expect(sprite).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif'
    );
  });

  it('Should get types from the pokemon', () => {
    const types = getPokemonTypes([PokemonTypes]);
    expect(types).toStrictEqual([
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png',
    ]);
  });

  it('Should get the passive abilities from the pokemon', () => {
    const types = getPokemonPassives([PokemonPassives]);
    expect(types).toStrictEqual([
      {
        description:
          "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
        isHidden: false,
        name: 'chlorophyll',
      },
    ]);
  });

  it('Should get the parsed id from the pokemon', () => {
    const types = getDecenes(1);
    expect(types).toStrictEqual('0001');
  });

  it('Should get all the data from the pokemon', () => {
    const types = buildCurrentPokemonData({ data: PokemonByName });
    expect(types).toStrictEqual({
      favorite: false,
      height: 20,
      id: 3,
      name: 'venusaur',
      passives: [
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/',
          },
          is_hidden: true,
          slot: 3,
        },
      ],
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
      stats: [
        {
          name: 'hp',
          stat: 80,
        },
        {
          name: 'attack',
          stat: 82,
        },
        {
          name: 'defense',
          stat: 83,
        },
        {
          name: 'special-attack',
          stat: 100,
        },
        {
          name: 'special-defense',
          stat: 100,
        },
        {
          name: 'speed',
          stat: 80,
        },
      ],
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/',
          },
        },
        {
          slot: 2,
          type: {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/',
          },
        },
      ],
      weight: 1000,
    });
  });

  it('Should get the parsed stats from the pokemon', () => {
    const types = getStats(PokemonByName.stats);
    expect(types).toStrictEqual([
      {
        name: 'hp',
        stat: 80,
      },
      {
        name: 'attack',
        stat: 82,
      },
      {
        name: 'defense',
        stat: 83,
      },
      {
        name: 'special-attack',
        stat: 100,
      },
      {
        name: 'special-defense',
        stat: 100,
      },
      {
        name: 'speed',
        stat: 80,
      },
    ]);
  });
});
