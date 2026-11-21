'use client';

import { useEffect, useState } from 'react';

const LEGACY_THEME_STORAGE_KEY = 'crystalgreengold-theme';

export function useNexoraLifeTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
    if (saved) {
      setIsDark(saved === 'dark');
      return;
    }

    setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    // Keep the established key so existing saved theme preferences continue to work.
    localStorage.setItem(LEGACY_THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, setIsDark };
}
