// @/lib/theme.ts

/**
 * Defines the shape of the theme object, ensuring type safety
 * for components that consume these theme classes.
 */
export interface ThemeClasses {
  primary: string;
  primaryHover: string;
  text: string;
  darkText: string;
  [key: string]: string; // Allows for other properties
}

/**
 * Returns a set of Tailwind CSS classes for a given color scheme.
 * @param scheme The name of the color scheme (e.g., 'blue', 'orange').
 * @returns An object containing the theme classes.
 */
export const getThemeClasses = (scheme: string): ThemeClasses => {
  const themes: { [key: string]: ThemeClasses } = {
    blue: {
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      darkText: 'dark:text-blue-400',
    },
    orange: {
      primary: 'bg-orange-500',
      primaryHover: 'hover:bg-orange-600',
      text: 'text-orange-500',
      darkText: 'dark:text-orange-400',
    },
    green: {
      primary: 'bg-green-500',
      primaryHover: 'hover:bg-green-600',
      text: 'text-green-500',
      darkText: 'dark:text-green-400',
    },
    purple: {
      primary: 'bg-violet-500',
      primaryHover: 'hover:bg-violet-600',
      text: 'text-violet-500',
      darkText: 'dark:text-violet-400',
    },
    red: {
      primary: 'bg-red-500',
      primaryHover: 'hover:bg-red-600',
      text: 'text-red-500',
      darkText: 'dark:text-red-400',
    },
    pink: {
      primary: 'bg-pink-500',
      primaryHover: 'hover:bg-pink-600',
      text: 'text-pink-500',
      darkText: 'dark:text-pink-400',
    },
    yellow: {
      primary: 'bg-yellow-500',
      primaryHover: 'hover:bg-yellow-600',
      text: 'text-yellow-500',
      darkText: 'dark:text-yellow-400',
    },
    teal: {
      primary: 'bg-teal-500',
      primaryHover: 'hover:bg-teal-600',
      text: 'text-teal-500',
      darkText: 'dark:text-teal-400',
    },
    indigo: {
      primary: 'bg-indigo-500',
      primaryHover: 'hover:bg-indigo-600',
      text: 'text-indigo-500',
      darkText: 'dark:text-indigo-400',
    },
    gray: {
      primary: 'bg-gray-500',
      primaryHover: 'hover:bg-gray-600',
      text: 'text-gray-500',
      darkText: 'dark:text-gray-400',
    },
  };

  // Return the selected theme or the default (blue) if not found
  return themes[scheme] || themes.blue;
};
