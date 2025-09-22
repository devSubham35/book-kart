"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchAutocomplete from "./SearchAutocomplete";
import { PAGE_PATHS } from "@/routes/pagePaths";

export default function SearchInput() {
  const router = useRouter();

  const handleSelect = (searchTerm: string) => {
    // Navigate to /books page with query parameter
    router.push(`${PAGE_PATHS.books}?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleSearch = (query: string, results: string[]) => {
    // Optional: trigger search when typing or pressing Enter
    console.log("Search query:", query, "Results:", results);
  };

  const customSuggestions = [
    "Physics for Beginners",
    "Advanced Physics",
    "Quantum Mechanics",
    "Classical Mechanics",
    "Thermodynamics",
    "Chemistry 101",
  ];

  return (
    <SearchAutocomplete
      recentSearches={[]}
      trendingSearches={[]}
      placeholder="Search books..."
      suggestions={customSuggestions}
      className=""
      disabled={false}
      clearable={true}
      debounceMs={200}
      autoFocus={false}
      maxSuggestions={6}
      minSearchLength={1}
      searchButtonText=""
      dropdownClassName=""
      suggestionClassName=""
      onSelect={handleSelect}
      onSearch={handleSearch}
      inputClassName="w-lg h-9"
      showRecentSearches={false}
      showTrendingSearches={false}
    />
  );
}
