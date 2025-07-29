'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type DropdownOption = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  themeClasses: { primary: string; text: string; darkText: string };
};

export const CustomDropdown = ({
  options,
  value,
  onChange,
  themeClasses,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select...';

  // Hook to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-56" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={16}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {options.map((option) => (
            <a
              key={option.value}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(option.value);
              }}
              className={`block px-4 py-2 text-sm transition-colors ${
                option.value === value
                  ? `${themeClasses.text} ${themeClasses.darkText} font-semibold`
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};