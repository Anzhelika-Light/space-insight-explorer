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

const LOREM_IPSUM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  \n\n
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
  eos qui ratione voluptatem sequi nesciunt. 
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
          sx={{ backgroundColor: "#363636" }}
        >
          Back to homepage
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", pb: 10 }}>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          backgroundImage: `url(${article.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ pt: "300px", position: "relative", zIndex: 1 }}
      >
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
            sx={{
              backgroundColor: "#ffffff",
              color: "#363636",
              fontWeight: 700,
              textTransform: "none",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              padding: "10px 24px",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
              border: "1px solid #b8b5b5",
              "&:hover": {
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Back to homepage
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 8, lg: 10 },
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{
              mb: 6,
              fontWeight: 400,
              fontFamily: "Montserrat, sans-serif",
              color: "#363636",
              lineHeight: 1.2,
            }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              fontSize: "18px",
              color: "#000000",
              fontFamily: "Montserrat, sans-serif",
              whiteSpace: "pre-line",
            }}
          >
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
