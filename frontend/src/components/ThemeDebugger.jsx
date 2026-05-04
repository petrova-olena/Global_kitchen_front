import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getTimeUntilNextCuisine, formatDateString, getAvailableCuisines } from '../utils/themeUtils';
import './themeDebugger.css';

const ThemeDebugger = () => {
  const {
    currentCuisine,
    cuisineDetails,
    weekNumber,
    activeDate,
    realDate,
    isOverrideActive,
    setOverrideDate,
    clearOverride,
    isDebugMode,
    toggleDebugMode
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const timeUntilNext = getTimeUntilNextCuisine(activeDate);
  const cuisineList = getAvailableCuisines();

  const handleDateChange = (e) => {
    setOverrideDate(e.target.value);
  };

  const handleQuickJump = (days) => {
    const newDate = new Date(activeDate);
    newDate.setDate(newDate.getDate() + days);
    setOverrideDate(formatDateString(newDate));
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className="theme-debugger-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Theme Debugger"
        aria-label="Toggle Theme Debugger"
      >
        🍽️
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="theme-debugger-panel">
          <div className="theme-debugger-header">
            <h3>🍽️ Theme Debugger</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close debugger"
            >
              ✕
            </button>
          </div>

          <div className="theme-debugger-content">
            {/* Current Theme Info */}
            <section className="debug-section">
              <h4>Current Theme</h4>
              <div className="theme-info">
                <div className="cuisine-display">
                  <span className="emoji">{cuisineDetails?.emoji}</span>
                  <div>
                    <div className="cuisine-name">{currentCuisine}</div>
                    <div className="cuisine-description">{cuisineDetails?.description}</div>
                  </div>
                </div>
                <div className="theme-meta">
                  <p><strong>Week:</strong> {weekNumber}</p>
                  <p><strong>Active Date:</strong> {formatDateString(activeDate)}</p>
                  {isOverrideActive && (
                    <p className="override-badge">🔧 Override Active</p>
                  )}
                </div>
              </div>
            </section>

            {/* Time Until Next Change */}
            <section className="debug-section">
              <h4>Next Cuisine Change</h4>
              <div className="countdown">
                <p>
                  {timeUntilNext.days}d {timeUntilNext.hours}h {timeUntilNext.minutes}m
                </p>
                <p className="next-date">
                  {timeUntilNext.nextChangeDate.toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Cuisine Cycle */}
            <section className="debug-section">
              <h4>Cuisine Cycle</h4>
              <div className="cuisine-cycle">
                {cuisineList.map((cuisine, index) => (
                  <div
                    key={cuisine}
                    className={`cycle-item ${cuisine === currentCuisine ? 'active' : ''}`}
                  >
                    <span className="index">{index + 1}</span>
                    <span className="name">{cuisine}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Date Override */}
            <section className="debug-section">
              <h4>Date Override (Debug)</h4>
              <div className="override-controls">
                <input
                  type="date"
                  value={overrideDate || formatDateString(realDate)}
                  onChange={handleDateChange}
                  className="date-input"
                />
                {isOverrideActive && (
                  <button
                    className="btn-reset"
                    onClick={clearOverride}
                  >
                    Reset to Today
                  </button>
                )}
              </div>

              {/* Quick Jump Buttons */}
              <div className="quick-jump">
                <button onClick={() => handleQuickJump(7)} className="jump-btn">
                  +1 Week
                </button>
                <button onClick={() => handleQuickJump(-7)} className="jump-btn">
                  -1 Week
                </button>
                <button onClick={() => handleQuickJump(1)} className="jump-btn">
                  +1 Day
                </button>
              </div>
            </section>

            {/* Debug Mode Toggle */}
            <section className="debug-section">
              <h4>Debug Mode</h4>
              <label className="debug-toggle">
                <input
                  type="checkbox"
                  checked={isDebugMode}
                  onChange={toggleDebugMode}
                />
                <span>Enable Debug Features</span>
              </label>
            </section>

            {/* System Info */}
            <section className="debug-section info-section">
              <h4>System Info</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Real Time:</span>
                  <span className="value">{realDate.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Display Time:</span>
                  <span className="value">{activeDate.toLocaleString()}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeDebugger;
