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
  Alert,
  AlertTitle,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import type { RootState } from "../../store/store";
import { api } from "../../services/api";
import type { Article } from "../../types/article";
import styles from "./ArticlePage.module.scss";

const LOREM_TEXT = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  \n\n
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
  eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
  consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
  \n\n
  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`;

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const articlesFromStore = useSelector(
    (state: RootState) => state.articles.items,
  );

  const [article, setArticle] = useState<Article | null>(
    articlesFromStore.find((a) => a.id === Number(id)) || null,
  );
  const [loading, setLoading] = useState<boolean>(!article);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!article && id) {
        setLoading(true);
        setError(null);
        try {
          const data = await api.getArticleById(Number(id));
          setArticle(data);
        } catch (err) {
          setError(
            "Could not load the article details. It might have been removed or the server is down.",
          );
          console.error(err);
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

  if (error || !article) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert
          severity="error"
          variant="outlined"
          action={
            <Button component={Link} to="/" color="inherit" size="small">
              BACK TO HOME
            </Button>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error || "Article not found."}
        </Alert>
      </Container>
    );
  }

  return (
    <Box className={styles.pageWrapper}>
      <Box
        className={styles.heroImage}
        sx={{
          backgroundImage: `url(${article.image_url})`,
        }}
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
            startIcon={
              <ArrowBackIosNewIcon sx={{ fontSize: "14px !important" }} />
            }
            className={styles.backButton}
            sx={{ padding: "10px 24px" }}
          >
            Back to homepage
          </Button>
        </Box>

        <Paper
          elevation={0}
          className={styles.articlePaper}
          sx={{
            p: { xs: 3, md: 8, lg: 10 },
          }}
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
            {LOREM_TEXT}
            {"\n\n"}
            {LOREM_TEXT}
            {"\n\n"}
            {LOREM_TEXT}
            {"\n\n"}
            {LOREM_TEXT}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ArticlePage;
