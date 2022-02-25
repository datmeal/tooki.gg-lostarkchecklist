import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import create from "zustand";

import Checklist from "./Checklist";

import logo from "./logo.svg";
// import "./App.css";

const defaultValues = {
  dailies: {
    una1: false,
    una2: false,
    una3: false,
    chaos1: false,
    chaos2: false,
    guardian1: false,
    guardian2: false,
    kalthertz: false,
  },
  weeklies: {
    una1: false,
    una2: false,
    una3: false,
    guardian1: false,
    guardian2: false,
    guardian3: false,
    abyssdemonbeastcanyon: false,
    abyssnecromancer: false,
    abysstwistedwarlord: false,
    abysshildebrandt: false,
    abyssroadofsorrow: false,
    abyssforgottenforge: false,
    abyssoblivionsea: false,
    abyssperilousabyss: false,
    abyssunderwatersanctuary: false,
    abyssdistraughtforest: false,
    abyssrottingglade: false,
    abyssraidargos: false,
  },
  rosterStatus: {
    adv: false,
    cal: false,
    chaosgate: false,
    rapportsong1: false,
    rapportsong2: false,
    rapportsong3: false,
    rapportsong4: false,
    rapportsong5: false,
    rapportsong6: false,
    rapportemote1: false,
    rapportemote2: false,
    rapportemote3: false,
    rapportemote4: false,
    rapportemote5: false,
    rapportemote6: false,
  },
};

const useStore = create((set, get) => ({
  resetDailyTasks: () => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) => ({
        ...item,
        dailies: defaultValues.dailies,
      })),
      rosterStatus: defaultValues.rosterStatus,
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  resetWeeklyTasks: () => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) => ({
        ...item,
        weeklies: defaultValues.weeklies,
      })),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleAccountDaily: (id) => {
    set((state) => ({
      rosterStatus: {
        ...state.rosterStatus,
        [id]: !state.rosterStatus[id],
      },
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleDailyStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              dailies: {
                ...item.dailies,
                [task]: !item.dailies[task],
              },
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  toggleWeeklyStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              weeklies: {
                ...item.weeklies,
                [task]: !item.weeklies[task],
              },
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  updateRS: (rosterStatus) => set((state) => ({ rosterStatus })),
  updateTS: (taskStatus) => set((state) => ({ taskStatus })),
  updateName: (id, name) =>
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
            }
          : item
      ),
    })),
  taskStatus: [
    {
      id: 0,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
    {
      id: 1,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
    {
      id: 2,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
    {
      id: 3,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
    {
      id: 4,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
    {
      id: 5,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
    },
  ],
  rosterStatus: defaultValues.rosterStatus,
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
  },
});

// function saveLocalStorage() {
//   const taskStatus = useStore((state) => state.taskStatus);
//   const rosterStatus = useStore((state) => state.rosterStatus);
//   localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
//   localStorage.setItem("rosterStatus", JSON.stringify(rosterStatus));
// }

function App() {
  const updateRS = useStore((state) => state.updateRS);
  const updateTS = useStore((state) => state.updateTS);

  const localTaskStatus = localStorage.getItem("taskStatus");
  const localRosterStatus = localStorage.getItem("rosterStatus");

  if (localTaskStatus) {
    updateTS(JSON.parse(localTaskStatus));
  }
  if (localRosterStatus) {
    updateRS(JSON.parse(localRosterStatus));
  }

  // console.log(JSON.parse(localTaskStatus), JSON.parse(localRosterStatus));

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
          <Checklist useStore={useStore} theme={theme} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
