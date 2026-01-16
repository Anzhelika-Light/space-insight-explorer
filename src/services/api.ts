import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.spaceflightnewsapi.net/v4",
  headers: { "Content-Type": "application/json" },
});

export const getArticles = async (limit: number = 12, offset: number = 0) => {
  const response = await instance.get(
    `/articles/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const getArticleById = async (id: number) => {
  const response = await instance.get(`/articles/${id}`);
  return response.data;
};

export const api = { getArticles, getArticleById };
