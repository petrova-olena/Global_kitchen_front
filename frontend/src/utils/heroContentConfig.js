/**
 * Hero Section Content Configuration
 * Stores images, text, and featured dishes info per cuisine
 */

export const HERO_CONTENT_CONFIG = {
  Finnish: {
    emoji: '🇫🇮',
    color: '#003580',
    titleKey: 'home.heroFinnishTitle',
    subtitleKey: 'home.heroFinnishSubtitle',
    heroImage: 'src/assets/finland_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #003580 0%, #002851 100%)',
    descriptionKey: 'home.heroFinnishDescription',
    cuisineStoryKey: 'home.heroFinnishStory',
    // Dynamic dish placeholders - will be replaced with actual dish names
    highlightedDishes: ['dishes.finnish.1.name', 'dishes.finnish.4.name', 'dishes.finnish.2.name'],
  },

  Iraqi: {
    emoji: '🇮🇶',
    color: '#CE1126',
    titleKey: 'home.heroIraqiTitle',
    subtitleKey: 'home.heroIraqiSubtitle',
    heroImage: 'src/assets/iraq_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #CE1126 0%, #9e0a20 100%)',
    descriptionKey: 'home.heroIraqiDescription',
    cuisineStoryKey: 'home.heroIraqiStory',
    highlightedDishes: ['dishes.iraqi.81.name', 'dishes.iraqi.84.name', 'dishes.iraqi.100.name'],
  },

  Turkish: {
    emoji: '🇹🇷',
    color: '#E30A17',
    titleKey: 'home.heroTurkishTitle',
    subtitleKey: 'home.heroTurkishSubtitle',
    heroImage: 'src/assets/turkey_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #E30A17 0%, #b20812 100%)',
    descriptionKey: 'home.heroTurkishDescription',
    cuisineStoryKey: 'home.heroTurkishStory',
    highlightedDishes: ['dishes.turkish.62.name', 'dishes.turkish.63.name', 'dishes.turkish.66.name'],
  },

  Russian: {
    emoji: '🇷🇺',
    color: '#0039A6',
    titleKey: 'home.heroRussianTitle',
    subtitleKey: 'home.heroRussianSubtitle',
    heroImage: 'src/assets/russia_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #0039A6 0%, #002673 100%)',
    descriptionKey: 'home.heroRussianDescription',
    cuisineStoryKey: 'home.heroRussianStory',
    highlightedDishes: ['dishes.russian.21.name', 'dishes.russian.22.name', 'dishes.russian.23.name'],
  },

  Ukrainian: {
    emoji: '🇺🇦',
    color: '#4C7FE5',
    titleKey: 'home.heroUkrainianTitle',
    subtitleKey: 'home.heroUkrainianSubtitle',
    heroImage: 'src/assets/ukraine_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #4C7FE5 0%, #3656c9 100%)',
    descriptionKey: 'home.heroUkrainianDescription',
    cuisineStoryKey: 'home.heroUkrainianStory',
    highlightedDishes: ['dishes.ukrainian.41.name', 'dishes.ukrainian.42.name', 'dishes.ukrainian.43.name'],
  },
};

/**
 * Get hero content for a specific cuisine
 * Now supports i18n and dynamic dish name resolution
 */
export const getHeroContent = (cuisineName, t) => {
  const config = HERO_CONTENT_CONFIG[cuisineName] || HERO_CONTENT_CONFIG.Finnish;

  // If translation function is provided, resolve i18n keys
  if (t) {
    return {
      ...config,
      title: t(config.titleKey),
      subtitle: t(config.subtitleKey),
      description: t(config.descriptionKey),
      cuisineStory: t(config.cuisineStoryKey),
      // Resolve dish names from i18n
      highlightedDishes: config.highlightedDishes.map(dishKey => t(dishKey)),
    };
  }

  // Fallback to static content (for backward compatibility)
  return {
    ...config,
    title: config.titleKey.replace('home.hero', '').replace('Title', ' Week'),
    subtitle: 'Discover amazing flavors',
    description: 'Experience authentic cuisine from around the world.',
    cuisineStory: 'This cuisine represents rich cultural traditions.',
    highlightedDishes: config.highlightedDishes.map(key => key.split('.').pop()), // Extract dish ID as fallback
  };
};

/**
 * Get all hero content
 */
export const getAllHeroContent = () => {
  return HERO_CONTENT_CONFIG;
};
