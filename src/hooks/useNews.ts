import { useQuery } from "@tanstack/react-query";

const NEWS_API_KEY = "3b98fb523ec04fc88928f24267e7f6ba";
// const NEWS_API_KEY = "09673d4b22974368a2d2d2ccc20c9ad1";
const NYT_API_KEY = "XDFtnbtdr4AAjNJqVcZ6RVog6IdbLBbd";
const GUARDIAN_API_KEY = "54837944-b267-46f0-981c-1d909f40cf64";

export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: { name: string };
    publishedAt: string;
    author?: string;
}

interface FilterParams {
    source?: string;
    date?: string;
    category: string;
    sourcesList?: {id: string, name: string}[];
}

// NewsAPI Response Interface
interface NewsApiResponse {
    articles: Article[];
}

// NYT API Response Interface
interface NytArticle {
    title: string;
    abstract: string;
    url: string;
    multimedia?: { url: string }[];
    published_date: string;
}

interface NytApiResponse {
    results: NytArticle[];
}

// Guardian API Response Interface
interface GuardianArticle {
    webTitle: string;
    webUrl: string;
    webPublicationDate: string;
    fields?: { thumbnail?: string };
}

interface GuardianApiResponse {
    response: {
        results: GuardianArticle[];
    };
}

const getRandomSources = (data: { id: string; name: string }[]) => {

    return [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(item => item.id)
        .join(","); //generating comma seprated random sources string
};

const fetchFilteredNews = async (filters: FilterParams): Promise<Article[]> => {
    let requests: Promise<Response>[] = [];

    if (!filters.searchTerm && !filters.category && !filters.source && !filters.date) {
        requests = [
            fetch(`https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&country=us`),
            fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`),
            fetch(`https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=all`),
        ];
    } else {
        let url = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}&q=${encodeURIComponent(filters.searchTerm || "")}`;

        if (filters.category) {
            url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&category=${filters.category}`;

            // Append search query if both category and searchTerm exist
            if (filters.searchTerm) {
                url += `&q=${encodeURIComponent(filters.searchTerm)}`;
            }
        }

        if (filters.source) url += `&sources=${filters.source}`;
        if (filters.date) {
            if(!filters.searchTerm && !filters.category && !filters.source){ //catering "search is too broad" error" from api
                url += `&sources=${getRandomSources(filters.sourcesList)}&sortBy=popularity`
            }
            url += `&from=${filters.date}&to=${filters.date}`
        }

        requests = [fetch(url)];
    }

    const responses = await Promise.all(requests.map(req => req.then(res => res.json())));

    return responses.flatMap((res) => {
        if ("articles" in res) {
            return (res as NewsApiResponse).articles;
        }

        if ("results" in res) {
            return (res as NytApiResponse).results.map((article) => ({
                title: article.title,
                description: article.abstract || "No description available.",
                url: article.url,
                urlToImage: article.multimedia?.[0]?.url || "",
                source: { name: "New York Times" },
                publishedAt: article.published_date,
            }));
        }

        if ("response" in res) {
            return (res as GuardianApiResponse).response.results.map((article) => ({
                title: article.webTitle,
                description: "No description available.",
                url: article.webUrl,
                urlToImage: article.fields?.thumbnail || "",
                source: { name: "The Guardian" },
                publishedAt: article.webPublicationDate,
            }));
        }

        return [];
    });
};


export const useNews = (filters: FilterParams) => {
    return useQuery<Article[]>({
        queryKey: ["filteredNews", filters],
        queryFn: () => fetchFilteredNews(filters),
        staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
        enabled: true,
    });
};
