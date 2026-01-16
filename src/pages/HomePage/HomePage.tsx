import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
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

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: articles,
    searchQuery,
    totalCount,
  } = useSelector((state: RootState) => state.articles);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 12;

  useEffect(() => {
    const loadInitial = async () => {
      if (articles.length > 0) return;
      setLoading(true);
      try {
        const data = await api.getArticles(LIMIT, 0);
        dispatch(setArticles(data));
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, [dispatch, articles.length]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const data = await api.getArticles(LIMIT, articles.length);
      dispatch(addArticles(data));
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
        (word) => title.includes(word) || summary.includes(word)
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
        a.title.toLowerCase().includes(word)
      );
      const bInTitle = keywords.some((word) =>
        b.title.toLowerCase().includes(word)
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

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
          Filter by keywords
        </Typography>
        <SearchInput
          value={searchQuery}
          onChange={(val) => dispatch(setSearchQuery(val))}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          mb: 3,
          borderBottom: "1px solid #eaeaea",
          pb: 1,
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

      {articles.length < totalCount && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loadingMore}
            sx={{
              backgroundColor: "#363636",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#000" },
            }}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
