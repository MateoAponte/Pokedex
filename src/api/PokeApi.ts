import axios from 'axios';
import { CODES_RESPONSE } from '@/constants/code';

class PokeApi {
  public pokemonEndpoint: string;

  constructor() {
    this.pokemonEndpoint = import.meta.env.VITE_APP_POKEMON_ENDPOINT;
  }

  public getAllPokemons(offset: number, limit: number) {
    try {
      if (typeof offset !== 'number' || typeof limit !== 'number')
        throw 'No same type';
      return axios.get(
        `${this.pokemonEndpoint}?offset=${offset}&limit=${limit}`
      );
    } catch (err) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public getPokemonByName(name: string) {
    try {
      if (typeof name !== 'string') throw 'No same type';
      return axios.get(`${this.pokemonEndpoint}/${name}`);
    } catch (err) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public getTypes(url: string) {
    try {
      if (typeof url !== 'string') throw 'No same type';
      return axios.get(url);
    } catch (err) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public getPassives(url: string) {
    try {
      if (typeof url !== 'string') throw 'No same type';
      return axios.get(url);
    } catch (err) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }
}

export default new PokeApi();
