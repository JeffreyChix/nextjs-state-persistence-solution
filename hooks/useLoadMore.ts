import { useState, useEffect, ChangeEvent } from "react";

export const useLoadMore = (articles: any[]) => {
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [perLoad, setPerLoad] = useState(5);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const loadMore = () => setPerLoad(perLoad + 5);

  useEffect(() => {
    if (query.length < 3) {
      setFilteredArticles(articles);
      return;
    }
    const results = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(results);
  }, [articles, query]);

  return {
    filteredArticles: filteredArticles.slice(0, perLoad),
    query,
    handleChange,
    loadMore,
    total: filteredArticles.length,
    showLoadMoreButton: filteredArticles.length > perLoad,
  };
};
