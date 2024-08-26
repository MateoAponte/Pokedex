import { AxiosResponse } from 'axios';
import { PokemonApi } from '@/interfaces/api/PokemonApi';
import LocalStorageManagment from './LocalStorageManagment';
import { Pokemon } from '@/interfaces/pokemon/Pokemon';
import { Stat } from '@/interfaces/pokemon/Stat';
import { Passive } from '@/interfaces/pokemon/Passive';

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

export const getPokemonPassives = (passives: any): Passive[] => {
  return passives.map((elementPassive: any) => {
    const getEnglishText = elementPassive.effect_entries.find(
      (effect: any) => effect.language.name === 'en'
    );

    return {
      name: elementPassive.name,
      description: getEnglishText.effect,
      isHidden: elementPassive.isHidden || false,
    };
  });
};

export const getDecenes = (id: number): string => {
  const number = id || 0;
  return number.toString().padStart(4, '0');
};

export const getStats = (stats: any): Stat[] => {
  return stats.map((elementStat: any) => ({
    stat: elementStat.base_stat,
    name: elementStat.stat.name,
  }));
};

export const buildCurrentPokemonData = (
  response: AxiosResponse<PokemonApi>
): Pokemon => {
  if (response.data) {
    const { name, weight, height, sprites, stats, types, id, abilities } =
      response.data;

    const items = LocalStorageManagment.getItem(LocalStorageManagment.key);
    let parsedItems = null;
    if (items)
      parsedItems = JSON.parse(items).find(
        (item: PokemonApi) => item.id === id
      );

    return {
      name,
      weight,
      height,
      sprite: getSprite(sprites),
      types,
      id,
      stats: getStats(stats),
      passives: abilities,
      favorite: parsedItems?.favorite || false,
    };
  }
  return {
    name: '',
    weight: 0,
    height: 0,
    sprite: '',
    types: [],
    id: 0,
    favorite: false,
    stats: [],
    passives: [],
  };
};
