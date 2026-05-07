# 🍽️ Theme + Menu Integration Guide

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Device Time / Theme                      │
│              (May 6, 2026 → Week 19 → Russian)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                 ┌─────────▼──────────┐
                 │  ThemeContext      │
                 │ (useTheme hook)    │
                 │ currentCuisine:    │
                 │ "Russian"          │
                 │ cuisineDetails: {} │
                 │ weekNumber: 19     │
                 └─────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        │                  │                  │
   ┌────▼────┐        ┌────▼─────┐      ┌────▼──────────────┐
   │useTheme  │        │useThemeM │      │heroContentConfig  │
   │()        │        │enu()     │      │getHeroContent()   │
   │Returns   │        │Combines  │      │Returns hero data  │
   │theme     │        │theme +   │      │- title            │
   │data      │        │menu      │      │- description      │
   │          │        │- cuisine │      │- image            │
   │          │        │- dishes  │      │- cuisine story    │
   │          │        │- hero    │      │- featured dishes  │
   └──────────┘        │content   │      └───────────────────┘
                       └─────┬────┘
                             │
                    ┌────────▼────────┐
                    │  Backend API    │
                    │ /cuisines       │
                    │ /dishes         │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ useMenu(origin) │
                    │- Fetches by     │
                    │  origin         │
                    │- Returns        │
                    │  weeklySets     │
                    │  weeklyDishes   │
                    │  dishById       │
                    └─────────────────┘
```

---

## Data Flow in Home.jsx

```
Home.jsx
  │
  ├─ useDailyMenu()
  │  └─ Returns dishes for today only
  │
  └─ useThemeMenu()  ← COMBINED HOOK
     │
     ├─ Gets: currentCuisine, cuisineDetails, weekNumber
     ├─ Maps: Cuisine → Origin → Backend
     ├─ Fetches: Menu data for this origin
     ├─ Gets: heroContent (images, text, story)
     │
     └─ Returns:
        ├─ currentCuisine: "Russian"
        ├─ cuisineDetails: { emoji: "🇷🇺", color: "#0039A6", ... }
        ├─ weekNumber: 19
        ├─ heroContent: { title, description, image, story, ... }
        ├─ weeklySets: [...dishes for week...]
        ├─ weeklyDishes: [...all dish objects...]
        ├─ dishById: { dishId: dishObject, ... }
        └─ Helper functions:
           ├─ getSoupDishes()
           ├─ getMainDishes()
           ├─ getSideDishes()
           ├─ etc.
```

---

## Component Flow

```
Home.jsx
  │
  ├─ Hero Section
  │  ├─ Background: heroContent.heroImage + cuisineDetails.color
  │  ├─ Title: "{emoji} {Cuisine} Week"
  │  ├─ Subtitle: heroContent.subtitle
  │  └─ Description: heroContent.description
  │
  ├─ Cuisine Story Section
  │  ├─ Story Text: heroContent.cuisineStory
  │  ├─ Featured Dishes: getMainDishes() first 3 items
  │  └─ Styling: uses cuisineDetails.color
  │
  ├─ About Us Section
  │  └─ Static content
  │
  └─ Menu Preview Section
     ├─ Title: "Our Menu - {Cuisine} Week"
     ├─ Grid: MenuGrid(dailyDishes)
     └─ Button: "See Full Menu"
```

---

## File Structure

```
src/
├── context/
│   └── ThemeContext.jsx          (provides currentCuisine, etc.)
│
├── hooks/
│   └── useThemeMenu.js           (NEW - combines theme + menu)
│
├── components/Menu/
│   └── useMenu.js                (MODIFIED - now accepts origin param)
│       └── useMenu(origin)
│
├── utils/
│   ├── themeUtils.js             (week calculations)
│   ├── cuisineOriginMap.js       (NEW - cuisine → origin mapping)
│   ├── heroContentConfig.js      (NEW - hero data per cuisine)
│   └── fetchData.js              (API calls)
│
└── views/pages/
    ├── Home.jsx                  (MODIFIED - uses useThemeMenu)
    └── styles/
        └── hero.css              (MODIFIED - new cuisine-story styles)
```

---

## Key Integration Points

### 1. **Cuisine to Origin Mapping**
```javascript
// utils/cuisineOriginMap.js
Finnish  → "finnish"
Iraqi    → "iraqi"
Turkish  → "turkish"
Russian  → "russian"
Ukrainian → "ukrainian"
```

### 2. **Hook Composition**
```javascript
// hooks/useThemeMenu.js
function useThemeMenu() {
  const { currentCuisine } = useTheme();
  const origin = getOriginFromCuisine(currentCuisine);
  const { weeklySets, weeklyDishes } = useMenu(origin);
  const heroContent = getHeroContent(currentCuisine);
  
  return { ..., heroContent };
}
```

### 3. **Dynamic useMenu**
```javascript
// components/Menu/useMenu.js
export function useMenu(origin = null) {
  const ACTIVE_WEEK_ORIGIN = origin || "finnish";
  // Fetches change when origin changes
}
```

### 4. **Hero Content Per Cuisine**
```javascript
// utils/heroContentConfig.js
HERO_CONTENT_CONFIG = {
  Finnish: {
    emoji: '🇫🇮',
    title: 'Finnish Week',
    description: '...',
    heroImage: 'src/assets/hero-finnish.jpg',
    // ... more fields
  },
  // ... other cuisines
};
```

---

## Usage Examples

### In Home.jsx
```jsx
const { heroContent, currentCuisine, cuisineDetails, getMainDishes } = useThemeMenu();

// Use in render
<section style={{ background: heroContent.backgroundGradient }}>
  <h1>{cuisineDetails.emoji} {heroContent.title}</h1>
  <p>{heroContent.description}</p>
  <div className="dishes-list">
    {getMainDishes().map(dish => (
      <div key={dish.id}>{dish.name}</div>
    ))}
  </div>
</section>
```

### In Menu.jsx (similar approach)
```jsx
const { weeklySets, weeklyDishes, currentCuisine } = useThemeMenu();

// Filter by category and render
const soups = weeklySets.map(s => weeklyDishes[s.soup_id]);
```

### In Calendar.jsx
```jsx
const { currentCuisine, cuisineDetails } = useTheme();

// Highlight events with cuisine color
<div style={{ borderColor: cuisineDetails.color }}>
  {events.map(e => <EventItem key={e.id} event={e} />)}
</div>
```

---

## What Changes When Time Changes

### Before (Hardcoded)
```
Every week → Hardcoded to Finnish
User can't test other cuisines
```

### After (Dynamic)
```
Every week → Theme calculates current week
          → Maps to cuisine
          → Menu Hook fetches by origin
          → Hero section updates automatically
          → Debug panel lets you test any week
```

---

## Testing the Integration

### Step 1: Test with Debug Panel
1. Click 🍽️ button
2. Pick a date (e.g., 2026-01-21 for Turkish)
3. Home page hero updates instantly

### Step 2: Test Different Weeks
- Week 1 (Jan 1-7): Finnish
- Week 2 (Jan 8-14): Iraqi
- Week 3 (Jan 15-21): Turkish
- Week 4 (Jan 22-28): Russian
- Week 5 (Jan 29-Feb 4): Ukrainian

### Step 3: Verify Menu Loads
- Check browser console for API responses
- Verify `useThemeMenu` returns data
- Confirm hero dishes display

---

## Backend Requirements

Your backend should have:

```
GET /cuisines
  Returns: [
    {
      id: 1,
      origin: "finnish",
      day_id: 1,
      soup_id: 10,
      main_dish_id: 20,
      side_dish_id: 30,
      salad_id: 40,
      dessert_id: 50,
      drink_id: 60
    },
    ...
  ]

GET /dishes
  Returns: [
    {
      id: 10,
      name: "Salmon Soup",
      description: "...",
      price: 6.50,
      image: "..."
    },
    ...
  ]
```

---

## Customization

### Add More Cuisines
1. Add to `CUISINE_TO_ORIGIN` in `cuisineOriginMap.js`
2. Add to `HERO_CONTENT_CONFIG` in `heroContentConfig.js`
3. Add to `themeUtils.js` cuisines array
4. Backend must have data for that origin

### Modify Hero Content
Edit `heroContentConfig.js`:
```javascript
HERO_CONTENT_CONFIG = {
  Finnish: {
    title: 'Custom Title',
    description: 'Custom description',
    heroImage: 'custom/path.jpg',
    // ... update fields
  }
};
```

### Change Styling
Edit `hero.css`:
```css
.cuisine-story {
  /* modify colors, spacing, fonts */
}
.dish-tag {
  /* modify tag styling */
}
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Menu not loading | Origin mapping wrong | Check `cuisineOriginMap.js` matches backend |
| Hero image not showing | Image path wrong | Update `heroImage` in `heroContentConfig.js` |
| Cuisine not changing on Monday | Time not syncing | Check `ThemeContext.js` has 60s interval |
| Data not updating on theme change | useMenu dependency missing | Verify `[ACTIVE_WEEK_ORIGIN]` in useEffect |

---

## Summary

✅ **Theme** → Calculates current cuisine  
✅ **Origin Map** → Translates to backend  
✅ **useMenu** → Fetches data dynamically  
✅ **useThemeMenu** → Combines everything  
✅ **Hero Content** → Displays with theme colors/images  
✅ **Home.jsx** → Shows themed hero + featured dishes  
✅ **Debug Panel** → Test any week instantly  

