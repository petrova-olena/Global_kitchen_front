/**
 * Theme Utilities - Handles week-based cuisine cycling
 * Supports manual time override for debugging
 */

// Define the cuisine cycle
const CUISINES = ['Finnish', 'Iraqi', 'Turkish', 'Russian', 'Ukrainian'];

/**
 * Get the week number of the year (ISO 8601)
 * @param {Date} date - Date to calculate week for
 * @returns {number} Week number (1-53)
 */
export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Get cuisine for a given date
 * @param {Date} date - Date to get cuisine for
 * @returns {string} Cuisine name
 */
export const getCuisineForDate = (date) => {
  const weekNumber = getWeekNumber(date);
  const cuisineIndex = (weekNumber - 1) % CUISINES.length;
  return CUISINES[cuisineIndex];
};

/**
 * Get all available cuisines
 * @returns {string[]} Array of cuisine names
 */
export const getAvailableCuisines = () => [...CUISINES];

/**
 * Get cuisine details by name
 * @param {string} cuisineName - Name of the cuisine
 * @returns {object} Cuisine object with metadata
 */
export const getCuisineDetails = (cuisineName) => {
  const details = {
    Finnish: {
      id: 'finnish',
      name: 'Finnish',
      color: '#003580', // Deep blue
      emoji: '🇫🇮',
      description: 'Finnish cuisine - wholesome and seasonal'
    },
    Iraqi: {
      id: 'iraqi',
      name: 'Iraqi',
      color: '#CE1126', // Iraqi flag red
      emoji: '🇮🇶',
      description: 'Iraqi cuisine - rich and aromatic'
    },
    Turkish: {
      id: 'turkish',
      name: 'Turkish',
      color: '#E30A17', // Turkish flag red
      emoji: '🇹🇷',
      description: 'Turkish cuisine - bold and flavorful'
    },
    Russian: {
      id: 'russian',
      name: 'Russian',
      color: '#0039A6', // Russian flag blue
      emoji: '🇷🇺',
      description: 'Russian cuisine - hearty and traditional'
    },
    Ukrainian: {
      id: 'ukrainian',
      name: 'Ukrainian',
      color: '#4C7FE5', // Ukrainian flag blue
      emoji: '🇺🇦',
      description: 'Ukrainian cuisine - vibrant and rich'
    }
  };
  return details[cuisineName] || null;
};

/**
 * Calculate time until next cuisine change
 * @param {Date} currentDate - Current date
 * @returns {object} Object with days, hours, minutes
 */
export const getTimeUntilNextCuisine = (currentDate) => {
  // Next Monday at 00:00 (start of week)
  const current = new Date(currentDate);
  const nextMonday = new Date(current);
  nextMonday.setDate(nextMonday.getDate() + ((1 + 7 - current.getDay()) % 7));
  nextMonday.setHours(0, 0, 0, 0);

  const diff = nextMonday - current;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, nextChangeDate: nextMonday };
};

/**
 * Parse override date string (YYYY-MM-DD format)
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date|null} Parsed date or null if invalid
 */
export const parseOverrideDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Format date to YYYY-MM-DD string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
