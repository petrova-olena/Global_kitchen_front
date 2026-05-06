import { useMenu } from "./useMenu";
import { useTheme } from "../../context/ThemeContext";
import { getOriginFromCuisine } from "../../utils/cuisineOriginMap";

export function useDailyMenu() {
  const { currentCuisine } = useTheme(); // Get current cuisine from theme
  const origin = getOriginFromCuisine(currentCuisine); // Map to backend origin
  const { weeklySets, weeklyDishes } = useMenu(origin);
  if (!weeklySets?.length || !weeklyDishes?.length) return [];
  const today = new Date().getDay(); // 0–6
  const day = today === 0 ? 7 : today; // 7 = Sunday
  // Search all sets for the current day
  const sameDaySets = weeklySets.filter((s) => s.day_id === day);

  let set = null;

  if (sameDaySets.length === 1) {
    set = sameDaySets[0];
  } else if (sameDaySets.length > 1) {
    console.warn("Duplicate day_id in weeklySets:", sameDaySets);
    // Take the last one (by id)
    set = sameDaySets.sort((a, b) => b.id - a.id)[0];
  }

  // If not found — fallback to the closest day
  if (!set) {
    const future = weeklySets
      .filter((s) => s.day_id > day)
      .sort((a, b) => a.day_id - b.day_id);

    if (future.length > 0) {
      set = future[0];
    } else {
      const sorted = [...weeklySets].sort((a, b) => a.day_id - b.day_id);
      set = sorted[0];
    }
  }

  if (!set) return [];

  const ids = [
    set.soup_id,
    set.main_dish_id,
    set.side_dish_id,
    set.salad_id,
    set.dessert_id,
    set.drink_id,
  ];

  return ids.map((id) => weeklyDishes.find((d) => d.id === id)).filter(Boolean);
}
