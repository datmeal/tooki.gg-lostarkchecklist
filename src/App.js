import React, { useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  amber,
  blue,
  indigo,
  lightGreen,
  pink,
  purple,
  deepPurple,
  red,
} from "@mui/material/colors";
import create from "zustand";

import Checklist from "./Checklist";
import Events from "./Events";
import Arbitrage from "./Arbitrage";

import logo from "./img/logo.png";
// import "./App.css";

const defaultValues = {
  siteSettings: {
    tabValue: 0,
    dailyTasksOpen: false,
    accountDailiesOpen: false,
    weeklyTasksOpen: false,
    weeklyVendorsOpen: false,
  },
  dailies: {
    una1: false,
    una2: false,
    una3: false,
    chaos1: false,
    chaos2: false,
    guardian1: false,
    guardian2: false,
    eventguardian: false,
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
    vendorPvp: false,
  },
  rosterStatus: {
    grandprix: false,
    adv: false,
    cal: false,
    chaosgate: false,
    anguishedisle: false,
    cradle: false,
    rapport1: {
      name: "Beatrice",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
    rapport2: {
      name: "Sasha",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
    rapport3: {
      name: "Nineveh",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
    rapport4: {
      name: "Blackfang",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
    rapport5: {
      name: "Thighrain",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
    rapport6: {
      name: "Mari",
      song1: false,
      song2: false,
      emote1: false,
      emote2: false,
    },
  },
};

const useStore = create((set, get) => ({
  toggleSiteSetting: (id) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        [id]: !state.siteSettings[id],
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  addCharacter: () => {
    set((state) => ({
      taskStatus: state.taskStatus.concat({
        id: Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1),
        name: "",
        class: "",
        dailies: defaultValues.dailies,
        weeklies: defaultValues.weeklies,
        weeklyVendors: defaultValues.weeklyVendors,
      }),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
  removeCharacter: (id) => {
    set((state) => ({
      taskStatus: state.taskStatus.reduce((result, character) => {
        if (character.id !== id) {
          result.push(character);
        }
        return result;
      }, []),
    }));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
  resetDailyTasks: () => {
    set((state) => ({
      taskStatus: state.taskStatus.map((item) => ({
        ...item,
        dailies: defaultValues.dailies,
      })),
      // rosterStatus: defaultValues.rosterStatus,
      rosterStatus: _.reduce(
        state.rosterStatus,
        (result, status, item) => {
          const rapports = [
            "rapport1",
            "rapport2",
            "rapport3",
            "rapport4",
            "rapport5",
            "rapport6",
          ];
          if (!_.includes(rapports, item)) {
            result[item] = false;
          } else {
            result[item] = {
              name: status["name"],
              song1: false,
              song2: false,
              emote1: false,
              emote2: false,
            };
          }
          return result;
        },
        {}
      ),
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
  setTabValue: (value) =>
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        tabValue: value,
      },
    })),
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
  toggleRapportStatus: (rapportName, toggleItem) => {
    set((state) => ({
      rosterStatus: {
        ...state.rosterStatus,
        [rapportName]: {
          ...state.rosterStatus[rapportName],
          [toggleItem]: !state.rosterStatus[rapportName][toggleItem],
        },
      },
    }));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  setRapportName: (rapportName, name) => {
    set((state) => ({
      rosterStatus: {
        ...state.rosterStatus,
        [rapportName]: {
          ...state.rosterStatus[rapportName],
          name,
        },
      },
    }));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  updateSiteSettings: (siteSettings) => {
    set((state) => ({ siteSettings }));
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
  siteSettings: defaultValues.siteSettings,
  taskStatus: [
    {
      id: "0",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: "1",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: "2",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: "3",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: "4",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
    {
      id: "5",
      name: "",
      class: "Berserker",
      dailies: defaultValues.dailies,
      weeklies: defaultValues.weeklies,
      weeklyVendors: defaultValues.weeklyVendors,
    },
  ],
  rosterStatus: defaultValues.rosterStatus,
}));

const defaultGoldPrices = {
  crystal: 530, // per 95
  royal: 596, // per 238 royal
  destructionStoneFragment: 1,
  destructionStone: 7,
  destructionStoneCrystal: 25,
  guardianStoneFragment: 1,
  guardianStone: 9,
  guardianStoneCrystal: 17,
  harmonyShardM: 230,
  lifeShardS: 210,
  honorShardS: 53,
  harmonyLeapstone: 16,
  lifeLeapstone: 24,
  honorLeapstone: 97,
  greatHonorLeapstone: 365,
  starsBreath: 7,
  moonsBreath: 22,
  solarGrace: 59,
  solarBlessing: 190,
  solarProtection: 465,
  caldarrFusion: 7,
  basicOrehaFusion: 9,
  simpleOrehaFusion: 10,
  healingBattleChest: 29, // Elemental HP Potion taken from chest
  buffBattleChestAwakening: 24,
  offensiveBattleChestDestruction: 14,
  utilityBattleChestFlare: 10,
  utilityBattleChestTimeStop: 29,
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
        [event.target.id]: parseInt(event.target.value),
      },
    }));
    localStorage.setItem("goldValues", JSON.stringify(get().goldValues));
  },
  updateGV: (goldValues) => {
    const localGoldValues = _.reduce(
      goldValues,
      (result, itemValue, itemName) => {
        Object.assign(result, { [itemName]: parseInt(itemValue) });
        return result;
      },
      {}
    );
    set((state) => ({
      goldValues: {
        ...defaultGoldPrices,
        ...localGoldValues,
      },
    }));
  },
}));

const defaultEventSettings = {
  favorites: [],
  filter: {
    fever: {
      grandprix: true,
    },
    adventure: {
      asura: true,
      drumbeat: true,
      forpe: true,
      harmony: true,
      lagoon: true,
      lushreed: true,
      medeia: true,
      monte: true,
      oblivion: true,
      opportunity: true,
      phantomwing: true,
      snowpang: true,
      tranquil: true,
      volare: true,
    },
    chaos: {
      chaos_phantom_302: true,
      chaos_darkness_302: true,
      chaos_chaos_302: true,
      chaos_plague_302: true,
      chaos_phantom_460: true,
      chaos_plague_802: true,
      chaos_darkness_960: true,
      chaos_chaos_1302: true,
    },
    fieldboss: {
      ancheladus: true,
      aurion: true,
      brealeos: true,
      chaoticchuo: true,
      harvestlordincarnate: true,
      kohinorr: true,
      magmadon: true,
      moake: true,
      proxima: true,
      tarsila: true,
      signatus: true,
      solgrande: true,
    },
    ghostship: {
      ghostship_460: true,
      ghostship_960: true,
      ghostship_1370: true,
    },
    islands: {
      alakkir: true,
      deathshold: true,
      erasmo: true,
      gesbroy: true,
      illusion: true,
      lullaby: true,
      shangra: true,
      spida: true,
      tooki: true,
      unknown: true,
    },
    sailing: {
      sailingcoop_arthetine: true,
      sailingcoop_anikka: true,
      sailingcoop_vern: true,
      sailingcoop_rohendel: true,
      sailingcoop_yorn: true,
      sailingcoop_feiton: true,
      sailingcoop_punika: true,
      sailingcoop_harmony: true,
      sailingcoop_wisdom: true,
      sailingcoop_earth: true,
      sailingcoop_endurance: true,
      sailingcoop_guidance: true,
    },
    pvp: {
      coopbattle: true,
    },
  },
  offset: 0, // misc
  timezone: -4, // East = 0 (UTC - 4 (- 0))
};

const eventsStore = create((set, get) => ({
  currentDay: moment().utc().subtract(4, "hours").day(),
  currentTime: moment().utc().subtract(4, "hours").format("HH:mm:ss"),
  eventList: [],
  eventSettings: defaultEventSettings,
  favorites: [],
  addFavorite: (event) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        favorites: state.eventSettings.favorites.concat(event),
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  removeFavorite: (event) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        favorites: state.eventSettings.favorites.reduce((result, favorite) => {
          if (favorite !== event) {
            result.push(favorite);
          }
          return result;
        }, []),
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  setCurrentTime: (currentTime) => {
    set((state) => ({ currentTime }));
  },
  setCurrentDay: (currentDay) => {
    set((state) => ({ currentDay }));
  },
  setEventList: (eventList) => {
    set((state) => ({ eventList }));
  },
  toggleFilter: (selectedCategory, selectedId) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        filter: _.set(
          state.eventSettings.filter,
          `${selectedCategory}.${selectedId}`,
          !state.eventSettings["filter"][selectedCategory][selectedId]
        ),
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  setOffset: (offset) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        offset,
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  setTimezone: (timezone) => {
    set((state) => ({
      eventSettings: {
        ...state.eventSettings,
        timezone,
      },
    }));
    localStorage.setItem("eventSettings", JSON.stringify(get().eventSettings));
  },
  updateES: (eventSettings) => set((state) => ({ eventSettings })),
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
    una: {
      main: lightGreen[500],
    },
    unaW: {
      main: indigo["A100"],
    },
    chaos: {
      main: amber[500],
    },
    guardian: {
      main: red[300],
    },
    adventure: {
      main: purple[200],
    },
    boss: {
      main: red["A700"],
    },
    chaosGate: {
      main: deepPurple["A100"],
    },
    ghost: {
      main: deepPurple[200],
    },
    rapport: {
      main: pink[200],
    },
    abyssD: {
      main: blue[200],
    },
    abyssR: {
      main: blue[400],
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
  const updateES = eventsStore((state) => state.updateES);
  // const setTabValue = useStore((state) => state.setTabValue);
  // const siteSettings = useStore((state) => state.siteSettings);
  const updateSiteSettings = useStore((state) => state.updateSiteSettings);

  // Initialize
  useEffect(() => {
    const localSiteSettings = localStorage.getItem("siteSettings");
    const localTaskStatus = localStorage.getItem("taskStatus");
    const parsedLocalTasks = JSON.parse(localTaskStatus);
    const localRosterStatus = localStorage.getItem("rosterStatus");
    const localEventSettings = localStorage.getItem("eventSettings");

    if (localSiteSettings) {
      updateSiteSettings(JSON.parse(localSiteSettings));
    }
    if (localTaskStatus) {
      if (_.has(parsedLocalTasks[0], "weeklyVendors")) {
        updateTS(parsedLocalTasks);
      } else {
        _.each(parsedLocalTasks, (char) => {
          char.weeklyVendors = defaultValues.weeklyVendors;
        });
        updateTS(parsedLocalTasks);
      }
      // const parsedSettings = JSON.parse(localTaskStatus);
      // const updatedSettings = { ...defaultValues.taskStatus };
    }
    if (localRosterStatus) {
      const parsedSettings = JSON.parse(localRosterStatus);
      const updatedSettings = { ...defaultValues.rosterStatus };
      _.each(parsedSettings, (value, settingName) => {
        updatedSettings[settingName] = value;
      });
      updateRS(updatedSettings);
    }
    if (localEventSettings) {
      const parsedSettings = JSON.parse(localEventSettings);
      const updatedSettings = { ...defaultEventSettings };
      _.each(parsedSettings.filter, (categoryObj, categoryName) => {
        _.each(categoryObj, (value, index) => {
          updatedSettings["filter"][categoryName][index] = value;
        });
      });
      if (parsedSettings.favorites) {
        updatedSettings.favorites = _.map(parsedSettings.favorites);
      }
      if (parsedSettings.timezone) {
        updatedSettings.timezone = parsedSettings.timezone;
      }
      if (parsedSettings.offset) {
        updatedSettings.offset = parsedSettings.offset;
      }
      updateES(updatedSettings);
    }
  }, []);

  // console.log(JSON.parse(localTaskStatus), JSON.parse(localRosterStatus));

  const TabPanel = (props) => {
    const { children, noPadding = false, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Paper
            variant="outlined"
            sx={
              noPadding
                ? { margin: "16px 0 8px", p: 0 }
                : { margin: "16px 0 8px", padding: "16px 16px" }
            }
          >
            {children}
          </Paper>
        )}
      </div>
    );
  };

  function tabProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const Logo = styled.div`
    display: flex;
    margin-right: 24px;
    width: 200px;
    img {
      width: 100%;
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ my: 0 }} maxWidth="xl">
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 1,
          }}
        >
          <Grid item md={4} sm={6} xs={12}>
            <Logo>
              <img src={logo} alt="tooki.gg - Lost Ark Tools" />
            </Logo>
          </Grid>
          <Grid item>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Navigation"
              sx={{ justifyContent: "flex-end" }}
            >
              <Tab label="Checklist" {...tabProps(0)} />
              <Tab label="Events" {...tabProps(1)} />
              <Tab label="Mari's Shop" {...tabProps(2)} />
            </Tabs>
          </Grid>
        </Grid>
        <TabPanel value={tabValue} index={0} noPadding>
          <Checklist useStore={useStore} theme={theme} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Events useStore={eventsStore} taskStore={useStore} theme={theme} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Arbitrage useStore={arbitrageStore} theme={theme} />
        </TabPanel>
        <Box
          sx={{
            my: 1,
            p: { xs: 1, md: 1 },
          }}
        >
          <Typography align="center">
            Lost Ark Game content and assets are trademarks of Smilegate RPG,
            Inc. Please send any feedback to Salty#1961 on Discord!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
