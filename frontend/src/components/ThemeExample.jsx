import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { getCuisineDetails } from '../utils/themeUtils';

/**
 * Example component showing how to use the theme system
 * This demonstrates how to access and use the current cuisine theme
 */
const ThemeExample = () => {
  const {
    currentCuisine,
    cuisineDetails,
    weekNumber,
    activeDate,
    isOverrideActive
  } = useTheme();

  return (
    <div className="theme-example-container">
      <h2>Week {weekNumber}: {currentCuisine} Cuisine</h2>
      
      <div className="cuisine-info">
        <div className="emoji" style={{ fontSize: '48px' }}>
          {cuisineDetails?.emoji}
        </div>
        <div className="details">
          <p className="description">{cuisineDetails?.description}</p>
          <p className="date">
            Active from: {activeDate.toLocaleDateString()}
          </p>
          {isOverrideActive && (
            <p className="warning">⚠️ Debug override is active</p>
          )}
        </div>
      </div>

      {/* Example: Use theme color for styling */}
      <style>{`
        .cuisine-info {
          border-left: 4px solid ${cuisineDetails?.color};
          padding: 16px;
          background: ${cuisineDetails?.color}15;
        }
      `}</style>
    </div>
  );
};

export default ThemeExample;
