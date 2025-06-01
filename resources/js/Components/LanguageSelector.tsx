// resources/js/components/LanguageSelector.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

type Language = {
  code: string;
  label: string;
  flag: string; // emoji atau URL gambar
};

const languages: Language[] = [
  { code: 'id', label: 'Indonesian', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'jp', label: 'Japanese', flag: '🇯🇵' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  // Tambah bahasa lain sesuka kamu
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="relative inline-block text-left">
      {/* Tombol utama di navbar */}
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg
                   transition-all duration-200 active:scale-105 active:bg-gray-200"
      >
        <span className="text-xl">{currentLang?.flag}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-20 transition-all duration-200 origin-top-right transform ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors duration-150 ${
              i18n.language === lang.code ? 'font-semibold' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
