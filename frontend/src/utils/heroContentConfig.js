/**
 * Hero Section Content Configuration
 * Stores images, text, and featured dishes info per cuisine
 * 
 * Update images with actual paths from your assets
 * Update text with real descriptions from translations if needed
 */

export const HERO_CONTENT_CONFIG = {
  Finnish: {
    emoji: '🇫🇮',
    color: '#003580',
    title: 'Finnish Week',
    subtitle: 'Discover the wholesome flavors of Nordic cuisine',
    heroImage: 'src/assets/finland_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #003580 0%, #002851 100%)',
    description:
      'Experience the purity and seasonality of Finnish cuisine. From fresh salmon to hearty reindeer stew, our Finnish week celebrates the best of Nordic traditions.',
    highlightedDishes: ['Salmon Soup', 'Karelian Pasties', 'Reindeer Stew'],
    cuisineStory:
      'Finnish cuisine is deeply connected to nature and seasons. Fresh ingredients, sustainable practices, and simple yet elegant preparation are at the heart of this culinary tradition.',
  },

  Iraqi: {
    emoji: '🇮🇶',
    color: '#CE1126',
    title: 'Iraqi Week',
    subtitle: 'Journey through rich and aromatic Middle Eastern flavors',
    heroImage: 'src/assets/iraq_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #CE1126 0%, #9e0a20 100%)',
    description:
      'Immerse yourself in the rich culinary heritage of Iraq. Bold spices, aromatic herbs, and centuries-old recipes create an unforgettable dining experience.',
    highlightedDishes: ['Hummus', 'Kebab', 'Masgouf'],
    cuisineStory:
      'Iraqi cuisine is one of the oldest in the world, with recipes passed down through generations. Each dish tells a story of tradition, family, and cultural pride.',
  },

  Turkish: {
    emoji: '🇹🇷',
    color: '#E30A17',
    title: 'Turkish Week',
    subtitle: 'Savor bold and flavorful Turkish delights',
    heroImage: 'src/assets/turkey_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #E30A17 0%, #b20812 100%)',
    description:
      'Turkish cuisine bridges East and West with its bold flavors and diverse influences. From succulent kebabs to delicate mezze, taste the essence of Turkish hospitality.',
    highlightedDishes: ['Kebab', 'Pide', 'Meze Platter'],
    cuisineStory:
      'Turkish food is celebrated worldwide for its quality ingredients and masterful preparation. Every dish is crafted with passion and served with pride.',
  },

  Russian: {
    emoji: '🇷🇺',
    color: '#0039A6',
    title: 'Russian Week',
    subtitle: 'Experience hearty and traditional Russian comfort food',
    heroImage: 'src/assets/russia_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #0039A6 0%, #002673 100%)',
    description:
      'Russian cuisine reflects the soul of a vast nation. Hearty, warming, and deeply satisfying, every meal is a celebration of tradition and community.',
    highlightedDishes: ['Borscht', 'Pelmeni', 'Stroganoff'],
    cuisineStory:
      'Russian food is born from harsh winters and abundant harvests. Simple yet nourishing, these dishes warm both body and heart.',
  },

  Ukrainian: {
    emoji: '🇺🇦',
    color: '#4C7FE5',
    title: 'Ukrainian Week',
    subtitle: 'Taste the vibrant and rich traditions of Ukraine',
    heroImage: 'src/assets/ukraine_banner.jpg',
    backgroundGradient: 'linear-gradient(135deg, #4C7FE5 0%, #3656c9 100%)',
    description:
      'Ukrainian cuisine is a vibrant tapestry of flavors, colors, and warmth. From traditional varenyky to soul-warming borsch, experience authentic Ukrainian hospitality.',
    highlightedDishes: ['Varenyky', 'Borsch', 'Holubci'],
    cuisineStory:
      'Ukrainian food represents centuries of agricultural tradition and cultural pride. Each recipe carries stories of family gatherings and festive celebrations.',
  },
};

/**
 * Get hero content for a specific cuisine
 */
export const getHeroContent = (cuisineName) => {
  return HERO_CONTENT_CONFIG[cuisineName] || HERO_CONTENT_CONFIG.Finnish;
};

/**
 * Get all hero content
 */
export const getAllHeroContent = () => {
  return HERO_CONTENT_CONFIG;
};
