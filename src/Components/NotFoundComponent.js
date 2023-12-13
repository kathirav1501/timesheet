import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";

const NotFoundComponent = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 300,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 2 }} variant="h5">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFoundComponent;
