const SUPPORTED_CUISINES = [
  'finnish',
  'iraqi',
  'turkish',
  'russian',
  'ukrainian',
];

export const getDishLocaleKey = (cuisineName, dishId, field) => {
  const cuisineKey = cuisineName?.toLowerCase?.() || 'finnish';
  return `dishes.${cuisineKey}.${dishId}.${field}`;
};

const getLocalizedValue = (dishId, field, cuisineName, t) => {
  const cuisineKey = cuisineName?.toLowerCase?.() || 'finnish';
  const primaryKey = getDishLocaleKey(cuisineKey, dishId, field);
  const primaryValue = t(primaryKey, { defaultValue: '' });
  if (primaryValue) return primaryValue;

  for (const fallbackCuisine of SUPPORTED_CUISINES) {
    if (fallbackCuisine === cuisineKey) continue;
    const fallbackKey = getDishLocaleKey(fallbackCuisine, dishId, field);
    const fallbackValue = t(fallbackKey, { defaultValue: '' });
    if (fallbackValue) return fallbackValue;
  }

  return undefined;
};

export const localizeDish = (dish, cuisineName, t) => {
  if (!dish || !t) return dish;

  const localizedName = getLocalizedValue(dish.id, 'name', cuisineName, t);
  const localizedDescription = getLocalizedValue(dish.id, 'description', cuisineName, t);

  return {
    ...dish,
    name: localizedName || dish.name,
    description: localizedDescription || dish.description,
  };
};
