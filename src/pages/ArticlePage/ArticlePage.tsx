import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Article } from "../../types/article";
import { api } from "../../services/api";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const data = await api.getArticleById(Number(id));
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    // Прокрутка вгору при переході на сторінку
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Typography variant="h5" align="center">
        Article not found
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "245px",
          backgroundImage: `url(${article.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      />

      <Container
        maxWidth="md"
        sx={{ position: "relative", mt: "-50px", pb: 10 }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            p: { xs: 3, md: 8 },
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ mb: 5, fontWeight: 400 }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, fontSize: "18px" }}
          >
            {article.summary}

            {" "
              .repeat(500)
              .split(" ")
              .map(
                () =>
                  "This is a placeholder for the extended article content that would normally come from the API if it provided full text bodies. "
              )
              .join("")}
          </Typography>
        </Box>

        <Box sx={{ mt: 5, ml: { md: 8 } }}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "#363636",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Back to homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticlePage;
