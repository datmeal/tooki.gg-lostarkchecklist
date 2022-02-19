import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Checklist from "./Checklist";

import logo from "./logo.svg";
import "./App.css";

import Button from "@mui/material/Button";

const theme = createTheme();

function resetValues() {
  alert(`doesn't work lol`);
  // should look into default states and loading from local storage
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Lost Ark Dailies/Weeklies Checklist
          </Typography>
          <Grid container justifyContent="center">
            <Button
              color="error"
              variant="contained"
              onClick={() => resetValues()}
            >
              Reset
            </Button>
          </Grid>
          <Checklist />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
