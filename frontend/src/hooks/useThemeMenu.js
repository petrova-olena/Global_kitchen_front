/**
 * useThemeMenu Hook
 * Combines Theme Context with Menu data
 * Automatically fetches menu for current week's cuisine
 */

import { useTheme } from '../context/ThemeContext';
import { useMenu } from '../components/Menu/useMenu';
import { getOriginFromCuisine } from '../utils/cuisineOriginMap';
import { getHeroContent } from '../utils/heroContentConfig';

export function useThemeMenu() {
  const { currentCuisine, cuisineDetails, weekNumber, activeDate } = useTheme();
  // Get backend origin from theme cuisine name
  const origin = getOriginFromCuisine(currentCuisine);
  console.log('[useThemeMenu] Current cuisine:', currentCuisine, 'Origin:', origin);
  // Fetch menu data for this origin
  const { weeklySets, weeklyDishes, dishById, loading, error } =
    useMenu(origin);
  // Get hero content for this cuisine
  const heroContent = getHeroContent(currentCuisine);
  return {
    // Theme info
    currentCuisine,
    cuisineDetails,
    weekNumber,
    activeDate,
    // Menu data
    weeklySets,
    weeklyDishes,
    dishById,
    loading,
    error,
    // Hero content
    heroContent,
    // Convenience: Get dishes for a specific category
    getSoupDishes: () =>
      weeklySets.map((set) => dishById[set.soup_id]).filter(Boolean),
    getMainDishes: () =>
      weeklySets.map((set) => dishById[set.main_dish_id]).filter(Boolean),
    getSideDishes: () =>
      weeklySets.map((set) => dishById[set.side_dish_id]).filter(Boolean),
    getSalads: () =>
      weeklySets.map((set) => dishById[set.salad_id]).filter(Boolean),
    getDesserts: () =>
      weeklySets.map((set) => dishById[set.dessert_id]).filter(Boolean),
    getDrinks: () =>
      weeklySets.map((set) => dishById[set.drink_id]).filter(Boolean),
  };
}
