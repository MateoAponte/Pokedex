import { AxiosResponse } from 'axios';
import { PokemonApi } from '../interfaces/api/PokemonApi';
import LocalStorageManagment from './LocalStorageManagment';
import { Pokemon } from '../interfaces/pokemon/Pokemon';

export const getSprite = (sprites: any): string => {
  const sprite = sprites.versions['generation-v']
    ? sprites.versions['generation-v']['black-white'].animated.front_default
    : sprites.front_default;
  return sprite;
};

export const getPokemonTypes = (types: any): string[] => {
  return types.map(
    (elementType: any) =>
      elementType.sprites['generation-viii']['sword-shield'].name_icon
  );
};

export const getDecenes = (id: number): string => {
  return id.toString().padStart(4, '0');
};

export const buildCurrentPokemonData = (
  response: AxiosResponse<PokemonApi>
): Pokemon => {
  const { name, weight, height, sprites, types, id } = response.data;
  const items = LocalStorageManagment.getItem(LocalStorageManagment.key);
  let parsedItems = null;
  if (items)
    parsedItems = JSON.parse(items).find((item: PokemonApi) => item.id === id);
  return {
    name,
    weight,
    height,
    sprite: getSprite(sprites),
    types,
    id,
    favorite: parsedItems?.favorite || false,
  };
};
