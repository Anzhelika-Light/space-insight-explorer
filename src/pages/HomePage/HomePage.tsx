import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Alert,
  AlertTitle,
  Grid,
} from "@mui/material";
import SearchInput from "../../components/SearchInput/SearchInput";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { api } from "../../services/api";
import {
  setArticles,
  addArticles,
  setSearchQuery,
} from "../../store/articlesSlice";
import type { RootState } from "../../store/store";
import type { Article } from "../../types/article";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: articles,
    searchQuery,
    totalCount,
  } = useSelector((state: RootState) => state.articles);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const LIMIT = 12;

  const loadInitial = useCallback(async () => {
    if (articles.length > 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getArticles(LIMIT, 0);
      dispatch(setArticles(data));
    } catch (err) {
      setError("Failed to load articles. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, articles.length]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    setError(null);
    try {
      const data = await api.getArticles(LIMIT, articles.length);
      dispatch(addArticles(data));
    } catch (err) {
      setError("Could not load more articles. Please try again.");
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredArticles = articles
    .filter((article: Article) => {
      const keywords = searchQuery
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      if (keywords.length === 0) return true;

      const title = article.title.toLowerCase();
      const summary = article.summary.toLowerCase();

      return keywords.some(
        (word) => title.includes(word) || summary.includes(word),
      );
    })
    .sort((a: Article, b: Article) => {
      const keywords = searchQuery
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      if (keywords.length === 0) return 0;

      const aInTitle = keywords.some((word) =>
        a.title.toLowerCase().includes(word),
      );
      const bInTitle = keywords.some((word) =>
        b.title.toLowerCase().includes(word),
      );

      if (aInTitle && !bInTitle) return -1;
      if (!aInTitle && bInTitle) return 1;
      return 0;
    });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && articles.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert
          severity="error"
          variant="outlined"
          action={
            <Button color="inherit" size="small" onClick={loadInitial}>
              RETRY
            </Button>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} className={styles.homeContainer}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="body1"
          className={styles.filterLabel}
          sx={{ mb: 1 }}
        >
          Filter by keywords
        </Typography>
        <SearchInput
          value={searchQuery}
          onChange={(val) => dispatch(setSearchQuery(val))}
        />
      </Box>

      <Typography
        variant="body1"
        className={styles.resultsCount}
        sx={{ mb: 3, pb: 1 }}
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

      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {error && articles.length > 0 && (
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(null)}
            sx={{ width: "100%", maxWidth: "500px" }}
          >
            {error}
          </Alert>
        )}

        {articles.length < totalCount && (
          <Button
            variant="contained"
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
