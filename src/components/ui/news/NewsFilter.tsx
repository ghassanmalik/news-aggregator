import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewsFiltersProps {
    filters: { query: string; category: string; source: string; date: string };
    onFilterChange: (key: string, value: string) => void;
    sources?: { id: string; name: string }[];
    handleResetFilters?: ()=> void;
    isResetEnabled?: boolean;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({ filters, onFilterChange, sources, handleResetFilters, isResetEnabled }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 justify-center md:justify-start">
            <Input
                type="text"
                placeholder="Search..."
                value={filters.query}
                onChange={(e) => onFilterChange("query", e.target.value)}
                className="w-full md:flex-[12] bg-[#f7f7f7]"
            />

            <Select
                value={filters.category}
                onValueChange={(value) => onFilterChange("category", value)}
                disabled={!!filters.source || !!filters.date}
            >
                <SelectTrigger className="w-full md:flex-[1] cursor-pointer">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {["business", "technology", "sports", "health", "science", "entertainment"].map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.source}
                onValueChange={(value) => onFilterChange("source", value)}
                disabled={!!filters.category}
            >
                <SelectTrigger className="w-full md:flex-[1] cursor-pointer">
                    <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                    {sources?.length ? (
                        sources.map((source) => (
                            <SelectItem key={source.id} value={source.id}>{source.name}</SelectItem>
                        ))
                    ) : (
                        <SelectItem value={null} disabled>No sources available</SelectItem>
                    )}
                </SelectContent>
            </Select>

            <Input
                type="date"
                className="w-full md:flex-[1] px-3 py-2 min-w-[150px] cursor-pointer !bg-[#f7f7f7]"
                value={filters.date}
                onChange={(e) => onFilterChange("date", e.target.value)}
                disabled={!!filters.category}
            />

            <Button
                onClick={handleResetFilters}
                disabled={!isResetEnabled}
                className="bg-[#6B7280] text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black max-h-[30px] w-full sm:w-auto cursor-pointer"
            >
                Reset Filters
            </Button>

        </div>
    );
};
