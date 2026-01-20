import axios from "axios";
import type { Article, ApiResponse } from "./../types/article";

const instance = axios.create({
  baseURL: "https://api.spaceflightnewsapi.net/v4",
  headers: { "Content-Type": "application/json" },
});

export const getArticles = async (
  limit: number = 12,
  offset: number = 0,
): Promise<ApiResponse> => {
  try {
    const response = await instance.get<ApiResponse>(
      `/articles/?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    console.error("API Error (getArticles):", error);
    throw error;
  }
};

export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const response = await instance.get<Article>(`/articles/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`API Error (getArticleById ${id}):`, error);
    throw error;
  }
};

export const api = { getArticles, getArticleById };
