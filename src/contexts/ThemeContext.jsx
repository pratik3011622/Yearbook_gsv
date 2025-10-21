import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Always use light theme

  useEffect(() => {
    // Always ensure light theme is applied
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const toggleTheme = () => {
    // Keep light theme for consistency with the new design
    setIsDark(false);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
