import PokeApi from '@/api/PokeApi';
import axios from 'axios';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import PaginatedPokemonJson from '../__mocks__/payloads/PaginatedPokemons.json';
import PokemonByName from '../__mocks__/payloads/PokemonByName.json';
import PokemonTypes from '../__mocks__/payloads/PokemonTypes.json';
import axiosMocked from '../__mocks__/axiosMocked';
import ApiFunctions from '../__mocks__/helpers/ApiFunctions';

const getObjectRequest = (url) => {
  return {
    url,
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('The Poke API File should works correctly and call axios to comunicate with the endpoints', () => {
  describe('Check all the posibilities of the getAllPokemons method', () => {
    test('Should call the method and this gonna call the axios.request method', async () => {
      axiosMocked.get.mockResolvedValueOnce(PaginatedPokemonJson);
      const offset = 0;
      const limit = 20;

      const response = await PokeApi.getAllPokemons(offset, limit);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${
          getObjectRequest(import.meta.env.VITE_APP_POKEMON_ENDPOINT).url
        }?offset=${offset}&limit=${limit}`
      );
      expect(response).toEqual(PaginatedPokemonJson);
    });
    test('Should call the method and show an error when the param is invalid', async () => {
      ApiFunctions.shouldShowErrorWhenParamIsInvalid(() =>
        PokeApi.getAllPokemons(undefined, undefined)
      );
    });
    test('Should call the method and show an error when endpoints failed', async () => {
      ApiFunctions.shouldShowErrorWhenEndpointsFail(
        'The Endpoint get all pokemon by name failed'
      );
    });
  });

  describe('Check all the posibilities of the getPokemonByName method', () => {
    test('Should call the method and this gonna call the axios.request method', async () => {
      axiosMocked.get.mockResolvedValueOnce(PokemonByName);
      const name = 'bulbasaur';

      const response = await PokeApi.getPokemonByName(name);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${
          getObjectRequest(import.meta.env.VITE_APP_POKEMON_ENDPOINT).url
        }/${name}`
      );
      expect(response).toEqual(PokemonByName);
    });
    test('Should call the method and show an error when the param is invalid', async () => {
      ApiFunctions.shouldShowErrorWhenParamIsInvalid(() =>
        PokeApi.getPokemonByName(undefined)
      );
    });
    test('Should call the method and show an error when endpoints failed', async () => {
      ApiFunctions.shouldShowErrorWhenEndpointsFail(
        'The Endpoint get pokemon by name failed'
      );
    });
  });

  describe('Check all the posibilities of the getTypes method', () => {
    test('Should call the method and this gonna call the axios.request method', async () => {
      axiosMocked.get.mockResolvedValueOnce(PokemonTypes);
      const typeUrl = 'https://pokeapi.co/api/v2/type/12/';

      const response = await PokeApi.getTypes(typeUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${typeUrl}`);
      expect(response).toEqual(PokemonTypes);
    });
    test('Should call the method and show an error when the param is invalid', async () => {
      ApiFunctions.shouldShowErrorWhenParamIsInvalid(() =>
        PokeApi.getTypes(undefined)
      );
    });
    test('Should call the method and show an error when endpoints failed', async () => {
      ApiFunctions.shouldShowErrorWhenEndpointsFail(
        'The Endpoint get types by name failed'
      );
    });
  });

  describe('Check all the posibilities of the getTypes method', () => {
    test('Should call the method and this gonna call the axios.request method', async () => {
      axiosMocked.get.mockResolvedValueOnce(PokemonTypes);
      const passiveUrl = 'https://pokeapi.co/api/v2/ability/34/';

      const response = await PokeApi.getPassives(passiveUrl);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${passiveUrl}`);
      expect(response).toEqual(PokemonTypes);
    });
    test('Should call the method and show an error when the param is invalid', async () => {
      ApiFunctions.shouldShowErrorWhenParamIsInvalid(() =>
        PokeApi.getPassives(undefined)
      );
    });
    test('Should call the method and show an error when endpoints failed', async () => {
      ApiFunctions.shouldShowErrorWhenEndpointsFail(
        'The Endpoint get passives by name failed'
      );
    });
  });
});
