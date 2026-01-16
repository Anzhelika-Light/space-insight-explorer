import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import type { RootState } from "../../store/store";
import { api } from "../../services/api";
import type { Article } from "../../types/article";
import styles from "./ArticlePage.module.scss";

const LOREM_IPSUM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  \n\n
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
`;

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const articlesFromStore = useSelector(
    (state: RootState) => state.articles.items
  );

  const [article, setArticle] = useState<Article | null>(
    articlesFromStore.find((a) => a.id === Number(id)) || null
  );
  const [loading, setLoading] = useState<boolean>(!article);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!article && id) {
        setLoading(true);
        try {
          const data = await api.getArticleById(Number(id));
          setArticle(data);
        } catch (error) {
          console.error("Failed to fetch article:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [id, article]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Article not found
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          className={styles.backButton}
        >
          Back to homepage
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.pageWrapper}>
      <Box
        className={styles.heroImage}
        sx={{ backgroundImage: `url(${article.image_url})` }}
      />

      <Container maxWidth="lg" className={styles.contentContainer}>
        <Box
          sx={{
            position: "sticky",
            top: "24px",
            zIndex: 1100,
            mb: 3,
            width: "fit-content",
          }}
        >
          <Button
            component={Link}
            to="/"
            className={styles.backButton}
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "14px !important" }} />
            }
            sx={{ padding: "10px 24px" }}
          >
            Back to homepage
          </Button>
        </Box>

        <Paper
          elevation={0}
          className={styles.articlePaper}
          sx={{ p: { xs: 3, md: 8, lg: 10 } }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            className={styles.articleTitle}
            sx={{ mb: 6 }}
          >
            {article.title}
          </Typography>

          <Typography variant="body1" className={styles.articleText}>
            {article.summary}
            {"\n\n"}
            {LOREM_IPSUM}
            {"\n\n"}
            {LOREM_IPSUM}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ArticlePage;

