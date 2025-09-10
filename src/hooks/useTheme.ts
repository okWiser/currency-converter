import { useEffect } from 'react';
import { useAppStore } from '@/store';

export const useTheme = () => {
  const { preferences, setTheme } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    let actualTheme = preferences.theme;
    
    if (preferences.theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
  }, [preferences.theme]);

  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return {
    theme: preferences.theme,
    setTheme,
    toggleTheme,
  };
};