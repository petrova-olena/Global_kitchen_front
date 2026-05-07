# Quick Start - Theme System

## Use in Any Component - 3 Ways

### Way 1: Display Current Cuisine

```jsx
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { currentCuisine, cuisineDetails } = useTheme();
  
  return <h1>{cuisineDetails.emoji} {currentCuisine}</h1>;
}
```

### Way 2: Conditional Content

```jsx
export function Menu() {
  const { currentCuisine } = useTheme();
  
  if (currentCuisine === 'Finnish') return <FinnishMenu />;
  if (currentCuisine === 'Turkish') return <TurkishMenu />;
  // ... etc
}
```

### Way 3: Theme Colors

```jsx
export function Card() {
  const { cuisineDetails } = useTheme();
  
  return (
    <div style={{ borderLeft: `4px solid ${cuisineDetails.color}` }}>
      Content
    </div>
  );
}
```

---

## Test Different Cuisines

1. Click 🍽️ button (bottom-right corner)
2. Pick a date in the calendar
3. See content change instantly

---

## What You Get

```javascript
const {
  currentCuisine,      // "Finnish", "Iraqi", "Turkish", "Russian", "Ukrainian"
  cuisineDetails,      // { emoji, color, name, description, id }
  weekNumber,          // 1-53
  activeDate,          // Current date (real or overridden)
  isOverrideActive,    // true if debug date is set
  isDebugMode,         // Debug mode toggle
} = useTheme();
```

---

## Cuisine Details Structure

```javascript
{
  id: 'finnish',
  name: 'Finnish',
  color: '#003580',           // Use for styling
  emoji: '🇫🇮',
  description: 'Finnish cuisine - wholesome and seasonal'
}
```

---

## Common Patterns

### Pattern 1: Banner with Current Theme

```jsx
<div style={{
  background: `${cuisineDetails.color}20`,
  borderLeft: `4px solid ${cuisineDetails.color}`,
  padding: '16px'
}}>
  <h2>{cuisineDetails.emoji} {currentCuisine} Week</h2>
</div>
```

### Pattern 2: Themed Button

```jsx
<button style={{
  background: cuisineDetails.color,
  color: 'white'
}}>
  Explore {currentCuisine} Menu
</button>
```

### Pattern 3: Week Information

```jsx
const { weekNumber, activeDate } = useTheme();

<p>
  Week {weekNumber} • 
  {activeDate.toLocaleDateString()}
</p>
```

### Pattern 4: Switch Content by Cuisine

```jsx
const components = {
  Finnish: <FinnishExperience />,
  Iraqi: <IraqiExperience />,
  Turkish: <TurkishExperience />,
  Russian: <RussianExperience />,
  Ukrainian: <UkrainianExperience />
};

return components[currentCuisine];
```

---

## Debug Panel Features

| Feature | How | Purpose |
|---------|-----|---------|
| **Date Picker** | Click calendar | Jump to any week |
| **+1 Week** | Button | Test next cuisine |
| **-1 Week** | Button | Test previous cuisine |
| **Reset** | Button | Back to today |
| **Cuisine Cycle** | View list | See what's next |
| **Countdown** | Automatic | Days to next change |

---

## Files Reference

| File | Purpose |
|------|---------|
| `context/ThemeContext.jsx` | State management & hook |
| `utils/themeUtils.js` | Date/week calculations |
| `components/ThemeDebugger.jsx` | Debug UI |
| `components/themeDebugger.css` | Debug styling |
| `THEME_SYSTEM.md` | Full documentation |

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Can't see 🍽️ button | Scroll to bottom-right corner |
| Theme not changing | Wait until Monday or use debug panel |
| Override not saving | Check if localStorage is enabled |
| useTheme() error | Component must be inside `<ThemeProvider>` |

---

## Next: Integrate with Backend

When your backend is ready:

```javascript
const { currentCuisine } = useTheme();

useEffect(() => {
  fetch(`/api/menu/${currentCuisine}`)
    .then(res => res.json())
    .then(data => setMenu(data));
}, [currentCuisine]);
```

---
