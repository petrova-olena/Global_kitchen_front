import { useMenu } from "./useMenu";
import { getDailyDish } from "../../utils/getDailyDish";

export function useDailyMenu() {
  const { dishes: weeklyDishes } = useMenu();

  const soup = getDailyDish(weeklyDishes, "soup");
  const main = getDailyDish(weeklyDishes, "main");
  const side = getDailyDish(weeklyDishes, "side");
  const salad = getDailyDish(weeklyDishes, "salad");
  const dessert = getDailyDish(weeklyDishes, "dessert");
  const drink = getDailyDish(weeklyDishes, "drink");

  const dailyDishes = [soup, main, side, salad, dessert, drink].filter(Boolean);

  return dailyDishes;
}
