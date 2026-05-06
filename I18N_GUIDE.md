# i18n Setup Guide - Global Kitchen

## Overview

Your website now supports **English (EN)** and **Finnish (FI)** languages using **i18next** and **react-i18next**.

## 📁 File Structure

```
src/
├── i18n.js                 # i18n configuration
├── locales/
│   ├── en.json            # English translations
│   └── fi.json            # Finnish translations
├── main.jsx               # i18n initialized here
├── components/
│   └── Layout.jsx         # Language switcher
└── views/
    ├── Home.jsx           # Using translations
    ├── Auth.jsx           # Using translations
    ├── Calendar.jsx       # Using translations
    └── Menu.jsx           # Using translations
```

## 🚀 How It Works

### 1. **Language Persistence**

- Current language is saved to localStorage as `language`
- When user returns, their language preference is restored

### 2. **Language Switcher**

- Buttons in the header (EN/FI)
- Located in `Layout.jsx`
- Automatically switches all UI text

### 3. **Using Translations in Components**

#### Import and use the hook:

```javascript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return <h1>{t("home.title")}</h1>;
};
```

#### Access nested keys with dot notation:

```javascript
t("home.title"); // "Welcome to Finnish Week" (EN) or "Tervetuloa..." (FI)
t("menu.soups"); // "Soups" (EN) or "Keitot" (FI)
t("common.save"); // "Save" (EN) or "Tallenna" (FI)
```

## 📝 Translation Files Structure

**en.json** and **fi.json** are organized by section:

- `header` - Header/navigation
- `nav` - Navigation links
- `footer` - Footer text
- `home` - Home page
- `auth` - Authentication pages
- `calendar` - Calendar page
- `menu` - Menu page
- `profile` - Profile page
- `admin` - Admin panel
- `common` - Common terms

## ✏️ How to Add New Translations

### 1. Add to both JSON files

**en.json:**

```json
{
  "home": {
    "title": "Welcome to Finnish Week",
    "newFeature": "New Feature Text"
  }
}
```

**fi.json:**

```json
{
  "home": {
    "title": "Tervetuloa Suomalaisen viikon juhlistamiseen",
    "newFeature": "Uuden ominaisuuden teksti"
  }
}
```

### 2. Use in component

```javascript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("home.title")}</h1>
      <p>{t("home.newFeature")}</p>
    </>
  );
};
```

## 🔄 Common Use Cases

### Dynamic text

```javascript
<h1>{t("menu.title")}</h1>
```

### Button labels

```javascript
<button>{t("common.save")}</button>
```

### Placeholder text

```javascript
<input placeholder={t("auth.username")} />
```

### Combine with variables (interpolation)

```javascript
// en.json: "greeting": "Welcome, {{name}}!"
<p>{t("greeting", { name: "John" })}</p>
```

## 🎯 Current Translation Coverage

The following pages are already translated:

- ✅ Layout (Header, Navigation, Footer)
- ✅ Home Page
- ✅ Auth Page (Sign In/Sign Up)
- ✅ Calendar Page
- ✅ Menu Page

**Still need translations:**

- ❌ DailyMenu.jsx
- ❌ Profile.jsx
- ❌ AdminPanel.jsx
- ❌ Components (Calendar, Events, etc.)

## 🛠️ Installation & Setup (Already Done)

```bash
npm install i18next react-i18next
```

## 📱 Language Detection Priority

1. User's selection (stored in localStorage)
2. Browser language (if supported: en/fi)
3. Default: English

## 🧪 Testing Language Switch

1. Click **EN** or **FI** button in header
2. Page content should update immediately
3. Refresh page - language preference persists
4. Check browser console for i18next logs if needed

## 📚 Additional Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Guide](https://react.i18next.com/)

## ⚠️ Common Issues

### Missing translations?

- Check JSON key spelling matches component usage
- Ensure both en.json and fi.json have the same keys
- Use `t('key')` not `t("key")`

### Translations not updating?

- Restart dev server: `npm run dev`
- Clear browser cache
- Check localStorage isn't overriding selection

### How to debug?

```javascript
const { i18n } = useTranslation();
console.log("Current language:", i18n.language);
console.log("Loaded resources:", i18n.store.data);
```
