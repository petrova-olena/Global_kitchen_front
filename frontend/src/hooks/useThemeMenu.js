/**
 * useThemeMenu Hook
 * Combines Theme Context with Menu data
 * Automatically fetches menu for current week's cuisine
 */

import { useTheme } from '../context/ThemeContext';
import { useMenu } from '../components/Menu/useMenu';
import { getOriginFromCuisine } from '../utils/cuisineOriginMap';
import { getHeroContent } from '../utils/heroContentConfig';
import { useTranslation } from 'react-i18next';
import { localizeDish } from '../utils/dishTranslation';

export function useThemeMenu() {
  const { t } = useTranslation();
  const { currentCuisine, cuisineDetails, weekNumber, activeDate } = useTheme();
  // Get backend origin from theme cuisine name
  const origin = getOriginFromCuisine(currentCuisine);
  console.log('[useThemeMenu] Current cuisine:', currentCuisine, 'Origin:', origin);
  // Fetch menu data for this origin
  const { weeklySets, weeklyDishes, dishById, loading, error } = useMenu(origin);
  const localizedWeeklyDishes = weeklyDishes.map((dish) =>
    localizeDish(dish, currentCuisine, t),
  );
  const localizedDishById = Object.fromEntries(
    localizedWeeklyDishes.map((dish) => [dish.id, dish]),
  );

  // Get hero content for this cuisine with i18n support
  const heroContent = getHeroContent(currentCuisine, t);
  return {
    // Theme info
    currentCuisine,
    cuisineDetails,
    weekNumber,
    activeDate,
    // Menu data
    weeklySets,
    weeklyDishes: localizedWeeklyDishes,
    dishById: localizedDishById,
    loading,
    error,
    // Hero content
    heroContent,
    // Convenience: Get dishes for a specific category
    getSoupDishes: () => weeklySets.map((set) => localizedDishById[set.soup_id]).filter(Boolean),
    getMainDishes: () => weeklySets.map((set) => localizedDishById[set.main_dish_id]).filter(Boolean),
    getSideDishes: () => weeklySets.map((set) => localizedDishById[set.side_dish_id]).filter(Boolean),
    getSalads: () => weeklySets.map((set) => localizedDishById[set.salad_id]).filter(Boolean),
    getDesserts: () => weeklySets.map((set) => localizedDishById[set.dessert_id]).filter(Boolean),
    getDrinks: () => weeklySets.map((set) => localizedDishById[set.drink_id]).filter(Boolean),
  };
}
