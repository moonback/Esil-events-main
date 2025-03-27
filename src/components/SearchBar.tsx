import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Rechercher un produit..."
          className="w-full pl-10 pr-10 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:outline-none transition-all duration-200"
        />
        <Search 
          className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
            isFocused ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
          }`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 