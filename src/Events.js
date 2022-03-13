import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";

export default function Checklist(props) {
  const { theme, useStore } = props;

  return (
    <ThemeProvider theme={theme}>
      Coming soon. This is going to be my greatest work.
    </ThemeProvider>
  );
}
