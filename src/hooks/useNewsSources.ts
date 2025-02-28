import { useQuery } from "@tanstack/react-query";

const NEWS_API_KEY = "3b98fb523ec04fc88928f24267e7f6ba";
// const NEWS_API_KEY = "09673d4b22974368a2d2d2ccc20c9ad1";

export interface NewsSource {
    id: string;
    name: string;
}

const fetchNewsSources = async (): Promise<NewsSource[]> => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    return data.sources || [];
};

export const useNewsSources = () => {
    return useQuery<NewsSource[]>({
        queryKey: ["newsSources"],
        queryFn: fetchNewsSources,
        staleTime: 30 * 60 * 1000, // Cache results for 30 minutes
    });
};