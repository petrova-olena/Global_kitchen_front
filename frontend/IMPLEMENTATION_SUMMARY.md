# Week-Based Cuisine Theme System - Implementation Summary

**Date:** May 4, 2026  
**Project:** Global Kitchen Frontend  
**Status:** Complete & Production-Ready

---

## Executive Summary

A fully functional week-based cuisine theme system was implemented for the Global Kitchen website. The system automatically cycles through 5 national cuisines (Finnish, Iraqi, Turkish, Russian, Ukrainian) every week based on the device's date/time, with comprehensive debugging capabilities.

**Result:** Production-ready, zero external dependencies, fully integrated with existing codebase.

---

## Requirements

### Original Task
> *"Main concept of our website is to change its content according to theme of the week... The page changes based on the theme/nationality filter... we want to cycle cuisines... Check users device or web-browser time and have the ability to change it manually for debugging purposes."*

### Cuisines to Cycle
- 🇫🇮 Finnish
- 🇮🇶 Iraqi
- 🇹🇷 Turkish
- 🇷🇺 Russian
- 🇺🇦 Ukrainian

---

## Implementation Details

### Core Architecture

#### 1. **themeUtils.js** - Utility Functions
Core logic for week calculations and cuisine mapping:

```javascript
// Week calculation (ISO 8601)
getWeekNumber(date) → number

// Cuisine mapping
getCuisineForDate(date) → string
// Formula: (Week - 1) % 5 cycles through 5 cuisines

// Cuisine details with metadata
getCuisineDetails(cuisineName) → {
  id, name, color, emoji, description
}

// Additional helpers
getTimeUntilNextCuisine(date)
getAvailableCuisines()
parseOverrideDate(dateString)
formatDateString(date)
```

#### 2. **ThemeContext.jsx** - State Management
React Context providing global theme state:

```javascript
useTheme() → {
  currentCuisine,      // Active cuisine name
  cuisineDetails,      // Metadata with color, emoji
  weekNumber,          // ISO week number
  activeDate,          // Current or overridden date
  realDate,            // Actual device time
  isOverrideActive,    // Debug flag
  isDebugMode,         // Debug mode toggle
  setOverrideDate,     // Override date function
  clearOverride,       // Reset function
  toggleDebugMode      // Toggle function
}
```

**Features:**
- localStorage persistence for overrides
- Automatic time sync every 60 seconds
- No external dependencies

#### 3. **ThemeDebugger.jsx** - Debug Panel UI
Interactive floating panel for testing:

**Features:**
- Floating button (bottom-right, z-index: 998)
- Date picker to jump to any week
- Quick jump buttons (+1 week, -1 week, +1 day)
- Countdown timer to next change
- Visual cuisine cycle indicator
- System time info display
- Debug mode toggle
- Fully responsive design

#### 4. **themeDebugger.css** - Styling
Beautiful, modern UI with:
- Gradient backgrounds
- Smooth animations
- Mobile responsiveness
- Accessibility features
- Unique class names (no conflicts)

#### 5. **ThemeExample.jsx** - Usage Reference
Example component showing best practices

---

## How It Works

### The Formula
```
Cuisine Index = (Week Number - 1) % 5
```

**Example Timeline:**
```
Week 1  → Finnish    🇫🇮
Week 2  → Iraqi      🇮🇶
Week 3  → Turkish    🇹🇷
Week 4  → Russian    🇷🇺
Week 5  → Ukrainian  🇺🇦
Week 6  → Finnish    🇫🇮 (repeats)
...
Week 53 → Turkish    🇹🇷
```

### Data Flow
```
┌─────────────────────────────────┐
│    Device/Browser Time          │
│    (updates every 60 seconds)   │
└────────────┬────────────────────┘
             │
    ┌────────▼─────────────┐
    │  localStorage Check  │
    │ themeOverrideDate?   │
    └────────┬─────────────┘
             │
    ┌────────▼──────────────┐
    │   Active Date         │
    │ (real or override)    │
    └────────┬──────────────┘
             │
    ┌────────▼────────────────────┐
    │  Calculate Week Number      │
    │  (ISO 8601)                 │
    └────────┬────────────────────┘
             │
    ┌────────▼──────────────┐
    │  Map to Cuisine       │
    │  Index = (W-1) % 5    │
    └────────┬──────────────┘
             │
    ┌────────▼────────────────────┐
    │  Provide via useTheme()     │
    │  in all components         │
    └─────────────────────────────┘
```

---

## Integration

### App.jsx Changes
```jsx
import { ThemeProvider } from "./context/ThemeContext";
import ThemeDebugger from "./components/ThemeDebugger";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* all routes */}
        </Routes>
        <ThemeDebugger />
      </BrowserRouter>
    </ThemeProvider>
  );
};
```

### Using in Components
```jsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { currentCuisine, cuisineDetails, weekNumber } = useTheme();
  
  return (
    <div style={{ borderColor: cuisineDetails.color }}>
      <h1>{cuisineDetails.emoji} {currentCuisine}</h1>
    </div>
  );
}
```

---

## Compatibility Verification

### Existing Stack
| Package | Version | Status |
|---------|---------|--------|
| React | 19.2.4 | ✅ Compatible |
| react-router-dom | 7.14.0 | ✅ Compatible |
| i18next | 26.0.8 | ✅ Independent |
| AuthContext | - | ✅ Coexists |

### Dependencies Required
**Zero additional packages needed!**
- Uses only React built-in features
- Context API + Hooks
- No third-party libraries

### Conflict Analysis
- ✅ CSS class names unique (no conflicts)
- ✅ Fixed positioning doesn't interfere
- ✅ localStorage keys unique
- ✅ Works alongside AuthProvider
- ✅ Works alongside i18n system

---

## Cuisine Details

Each cuisine includes:
```javascript
{
  id: 'finnish',                    // Identifier
  name: 'Finnish',                  // Display name
  emoji: '🇫🇮',                    // Flag emoji
  color: '#003580',                 // Brand color (hex)
  description: 'Wholesome and...'   // Marketing text
}
```

### Color Codes
- **Finnish:** `#003580` (Deep Blue)
- **Iraqi:** `#CE1126` (Red)
- **Turkish:** `#E30A17` (Red)
- **Russian:** `#0039A6` (Blue)
- **Ukrainian:** `#4C7FE5` (Blue)

---

## Debug Features

### Access Debug Panel
Click 🍽️ button in bottom-right corner

### Available Functions
1. **View Current Theme**
   - Cuisine name & emoji
   - Week number
   - Active date
   - Override status badge

2. **Override Date**
   - Calendar input to pick any date
   - Instantly see that week's cuisine
   - Persists to localStorage

3. **Quick Jump**
   - +1 Week button
   - -1 Week button
   - +1 Day button
   - Cycle through all cuisines in seconds

4. **Countdown**
   - Days/hours/minutes to next change
   - Exact date of next change

5. **Cuisine Cycle**
   - Visual list of all 5 cuisines
   - Highlights current active cuisine

6. **System Info**
   - Real device time
   - Displayed time (if overridden)
   - Comparison view

7. **Debug Mode Toggle**
   - Enable/disable debug features
   - Persists to localStorage

---

## File Structure

```
frontend/src/
├── App.jsx                        (UPDATED)
│   └── Wrapped with ThemeProvider
│       Added ThemeDebugger
│
├── context/
│   ├── AuthContext.js            (existing)
│   ├── AuthContext.jsx           (existing)
│   └── ThemeContext.jsx           (NEW)
│       └── useTheme() hook
│
├── utils/
│   ├── dateHelpers.js            (existing)
│   ├── fetchData.js              (existing)
│   └── themeUtils.js             (NEW)
│       └── Week calculations, cuisine mapping
│
└── components/
    ├── ThemeDebugger.jsx         (NEW)
    ├── themeDebugger.css         (NEW)
    └── ThemeExample.jsx          (NEW)
        └── Usage reference
```

---

## Testing Checklist

### Automatic Features
- [x] Week calculation works correctly
- [x] Cuisine cycles every 5 weeks
- [x] Time updates every 60 seconds
- [x] localStorage persistence works
- [x] Debug panel renders correctly

### Debug Panel
- [x] 🍽️ button visible and clickable
- [x] Date picker updates cuisine instantly
- [x] Quick jump buttons work (+1/-1 week, +1 day)
- [x] Reset button clears override
- [x] Countdown timer displays correctly
- [x] Cuisine cycle shows all 5 options
- [x] System info displays real vs displayed time

### Integration
- [x] ThemeProvider wraps entire app
- [x] useTheme() hook works in components
- [x] No conflicts with AuthContext
- [x] No conflicts with i18n
- [x] No CSS conflicts with existing styles
- [x] Works on mobile devices

---

## Usage Examples

### Example 1: Display Current Cuisine
```jsx
function Header() {
  const { currentCuisine, cuisineDetails } = useTheme();
  
  return (
    <h1>{cuisineDetails.emoji} {currentCuisine}</h1>
  );
}
```

### Example 2: Theme-Colored Component
```jsx
function Card() {
  const { cuisineDetails } = useTheme();
  
  return (
    <div style={{
      borderLeft: `4px solid ${cuisineDetails.color}`,
      backgroundColor: `${cuisineDetails.color}20`
    }}>
      Content
    </div>
  );
}
```

### Example 3: Conditional Content
```jsx
function Menu() {
  const { currentCuisine } = useTheme();
  
  const menus = {
    Finnish: <FinnishMenu />,
    Iraqi: <IraqiMenu />,
    Turkish: <TurkishMenu />,
    Russian: <RussianMenu />,
    Ukrainian: <UkrainianMenu />
  };
  
  return menus[currentCuisine];
}
```

### Example 4: With i18n
```jsx
function Menu() {
  const { t } = useTranslation();
  const { currentCuisine } = useTheme();
  
  return (
    <h1>{t('menu.title')} - {currentCuisine}</h1>
  );
}
```

---

## Next Steps

### Phase 1: Component Integration (Recommended)
1. Update Home.jsx - Add theme to hero section
2. Update Menu.jsx - Show cuisine-specific items
3. Update Calendar.jsx - Highlight themed events
4. Update Layout.jsx - Add theme indicator

### Phase 2: Backend Integration (When Ready)
```javascript
const { currentCuisine } = useTheme();

useEffect(() => {
  fetch(`/api/menu/${currentCuisine}`)
    .then(res => res.json())
    .then(data => setMenu(data));
}, [currentCuisine]);
```

### Phase 3: Polish (Optional)
- Add transition animations
- Add theme preview modal
- Add user preference override
- Add analytics tracking

---

## Key Insights

| Aspect | Details |
|--------|---------|
| **Automatic** | Works based on device time with no manual intervention |
| **Debuggable** | Full control via debug panel for testing |
| **Persistent** | Override dates survive page reloads via localStorage |
| **Themeable** | Each cuisine has distinct colors, emoji, description |
| **Responsive** | Debug panel adapts to mobile/desktop |
| **Fast** | No external dependencies, lightweight |
| **Global** | Available everywhere via useTheme() hook |
| **Offline** | Works completely offline until backend integrated |
| **Compatible** | Works perfectly alongside existing AuthContext & i18n |

---

##  LocalStorage Keys

```javascript
{
  "themeOverrideDate": "2026-01-21",  // or null if not set
  "themeDebugMode": "true"            // or "false"
}
```

**Persistence:**
- ✅ Survives page reload
- ✅ Survives browser restart
- ✅ Clears when browser cache cleared

---

##  Production Ready

**What's Complete:**
- ✅ Core theme logic
- ✅ Context & hooks
- ✅ Debug panel UI
- ✅ App integration
- ✅ localStorage persistence
- ✅ Full compatibility verification
- ✅ Zero conflicts
- ✅ Example components
- ✅ Tested in existing codebase

**What Works:**
- ✅ Automatic cuisine cycling
- ✅ Device time detection
- ✅ Manual override for debugging
- ✅ Global state access
- ✅ Mobile responsive
- ✅ Zero external dependencies

**No Known Issues** 

---

## Quick Reference

### Import Hook
```jsx
import { useTheme } from '../context/ThemeContext';
```

### Use in Component
```jsx
const { currentCuisine, cuisineDetails, weekNumber } = useTheme();
```

### Import Utilities
```javascript
import {
  getWeekNumber,
  getCuisineForDate,
  getCuisineDetails,
  getTimeUntilNextCuisine
} from '../utils/themeUtils';
```

### Access Debug Panel
Click 🍽️ in bottom-right corner

### Reset Debug Override
1. Click button
2. Click "Reset to Today"
3. Refreshes to actual device time

---

