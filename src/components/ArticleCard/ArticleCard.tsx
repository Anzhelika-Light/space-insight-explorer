import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import TextHighlighter from "../Highlighter/TextHighlighter";

interface Props {
  article: Article;
  searchQuery: string;
}

const ArticleCard = ({ article, searchQuery }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncatedSummary =
    article.summary.length > 100
      ? article.summary.substring(0, 100) + "..."
      : article.summary;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="217"
        image={article.image_url}
        alt={article.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          p: "25px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", opacity: 0.6, mb: 1.5 }}
        >
          <CalendarTodayIcon sx={{ fontSize: 14, mr: 1 }} />
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            {formatDate(article.published_at)}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.25,
            mb: 2,
            minHeight: "2.5em",
          }}
        >
          <TextHighlighter text={article.title} searchQuery={searchQuery} />
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            fontSize: "14px",
            lineHeight: 1.5,
            flexGrow: 1,
          }}
        >
          <TextHighlighter text={truncatedSummary} searchQuery={searchQuery} />
        </Typography>

        <Box
          component={Link}
          to={`/article/${article.id}`}
          sx={{
            textDecoration: "none",
            color: "#363636",
            fontWeight: 700,
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Read more <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
