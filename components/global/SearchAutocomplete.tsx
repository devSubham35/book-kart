"use client";

import { Input } from "../ui/input";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { Clock, LucideIcon, Search, TrendingUp, X } from "lucide-react";

interface SearchAutocompleteProps {
  placeholder: string;
  suggestions: string[];
  recentSearches: string[];
  trendingSearches: string[];
  maxSuggestions: number;
  showRecentSearches: boolean;
  showTrendingSearches: boolean;
  onSelect: (value: string) => void;
  onSearch?: (query: string, filtered: string[]) => void;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  suggestionClassName?: string;
  debounceMs: number;
  minSearchLength: number;
  clearable: boolean;
  autoFocus: boolean;
  disabled: boolean;
  searchButtonText: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder,
  suggestions,
  recentSearches,
  trendingSearches,
  maxSuggestions,
  showRecentSearches,
  showTrendingSearches,
  onSelect,
  onSearch,
  className,
  inputClassName,
  dropdownClassName,
  suggestionClassName,
  debounceMs,
  minSearchLength,
  clearable,
  autoFocus,
  disabled,
}) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const filterSuggestions = (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < minSearchLength) return [];
    const queryLower = searchQuery.toLowerCase().trim();
    return suggestions
      .filter(s => s.toLowerCase().includes(queryLower))
      .slice(0, maxSuggestions);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length >= minSearchLength) {
      setIsSearching(true);
      debounceRef.current = setTimeout(() => {
        const filtered = filterSuggestions(query);
        setFilteredSuggestions(filtered);
        setIsSearching(false);
        if (onSearch) onSearch(query, filtered);
      }, debounceMs);
    } else {
      setFilteredSuggestions([]);
      setIsSearching(false);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  const handleSuggestionSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelect(value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setIsOpen(false);
      onSelect(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const allItems = [
      ...(query.length < minSearchLength && showRecentSearches ? recentSearches : []),
      ...(query.length < minSearchLength && showTrendingSearches ? trendingSearches : []),
      ...filteredSuggestions
    ];
    const totalItems = allItems.length;

    if (!isOpen || totalItems === 0) {
      if (e.key === "Enter") handleSearch();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) handleSuggestionSelect(allItems[selectedIndex]);
        else handleSearch();
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleFocus = () => setIsOpen(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderList = (list: string[], IconComponent: LucideIcon, startIndex = 0) =>
    list.map((item, idx) => {
      const currentIndex = startIndex + idx;
      return (
        <div
          key={currentIndex}
          className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 ${
            selectedIndex === currentIndex ? "bg-blue-50" : ""
          } ${suggestionClassName}`}
          onClick={() => handleSuggestionSelect(item)}
        >
          <IconComponent className="w-4 h-4 mr-3 text-gray-400" />
          <span className="text-gray-700">{item}</span>
        </div>
      );
    });

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div className="flex items-center border rounded-md transition-shadow">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className={`border-0 rounded-l-md rounded-r-none focus-visible:ring-0 ${inputClassName}`}
            autoFocus={autoFocus}
            disabled={disabled}
          />
          {clearable && query && (
            <div
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-transparent flex justify-center items-center"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`${query? "visible" : "invisible"} absolute top-full left-0 right-0 mt-1 border bg-background rounded-md shadow-lg z-50 max-h-96 overflow-y-auto ${dropdownClassName}`}
        >
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300 mx-auto mb-2"></div>
              Searching...
            </div>
          ) : (
            <>
              {query.length < minSearchLength && showRecentSearches && recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-100">
                    Recent Searches
                  </div>
                  {renderList(recentSearches, Clock)}
                </>
              )}
              {query.length < minSearchLength && showTrendingSearches && trendingSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-100">
                    Trending Searches
                  </div>
                  {renderList(trendingSearches, TrendingUp, recentSearches.length)}
                </>
              )}
              {filteredSuggestions.length > 0 &&
                filteredSuggestions.map((s, idx) => {
                  const startIndex =
                    (query.length < minSearchLength && showRecentSearches ? recentSearches.length : 0) +
                    (query.length < minSearchLength && showTrendingSearches ? trendingSearches.length : 0);
                  const currentIndex = startIndex + idx;
                  const matchIndex = s.toLowerCase().indexOf(query.toLowerCase());

                  return (
                    <div
                      key={currentIndex}
                      className={`flex items-center px-4 py-3 cursor-pointer ${
                        selectedIndex === currentIndex ? "" : ""
                      } ${suggestionClassName}`}
                      onClick={() => handleSuggestionSelect(s)}
                    >
                      <Search className="w-4 h-4 mr-3" />
                      <span>
                        {matchIndex >= 0 ? (
                          <>
                            {s.substring(0, matchIndex)}
                            <span className="font-medium">
                              {s.substring(matchIndex, matchIndex + query.length)}
                            </span>
                            {s.substring(matchIndex + query.length)}
                          </>
                        ) : (
                          s
                        )}
                      </span>
                    </div>
                  );
                })}
              {query.length >= minSearchLength && filteredSuggestions.length === 0 && !isSearching && (
                <div className="px-4 py-6 text-center text-gray-500">
                  No suggestions found for {`"${query}"`}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
