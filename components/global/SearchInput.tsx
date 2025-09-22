"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PAGE_PATHS } from "@/routes/pagePaths";
import SearchAutocomplete from "./SearchAutocomplete";

export default function SearchInput() {
  const router = useRouter();

  const handleSelect = (searchTerm: string) => {
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
      inputClassName="lg:max-w-xl h-9"
      showRecentSearches={false}
      showTrendingSearches={false}
    />
  );
}
