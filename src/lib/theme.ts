export const getThemeClasses = (scheme: string) => {
    const themes: { [key: string]: { [key: string]: string } } = {
        blue: {
            primary: 'bg-blue-600',
            primaryHover: 'hover:bg-blue-700',
            text: 'text-blue-600',
            darkText: 'dark:text-blue-400'
        },
        orange: {
            primary: 'bg-orange-500',
            primaryHover: 'hover:bg-orange-600',
            text: 'text-orange-500',
            darkText: 'dark:text-orange-400'
        },
        green: {
            primary: 'bg-green-500',
            primaryHover: 'hover:bg-green-600',
            text: 'text-green-500',
            darkText: 'dark:text-green-400'
        },
        purple: {
            primary: 'bg-violet-500',
            primaryHover: 'hover:bg-violet-600',
            text: 'text-violet-500',
            darkText: 'dark:text-violet-400'
        }
    };
    return themes[scheme] || themes.blue;
};