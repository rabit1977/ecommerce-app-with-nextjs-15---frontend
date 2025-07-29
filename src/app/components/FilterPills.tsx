'use client';

type PillOption = {
  value: string;
  label: string;
};

type FilterPillsProps = {
  options: PillOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  themeClasses: { primary: string };
};

export const FilterPills = ({
  options,
  selectedValue,
  onSelect,
  themeClasses,
}: FilterPillsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize  transition-all duration-200 ${
            selectedValue === option.value
              ? `${themeClasses.primary} text-white shadow-md`
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};