import axios from 'axios';

class PokeApi {
  public pokemonEndpoint: string;

  constructor() {
    console.log(import.meta.env);

    this.pokemonEndpoint = import.meta.env.VITE_APP_POKEMON_ENDPOINT;
  }

  public getAllPokemons(offset: number, limit: number) {
    return axios.get(`${this.pokemonEndpoint}?offset=${offset}&limit=${limit}`);
  }

  public getPokemonByName(name: string) {
    return axios.get(`${this.pokemonEndpoint}/${name}`);
  }
}

export default new PokeApi();
