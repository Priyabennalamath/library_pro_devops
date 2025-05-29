import { Helmet } from "react-helmet-async";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Library | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* Welcome Message */}
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {user.name.split(' ')[0]}, Welcome back to Library 
        </Typography>

        {/* Library Image */}
        <Box
          sx={{
            width: "100%",
            height: 600,
            backgroundImage: `url('https://www.photohound.co/images/1037748l.jpg')`, // Replace with your actual image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            boxShadow: theme.shadows[3],
          }}
        />

        {/* Additional Information */}
        <Typography
          variant="h6"
          sx={{
            mt: 5,
            color: theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          {/* Dive into your library resources, track your reading, and explore the latest updates. */}
        </Typography>
      </Container>
    </>
  );
}
