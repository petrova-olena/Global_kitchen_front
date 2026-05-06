/**
 * Maps theme cuisine names to backend origin values
 */

export const CUISINE_TO_ORIGIN = {
  Finnish: 'finnland',
  Iraqi: 'Iraq',
  Turkish: 'turkish',
  Russian: 'russian',
  Ukrainian: 'ukraine',
};

export const getOriginFromCuisine = (cuisineName) => {
  return CUISINE_TO_ORIGIN[cuisineName] || 'finnland'; // fallback to finnish
};

export const isValidCuisine = (cuisineName) => {
  return cuisineName in CUISINE_TO_ORIGIN;
};
