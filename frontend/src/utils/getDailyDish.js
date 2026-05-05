// ------------------------------------------------------------
// TEMPORARY DETERMINISTIC RANDOM
// ------------------------------------------------------------
// This is a temporary deterministic random generator.
// It ensures that:
// - all users see the same selected dishes
// - the selection changes once per day
// - nothing needs to be stored in localStorage
// - no backend support is required
//
// LATER:
// the backend will replace this with an API endpoint:
// GET /api/v1/daily-menu
// which will return the preselected dishes.
// ------------------------------------------------------------

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }
  return () => {
    h = Math.imul(48271, h) % 2147483647;
    return (h & 2147483647) / 2147483647;
  };
}

// ------------------------------------------------------------
// TEMPORARY DAILY DISH SELECTOR
// ------------------------------------------------------------
// This function selects one dish from the weekly dishes
// based on the category (soup, main, side, etc.).
//
// The selection depends on:
// - today's date (YYYY-MM-DD)
// - the dish category
//
// Therefore:
// - the daily menu changes every day
// - all users see the exact same dishes
//
// LATER:
// the backend will replace this logic with:
// GET /api/v1/daily-menu
// and return a ready-made daily menu.
// ------------------------------------------------------------

export function getDailyDish(dishes, type) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const rand = seededRandom(today + type);

  const list = dishes.filter((d) => d.type === type);
  if (!list.length) return null;

  const index = Math.floor(rand() * list.length);
  return list[index];
}
