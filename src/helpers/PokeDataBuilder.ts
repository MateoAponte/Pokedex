export const getSprite = (sprites: any) => {
  return sprites.versions['generation-v']
    ? sprites.versions['generation-v']['black-white'].animated.front_default
    : sprites.front_default;
};

export const getPokemonTypes = (types: any) => {
  return types.map(
    (elementType: any) =>
      elementType.sprites['generation-viii']['sword-shield'].name_icon
  );
};
