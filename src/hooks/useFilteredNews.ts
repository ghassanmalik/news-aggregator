import { useQuery } from "@tanstack/react-query";

const NEWS_API_KEY = "3b98fb523ec04fc88928f24267e7f6ba";
const NYT_API_KEY = "XDFtnbtdr4AAjNJqVcZ6RVog6IdbLBbd";
const GUARDIAN_API_KEY = "54837944-b267-46f0-981c-1d909f40cf64";

export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: { name: string };
    publishedAt: string;
}

interface FilterParams {
    source?: string;
    date?: string;
}

const fetchFilteredNews = async (searchTerm: string, category: string, filters: FilterParams): Promise<Article[]> => {
    let url = "";

    if (category) {
        url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&category=${category}`;
    } else {
        url = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}&q=${encodeURIComponent(searchTerm)}`;
        if (filters.source) url += `&sources=${filters.source}`;
        if (filters.date) url += `&from=${filters.date}&to=${filters.date}`;
    }

    const responses = await Promise.all([
        fetch(url).then((res) => res.json()),
        fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`).then((res) => res.json()),
        fetch(`https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=all`).then((res) => res.json()),
    ]);

    return responses.flatMap((res, index) => {
        if (res.articles) return res.articles;

        if (res.results || res.response?.results) {
            return (res.results || res.response.results).map((article: any) => ({
                title: article.title || article.webTitle,
                description: article.abstract || "No description available.",
                url: article.url || article.webUrl,
                urlToImage: article.multimedia?.[0]?.url || "",
                source: { name: index === 1 ? "New York Times" : "The Guardian" },
                publishedAt: article.published_date || article.webPublicationDate,
            }));
        }
        return [];
    });
};

export const useFilteredNews = (searchTerm: string, category: string, filters: FilterParams) => {
    return useQuery<Article[]>({
        queryKey: ["filteredNews", searchTerm, category, filters],
        queryFn: () => fetchFilteredNews(searchTerm, category, filters),
        enabled: !!searchTerm || !!category || !!filters?.source || !!filters?.date,
    });
};