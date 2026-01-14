import { useState, useEffect } from "react";
import type { Article } from "../types/article";
import { api } from "../services/api";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await api.getArticles(50);

        setArticles(data.results);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return { articles, loading, error };
};
