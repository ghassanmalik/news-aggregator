import * as React from 'react';
import { useState, useEffect } from "react";
import { useNews, Article } from "@/hooks/useNews";
import { useDebounce } from "@/hooks/useDebounce";
import {useOutletContext} from "react-router-dom";
import { NewsCard } from "@/components/ui/news/NewsCard";
import { NewsFilters } from "@/components/ui/news/NewsFilter";
import { PreferenceDialog } from "@/components/ui/news/PreferenceDialog";
import {LayoutContext} from "@/components/layout/layout-template";

const PERSIST_KEY = "newsPreferences";

const Home: React.FC = () => {
    const {
        isCustomizing,
        sources,
        setIsCustomizing,
        handlePreferenceChange,
        handlePreferenceSave,
        handlePreferenceReset,
        preferences,
        tempPreferences,
    } = useOutletContext<LayoutContext>(); // Accessing context's state
    const [filters, setFilters] = useState({ query: "", category: "", source: "", date: "" });
    const debouncedSearchTerm = useDebounce(filters.query, 500);
    const { data: articles, isLoading, refetch } = useNews({
        ...(debouncedSearchTerm || filters.category || filters.source || filters.date ? {
            ...filters,
            searchTerm: filters.query
        } : preferences),
        sourcesList: sources,
    });

    useEffect(() => {
        localStorage.setItem(PERSIST_KEY, JSON.stringify(preferences));
    }, [preferences]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleResetFilters = () => {
        setFilters({ query: "", category: "", source: "", date: "" });
        refetch(); // Re-fetching articles with default filters
    };

    const isResetEnabled = Object.values(filters).some((value) => value !== "");

    const filterAndSortArticles = (articles: Article[]) => {
        if (!preferences.author) return articles;

        return articles.sort((a, b) => {
            const authorA = a.author ? a.author.toLowerCase() : "";
            const authorB = b.author ? b.author.toLowerCase() : "";
            const target = preferences.author.toLowerCase();

            // Checking for exact match
            if (authorA === target && authorB !== target) {
                return -1;
            } else if (authorB === target && authorA !== target) {
                return 1;
            }

            // Checking for close match (e.g., partial match or similarity)
            const similarityA = authorA.includes(target) ? 1 : 0;
            const similarityB = authorB.includes(target) ? 1 : 0;

            return similarityB - similarityA;
        });
    };

    return (
        <div>
            <NewsFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                sources={sources}
                handleResetFilters={handleResetFilters}
                isResetEnabled={isResetEnabled}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {isLoading ? (
                    <p>Loading...</p>
                ) : articles?.length ? (
                    filterAndSortArticles(articles)?.map((article, index) => (
                        <NewsCard cardKey={`${article.title} - ${index}`} article={article} />
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>

            <PreferenceDialog
                isOpen={isCustomizing}
                onClose={() => setIsCustomizing(false)}
                tempPreferences={tempPreferences}
                onPreferenceChange={handlePreferenceChange}
                onSave={handlePreferenceSave}
                onReset={handlePreferenceReset}
                sources={sources}
            />
        </div>
    );
};

export default Home;