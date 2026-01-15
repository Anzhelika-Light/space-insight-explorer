import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchInput from "../../components/SearchInput/SearchInput";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { api } from "../../services/api";
import { setArticles, setSearchQuery } from "../../store/articlesSlice";
import type { RootState } from "../../store/store";
import type { Article } from "../../types/article";

const HomePage = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state: RootState) => state.articles.items);
  const searchQuery = useSelector(
    (state: RootState) => state.articles.searchQuery
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      if (articles.length > 0) return;

      setLoading(true);
      try {
        const data = await api.getArticles();

        dispatch(setArticles(data));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [dispatch, articles.length]);

  const filteredArticles = articles
    .filter((article: Article) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query)
      );
    })
    .sort((a: Article, b: Article) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return 0;

      const aInTitle = a.title.toLowerCase().includes(query);
      const bInTitle = b.title.toLowerCase().includes(query);

      if (aInTitle && !bInTitle) return -1;
      if (!aInTitle && bInTitle) return 1;
      return 0;
    });

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, mb: 1, color: "#363636" }}
        >
          Filter by keywords
        </Typography>
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          mb: 3,
          borderBottom: "1px solid #eaeaea",
          pb: 1,
          color: "#363636",
        }}
      >
        Results: {filteredArticles.length}
      </Typography>

      <Grid container spacing={4}>
        {filteredArticles.map((article: Article) => (
          <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ArticleCard article={article} searchQuery={searchQuery} />
          </Grid>
        ))}
      </Grid>

      {filteredArticles.length === 0 && !loading && (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 5, color: "text.secondary" }}
        >
          No articles found for "{searchQuery}"
        </Typography>
      )}
    </Container>
  );
};

export default HomePage;
