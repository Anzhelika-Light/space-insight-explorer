import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";
import { useArticles } from "../../hooks/useArticle";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const { articles, loading, error } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  const filteredArticles = articles
    .filter((article) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return 0;

      const aInTitle = a.title.toLowerCase().includes(query);
      const bInTitle = b.title.toLowerCase().includes(query);

      if (aInTitle && !bInTitle) return -1;

      if (!aInTitle && bInTitle) return 1;

      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
          Filter by keywords
        </Typography>
        <TextField
          fullWidth
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            },
          }}
          sx={{ maxWidth: 600, backgroundColor: "#fff" }}
        />
      </Box>

      <Typography sx={{ fontWeight: 600, mb: 1 }}>
        Results: {filteredArticles.length}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={5} justifyContent="center">
        {filteredArticles.map((article) => (
          <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ArticleCard article={article} searchQuery={searchQuery} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
