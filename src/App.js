import * as React from "react";
import _ from "lodash";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import create from "zustand";

import Checklist from "./Checklist";
import Arbitrage from "./Arbitrage";

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
    guildDonation: false,
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
    ghostship1: false,
  },
  weeklyVendors: {
    vendorGuild: false,
    vendorPirate: false,
    vendorRift: false,
    vendorChaos: false,
  },
  rosterStatus: {
    adv: false,
    cal: false,
    chaosgate: false,
    anguishedisle: false,
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
        weeklyVendors: defaultValues.weeklyVendors,
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
  toggleWeeklyVendorStatus: (task, id) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              weeklyVendors: {
                ...item.weeklyVendors,
                [task]: !item.weeklyVendors[task],
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
  updateClass: (id, charclass) => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              class: charclass,
            }
          : item
      ),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
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
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 1,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 2,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 3,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 4,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: 5,
      name: "",
      class: "",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
  ],
  rosterStatus: defaultValues.rosterStatus,
}));

const defaultGoldPrices = {
  crystal: 598, // per 95
  royal: 596, // per 238 royal
  destructionStoneFragment: 6,
  destructionStone: 7,
  destructionStoneCrystal: 131,
  guardianStoneFragment: 4,
  guardianStone: 15,
  guardianStoneCrystal: 68,
  harmonyLeapstone: 15,
  lifeLeapstone: 125,
  honorLeapstone: 224,
  starsBreath: 23,
  moonsBreath: 75,
  solarGrace: 69,
  solarBlessing: 240,
  solarProtection: 600,
  healingBattleChest: 29, // Elemental HP Potion taken from chest
  buffBattleChestAwakening: 29,
  t2gem: 18,
  t3gem: 85,
};

const arbitrageStore = create((set, get) => ({
  goldValues: {
    ...defaultGoldPrices,
  },
  setPrice: (event) => {
    // console.log(event.target.id);
    set((state) => ({
      goldValues: {
        ...state.goldValues,
        [event.target.id]: event.target.value,
      },
    }));
    localStorage.setItem("goldValues", JSON.stringify(get().goldValues));
  },
  updateGV: (goldValues) => set((state) => ({ goldValues })),
}));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      success: "#4ade80",
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
  const updateGV = arbitrageStore((state) => state.updateGV);

  const localTaskStatus = localStorage.getItem("taskStatus");
  const parsedLocalTasks = JSON.parse(localTaskStatus);
  const localRosterStatus = localStorage.getItem("rosterStatus");
  const localGoldValues = localStorage.getItem("goldValues");

  if (localTaskStatus) {
    if (_.has(parsedLocalTasks[0], "weeklyVendors")) {
      updateTS(parsedLocalTasks);
    } else {
      _.each(parsedLocalTasks, (char) => {
        char.weeklyVendors = defaultValues.weeklyVendors;
      });
      updateTS(parsedLocalTasks);
    }
  }
  if (localRosterStatus) {
    updateRS(JSON.parse(localRosterStatus));
  }
  if (localGoldValues) {
    updateGV(JSON.parse(localGoldValues));
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
          <Checklist useStore={useStore} theme={theme} />
        </Paper>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Arbitrage useStore={arbitrageStore} theme={theme} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
