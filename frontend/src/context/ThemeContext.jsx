import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getCuisineForDate,
  getWeekNumber,
  getCuisineDetails,
  formatDateString,
  parseOverrideDate
} from '../utils/themeUtils';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [overrideDate, setOverrideDate] = useState(
    () => localStorage.getItem('themeOverrideDate') || null
  );
  const [isDebugMode, setIsDebugMode] = useState(
    () => localStorage.getItem('themeDebugMode') === 'true'
  );

  // Use override date if set, otherwise use current date
  const activeDate = overrideDate ? parseOverrideDate(overrideDate) : currentDate;
  const currentCuisine = getCuisineForDate(activeDate);
  const cuisineDetails = getCuisineDetails(currentCuisine);
  const weekNumber = getWeekNumber(activeDate);
  console.log('[ThemeContext] activeDate:', activeDate.toDateString(), 'cuisine:', currentCuisine, 'week:', weekNumber, 'override active:', !!overrideDate);

  // Update current date every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Persist override date to localStorage
  useEffect(() => {
    if (overrideDate) {
      localStorage.setItem('themeOverrideDate', overrideDate);
    } else {
      localStorage.removeItem('themeOverrideDate');
    }
  }, [overrideDate]);

  // Persist debug mode to localStorage
  useEffect(() => {
    localStorage.setItem('themeDebugMode', isDebugMode.toString());
  }, [isDebugMode]);

  const handleSetOverrideDate = useCallback((dateString) => {
    if (!dateString) {
      setOverrideDate(null);
      return;
    }

    const parsed = parseOverrideDate(dateString);
    if (parsed) {
      setOverrideDate(dateString);
    }
  }, []);

  const handleClearOverride = useCallback(() => {
    setOverrideDate(null);
  }, []);

  const toggleDebugMode = useCallback(() => {
    setIsDebugMode(prev => !prev);
  }, []);

  const value = {
    // Current theme info
    currentCuisine,
    cuisineDetails,
    weekNumber,
    activeDate,
    
    // Real time
    realDate: currentDate,
    isOverrideActive: !!overrideDate,
    overrideDate,
    
    // Debug
    isDebugMode,
    toggleDebugMode,
    setOverrideDate: handleSetOverrideDate,
    clearOverride: handleClearOverride,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
