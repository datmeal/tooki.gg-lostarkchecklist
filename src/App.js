import React, { useEffect } from "react";
import _ from "lodash";
import { format, subHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
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
import SettingsIcon from "@mui/icons-material/Settings";
import create from "zustand";

import Checklist from "./Checklist";
import Events from "./Events";
import Arbitrage from "./Arbitrage";

// Image / Color Stuff
import icon_guild from "./img/icon_guild.png";
import icon_una_daily from "./img/icon_una_daily.png";
import icon_una_weekly from "./img/icon_una_weekly.png";
import icon_chaos_dungeon from "./img/icon_chaos_dungeon.png";
import icon_guardian from "./img/icon_guardian.png";
import icon_gvg from "./img/icon_gvg.png";
import icon_adventure_island from "./img/icon_adventure_island.png";
import icon_chaos_gate from "./img/icon_chaos_gate.png";
import icon_field_boss from "./img/icon_field_boss.png";
import icon_ghost_ship from "./img/icon_ghost_ship.png";
import icon_rapport from "./img/icon_rapport.png";
import icon_tower from "./img/icon_tower.png";
import icon_abyss_dungeon from "./img/icon_abyss_dungeon.png";
import icon_challenge_abyss_dungeon from "./img/icon_challenge_abyss_dungeon.png";
import icon_abyss_raid from "./img/icon_abyss_raid.png";
import icon_legion_raid from "./img/icon_legion_raid.png";
import icon_grandprix from "./img/events/grandprix.webp";
import icon_bloodstone from "./img/icon_bloodstone.png";
import icon_pirate_coin from "./img/icon_pirate_coin.png";
import icon_rift_pieces from "./img/icon_rift_pieces.png";
import icon_coin_of_courage from "./img/icon_coin_of_courage.png";
import icon_competitive from "./img/icon_competitive.png";
import icon_anguished from "./img/icon_anguished.png";
import icon_cradle from "./img/icon_cradle.png";
import logo from "./img/logo.png";

// import "./App.css";

function createData(
  name,
  id,
  info = null,
  custom = false,
  icon = null,
  color = null,
  isRoster = false,
  order = null,
  isVisible = true
) {
  return { name, id, info, custom, icon, color, isRoster, order, isVisible };
}

const dailyTaskData = [
  createData(
    `Guild Donations`,
    "guildDonation",
    null,
    false,
    icon_guild,
    null,
    false,
    0
  ),
  createData(
    `Una's Task 1`,
    "una1",
    null,
    false,
    icon_una_daily,
    lightGreen[500],
    false,
    1
  ),
  // createData(
  //   `Una's Task 2`,
  //   "una2",
  //   null,
  //   false,
  //   icon_una_daily,
  //   lightGreen[500]
  // ),
  // createData(
  //   `Una's Task 3`,
  //   "una3",
  //   null,
  //   false,
  //   icon_una_daily,
  //   lightGreen[500]
  // ),
  createData(
    `Chaos Dungeon 1`,
    "chaos1",
    null,
    false,
    icon_chaos_dungeon,
    amber[500],
    false,
    2
  ),
  // createData(
  //   `Chaos Dungeon 2`,
  //   "chaos2",
  //   null,
  //   false,
  //   icon_chaos_dungeon,
  //   amber[500]
  // ),
  createData(
    `Guardian Raid 1`,
    "guardian1",
    null,
    false,
    icon_guardian,
    red[300],
    false,
    3
  ),
  // createData(
  //   `Guardian Raid 2`,
  //   "guardian2",
  //   null,
  //   false,
  //   icon_guardian,
  //   red[300]
  // ),
  createData(
    `Event Guardian`,
    "eventguardian",
    null,
    true,
    icon_guardian,
    red[300],
    false,
    4,
    false
  ),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task",
    true,
    null,
    false,
    5
  ),

  // createData(`Grand Prix`, "grandprix", null, icon_competitive, null, true),
  createData(
    `Adventure Island`,
    "adv",
    null,
    false,
    icon_adventure_island,
    purple[200],
    true,
    6
  ),
  createData(
    `Field Boss`,
    "cal",
    null,
    false,
    icon_field_boss,
    red[300],
    true,
    7
  ),
  createData(
    `Chaos Gate`,
    "chaosgate",
    null,
    false,
    icon_chaos_gate,
    deepPurple["A100"],
    true,
    8
  ),
  createData(
    `Anguished Isle`,
    "anguishedisle",
    null,
    true,
    icon_anguished,
    null,
    true,
    9
  ),
  createData(
    `Cradle of the Sea Fermata`,
    "cradle",
    null,
    true,
    icon_cradle,
    null,
    true,
    10
  ),
  createData(
    `Festival's Success`,
    "festivalssuccess",
    null,
    true,
    icon_adventure_island,
    null,
    false,
    11
  ),
];

const weeklyTaskData = [
  createData(
    `Una's Task 1`,
    "una1",
    null,
    false,
    icon_una_weekly,
    "unaW",
    false,
    0
  ),
  // createData(`Una's Task 2`, "una2", null, false, icon_una_weekly, "unaW"),
  // createData(`Una's Task 3`, "una3", null, false, icon_una_weekly, "unaW"),
  createData(
    `Guardian Challenge 1`,
    "guardian1",
    null,
    false,
    icon_guardian,
    red[300],
    false,
    1
  ),
  createData(
    `Ghostship`,
    "ghostship1",
    null,
    false,
    icon_ghost_ship,
    "ghost",
    true,
    2
  ),
  createData(`GvG / Guild Boss`, "gvg", null, false, icon_gvg, null, true),
  // createData(`Guardian 1`, "guardian1"),
  // createData(`Guardian 2`, "guardian2"),
  // createData(`Guardian 3`, "guardian3"),
  createData(
    `Legion Raid - Valtan`,
    "legionraidvaltan",
    null,
    false,
    icon_legion_raid,
    "abyssR",
    false,
    3
  ),
  createData(
    `Abyss Raid - Argos`,
    "abyssraidargos",
    null,
    false,
    icon_abyss_raid,
    "abyssR",
    false,
    4
  ),
  createData(
    `Challenge Abyss Dungeon`,
    "challengeabyssdungeon",
    null,
    false,
    icon_challenge_abyss_dungeon,
    "abyssD",
    false,
    5
  ),
  createData(
    `[1325] Punika 5-1`,
    "abyssdistraughtforest",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    6
  ),
  createData(
    `[1340] Punika 5-2`,
    "abyssrottingglade",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    7
  ),
  createData(
    `[960] Feiton 4-1`,
    "abyssoblivionsea",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    8
  ),
  createData(
    `[960] Feiton 4-2`,
    "abyssperilousabyss",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    9
  ),
  createData(
    `[960] Feiton 4-3`,
    "abyssunderwatersanctuary",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    10
  ),
  createData(
    `[840] Yorn 3-1`,
    "abyssroadofsorrow",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    11
  ),
  createData(
    `[840] Yorn 3-2`,
    "abyssforgottenforge",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    12
  ),
  createData(
    `[460] Rohendel 2-1`,
    "abysstwistedwarlord",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    13
  ),
  createData(
    `[460] Rohendel 2-2`,
    "abysshildebrandt",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    14
  ),
  createData(
    `[340] Vern 1-1`,
    "abyssdemonbeastcanyon",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    15
  ),
  createData(
    `[340] Vern 1-2`,
    "abyssnecromancer",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD",
    false,
    16
  ),
];

const defaultValues = {
  siteSettings: {
    tabValue: 0,
    dailyTasksOpen: false,
    accountDailiesOpen: false,
    weeklyTasksOpen: false,
    weeklyVendorsOpen: false,
    useRestChaos: false,
    useRestGuardian: false,
    useRestUna: false,
    roster: [],
    dailyTaskStatus: {},
    rosterTaskStatus: {},
    taskSettings: {
      daily: [],
      weekly: [],
      weeklyVendor: [],
    },
    weeklyTaskStatus: {},
  },
  customTask: {
    color: null,
    custom: true,
    icon: null,
    id: "",
    info: null,
    isRoster: false,
    isVisible: true,
    name: "",
    order: null,
  },
  una: {
    name: "",
    location: "",
    current: 0,
    require: 0,
  },
  character: {
    id: "",
    name: "Name/Class",
    ilvl: 0,
    rest_chaos: 0,
    rest_chaos_temp: 0,
    rest_guardian: 0,
    rest_guardian_temp: 0,
    rest_una: 0,
    rest_una_temp: 0,
    una1: {
      name: "",
      location: "",
      current: 0,
      require: 0,
    },
    una2: {
      name: "",
      location: "",
      current: 0,
      require: 0,
    },
    una3: {
      name: "",
      location: "",
      current: 0,
      require: 0,
    },
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
    anguishedisle: false,
    cradle: false,
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
    legionraidvaltan: false,
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
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        roster: state.siteSettings.roster.concat({
          ...defaultValues.character,
          id: id,
        }),
        dailyTaskStatus: {
          ...state.siteSettings.dailyTaskStatus,
          [id]: state.siteSettings.taskSettings.daily.reduce(
            (obj, key) => {
              obj[key.id] = false;
              return obj;
            },
            {
              una2: false,
              una3: false,
              chaos2: false,
              guardian2: false,
            }
          ),
        },
        weeklyTaskStatus: {
          ...state.siteSettings.weeklyTaskStatus,
          [id]: state.siteSettings.taskSettings.weekly.reduce(
            (obj, key) => {
              obj[key.id] = false;
              return obj;
            },
            {
              una2: false,
              una3: false,
              guardian2: false,
              guardian3: false,
            }
          ),
        },
      },
      // eventually will migrate this data as well
      taskStatus: state.taskStatus.concat({
        id: id,
        weeklies: defaultValues.weeklies,
        weeklyVendors: defaultValues.weeklyVendors,
      }),
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
  setDailyTaskSettings: (dailyTasks) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          ...state.siteSettings.taskSettings,
          daily: dailyTasks,
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  addDailyTask: () => {
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    // setTasks(
    //   newTasks.concat(createData(`New Task`, id, null, true, null, null, false))
    // );
    const newTask = {
      ...defaultValues.customTask,
      id,
      name: "New Task",
    };
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          ...state.siteSettings.taskSettings,
          daily: state.siteSettings.taskSettings.daily.concat(newTask),
        },
        dailyTaskStatus: Object.keys(state.siteSettings.dailyTaskStatus).reduce(
          (obj, key) => {
            state.siteSettings.dailyTaskStatus[key][id] = false;
            obj[key] = state.siteSettings.dailyTaskStatus[key];
            return obj;
          },
          {}
        ),
        // dailyTaskStatus: _.map(state.siteSettings.dailyTaskStatus, (item) => [item.id]: item),
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  addWeeklyTask: () => {
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    // setTasks(
    //   newTasks.concat(createData(`New Task`, id, null, true, null, null, false))
    // );
    const newTask = {
      ...defaultValues.customTask,
      id,
      name: "New Task",
    };
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          ...state.siteSettings.taskSettings,
          weekly: state.siteSettings.taskSettings.weekly.concat(newTask),
        },
        weeklyTaskStatus: Object.keys(
          state.siteSettings.weeklyTaskStatus
        ).reduce((obj, key) => {
          state.siteSettings.weeklyTaskStatus[key][id] = false;
          obj[key] = state.siteSettings.weeklyTaskStatus[key];
          return obj;
        }, {}),
        // weeklyTaskStatus: _.map(state.siteSettings.weeklyTaskStatus, (item) => [item.id]: item),
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  removeCharacter: (id) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        roster: state.siteSettings.roster.reduce((result, character) => {
          if (character.id !== id) {
            result.push(character);
          }
          return result;
        }, []),
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  resetDailyTasks: (roster, dailyTaskStatus) => {
    // console.log("resetDailyTasks:", roster, dailyTaskStatus);
    // check if 1 or 2 chaos is checked, subtract 20 per check if rest is over 20/40. if only 1 or 0 checked, add 10/20 rest to roster[char]
    const updatedRoster = roster.reduce((result, char) => {
      let character = _.cloneDeep(char);
      const checks = _.find(
        dailyTaskStatus,
        (item, index) => index === char.id
      );
      const chaosNames = ["chaos1", "chaos2"];
      if (char.rest_chaos_temp < 100) {
        _.each(chaosNames, (task) => {
          if (!checks[task]) {
            character.rest_chaos_temp += 10;
          }
        });
      }
      const guardianNames = ["guardian1", "guardian2"];
      if (char.rest_guardian_temp < 100) {
        _.each(guardianNames, (task) => {
          if (!checks[task]) {
            character.rest_guardian_temp += 10;
          }
        });
      }
      const unaNames = ["una1", "una2", "una3"];
      if (char.rest_una_temp < 100) {
        _.each(unaNames, (task) => {
          if (!checks[task]) {
            character.rest_una_temp += 10;
          }
        });
      }
      character.rest_chaos_temp =
        character.rest_chaos_temp > 100 ? 100 : character.rest_chaos_temp;
      character.rest_guardian_temp =
        character.rest_guardian_temp > 100 ? 100 : character.rest_guardian_temp;
      character.rest_una_temp =
        character.rest_una_temp > 100 ? 100 : character.rest_una_temp;
      character.rest_chaos = character.rest_chaos_temp;
      character.rest_guardian = character.rest_guardian_temp;
      character.rest_una = character.rest_una_temp;
      result.push(character);
      return result;
    }, []);
    const updatedDailyTaskStatus = _.reduce(
      dailyTaskStatus,
      (result, item, charId) => {
        return _.set(result, charId, defaultValues.dailies);
      },
      {}
    );
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        roster: updatedRoster,
        // dailyTaskStatus: updatedDailyTaskStatus,
        dailyTaskStatus: Object.keys(state.siteSettings.dailyTaskStatus).reduce(
          (obj, key) => {
            obj[key] = Object.keys(
              state.siteSettings.dailyTaskStatus[key]
            ).reduce((result, task) => {
              return { ...result, [task]: false };
            }, {});
            return obj;
          },
          {}
        ),
        rosterTaskStatus: _.reduce(
          state.siteSettings.taskSettings.daily.reduce((result, task) => {
            // filter down to an array of legitimate ids(isRoster)
            if (task.isRoster) {
              result.push(task.id);
            }
            return result;
          }, []),
          (result, item) => {
            result[item] = false;
            return result;
          },
          state.siteSettings.rosterTaskStatus
        ),
      },
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
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
    localStorage.setItem("rosterStatus", JSON.stringify(get().rosterStatus));
  },
  resetWeeklyTasks: () => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        // time for the boosy-mcboose double-reduce
        // it's my code and I can write what I want to
        rosterTaskStatus: _.reduce(
          state.siteSettings.taskSettings.weekly.reduce((result, task) => {
            // filter down to an array of legitimate ids(isRoster)
            if (task.isRoster) {
              result.push(task.id);
            }
            return result;
          }, []),
          (result, item) => {
            result[item] = false;
            return result;
          },
          state.siteSettings.rosterTaskStatus
        ),
        weeklyTaskStatus: Object.keys(
          state.siteSettings.weeklyTaskStatus
        ).reduce((obj, key) => {
          obj[key] = Object.keys(
            state.siteSettings.weeklyTaskStatus[key]
          ).reduce((result, task) => {
            return { ...result, [task]: false };
          }, {});
          return obj;
        }, {}),
      },
      taskStatus: state.taskStatus.reduce((result, char) => {
        char.weeklyVendors = Object.keys(char.weeklyVendors).reduce(
          (result, task) => {
            return {
              ...result,
              [task]: false,
            };
          },
          {}
        );
        result.push(char);
        return result;
      }, []),
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
    localStorage.setItem("taskStatus", JSON.stringify(get().taskStatus));
  },
  setDailyTasks: (dailyTasks) => {
    const orderedTasks = dailyTasks.reduce((result, task, index) => {
      task.order = index;
      result.push(task);
      return result;
    }, []);
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          ...state.siteSettings.taskSettings,
          daily: orderedTasks,
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  setWeeklyTasks: (weeklyTasks) => {
    const orderedTasks = weeklyTasks.reduce((result, task, index) => {
      task.order = index;
      result.push(task);
      return result;
    }, []);
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          ...state.siteSettings.taskSettings,
          weekly: orderedTasks,
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
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
      siteSettings: {
        ...state.siteSettings,
        dailyTaskStatus: {
          ...state.siteSettings.dailyTaskStatus,
          [id]: {
            ...state.siteSettings.dailyTaskStatus[id],
            [task]: !state.siteSettings.dailyTaskStatus[id][task],
          },
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  createRosterStatus: (taskId) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        rosterTaskStatus: {
          ...state.siteSettings.rosterTaskStatus,
          [taskId]: false,
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  toggleRosterStatus: (taskId) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        rosterTaskStatus: {
          ...state.siteSettings.rosterTaskStatus,
          [taskId]: !state.siteSettings.rosterTaskStatus[taskId],
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  toggleWeeklyStatus: (task, id) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        weeklyTaskStatus: {
          ...state.siteSettings.weeklyTaskStatus,
          [id]: {
            ...state.siteSettings.weeklyTaskStatus[id],
            [task]: !state.siteSettings.weeklyTaskStatus[id][task],
          },
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  deleteTask: (taskId) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        taskSettings: {
          daily: state.siteSettings.taskSettings.daily.reduce(
            (result, task) => {
              if (task.id !== taskId) {
                result.push(task);
              }
              return result;
            },
            []
          ),
          weekly: state.siteSettings.taskSettings.weekly.reduce(
            (result, task) => {
              if (task.id !== taskId) {
                result.push(task);
              }
              return result;
            },
            []
          ),
        },
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
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
  updateCharacter: (character) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        roster: state.siteSettings.roster.map((item) =>
          item.id === character.id ? character : item
        ),
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  updateSiteSettings: (siteSettings) => {
    set((state) => ({ siteSettings }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
  },
  updateRS: (rosterStatus) => set((state) => ({ rosterStatus })),
  updateTS: (taskStatus) => set((state) => ({ taskStatus })),
  updateClass: (id, charclass) => {
    set((state) => ({
      siteSettings: {
        ...state.siteSettings,
        roster: state.siteSettings.roster.map((item) =>
          item.id === id
            ? {
                ...item,
                name: charclass,
              }
            : item
        ),
      },
    }));
    localStorage.setItem("siteSettings", JSON.stringify(get().siteSettings));
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
  siteSettings: {
    ...defaultValues.siteSettings,
    roster: [
      {
        id: "0",
        name: "Berserker",
        ilvl: 0,
        rest_chaos: 0,
        rest_chaos_temp: 0,
        rest_guardian: 0,
        rest_guardian_temp: 0,
        rest_una: 0,
        rest_una_temp: 0,
        una1: {
          ...defaultValues.una,
        },
        una2: {
          ...defaultValues.una,
        },
        una3: {
          ...defaultValues.una,
        },
      },
    ],
    dailyTaskStatus: {
      0: defaultValues.dailies,
    },
    weeklyTaskStatus: {
      0: defaultValues.weeklies,
    },
    rosterTaskStatus: dailyTaskData
      .concat(weeklyTaskData)
      .reduce((result, task) => {
        if (task.isRoster) {
          result[task.id] = false;
        }
        return result;
      }, {}),
    taskSettings: {
      daily: dailyTaskData,
      weekly: weeklyTaskData,
    },
  },
  taskSettings: {
    // dont use this
    daily: [],
    weekly: [],
  },
  taskStatus: [
    {
      id: "0",
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
  crystal: 390, // per 95
  royal: 385, // per 238 royal
  destructionStoneFragment: 1,
  destructionStone: 4,
  destructionStoneCrystal: 15,
  guardianStoneFragment: 1,
  guardianStone: 5,
  guardianStoneCrystal: 10,
  harmonyShardM: 141,
  lifeShardS: 110,
  honorShardS: 23,
  harmonyLeapstone: 4,
  lifeLeapstone: 8,
  honorLeapstone: 19,
  greatHonorLeapstone: 95,
  starsBreath: 5,
  moonsBreath: 6,
  solarGrace: 28,
  solarBlessing: 100,
  solarProtection: 210,
  caldarrFusion: 5,
  basicOrehaFusion: 9,
  simpleOrehaFusion: 9,
  healingBattleChest: 17, // Elemental HP Potion taken from chest
  healingBattleChestMajor: 7, // blue HP potion
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
  currentDay: formatInTimeZone(subHours(new Date(), 4), "UTC", "i"),
  currentTime: formatInTimeZone(subHours(new Date(), 4), "UTC", "HH:mm:ss"),
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
      contrastText: "#fff",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
    rare: "#00b5ff",
    epic: "#bf00fe",
    legendary: "#f39303",
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
    const parsedSiteSettings = JSON.parse(localSiteSettings);
    const localTaskStatus = localStorage.getItem("taskStatus");
    const parsedLocalTasks = JSON.parse(localTaskStatus);
    const localRosterStatus = localStorage.getItem("rosterStatus");
    const parsedRosterStatus = JSON.parse(localRosterStatus);
    const localEventSettings = localStorage.getItem("eventSettings");

    const defaultUna = {
      name: "",
      location: "",
      current: 0,
      require: 0,
    };

    // console.log(dailyTaskData);

    if (localSiteSettings) {
      let updatedSettings = { ...defaultValues.siteSettings };
      _.each(parsedSiteSettings, (value, settingName) => {
        updatedSettings[settingName] = value;
      });
      // new roster data format, get the old format and replace contents if necessary
      if (localTaskStatus && !_.has(parsedSiteSettings, "roster")) {
        console.log("parsed:", parsedSiteSettings);
        // converting old localStorage data to new format
        const oldRoster = _.reduce(
          parsedLocalTasks,
          (result, char) => {
            const character = {
              id: _.toString(char.id),
              name: char.class,
              ilvl: 0,
              rest_chaos: 0,
              rest_chaos_temp: 0,
              rest_guardian: 0,
              rest_guardian_temp: 0,
              rest_una: 0,
              rest_una_temp: 0,
              una1: {
                ...defaultUna,
              },
              una2: {
                ...defaultUna,
              },
              una3: {
                ...defaultUna,
              },
            };
            result.push(character);
            return result;
          },
          []
        );
        updatedSettings.roster = oldRoster;
        const updatedDailyTaskStatus = _.reduce(
          parsedLocalTasks,
          (result, char) => {
            const dailyStatus = {
              [char.id]: char.dailies,
            };
            result = {
              ...result,
              ...dailyStatus,
            };
            return result;
          },
          {}
        );
        const updatedWeeklyTaskStatus = _.reduce(
          parsedLocalTasks,
          (result, char) => {
            const weeklyStatus = {
              [char.id]: char.weeklies,
            };
            result = {
              ...result,
              ...weeklyStatus,
            };
            return result;
          },
          {}
        );
        // console.log(updatedDailyTaskStatus);
        updatedSettings.dailyTaskStatus = updatedDailyTaskStatus;
        updatedSettings.weeklyTaskStatus = updatedWeeklyTaskStatus;
      } else {
        // Already on new format
        const updatedDailyTaskStatus = _.reduce(
          parsedSiteSettings.roster,
          (result, char) => {
            const dailyStatus = {
              [char.id]: parsedSiteSettings.dailyTaskStatus[char.id],
            };
            // console.log(dailyStatus);
            result = {
              ...result,
              ...dailyStatus,
            };
            return result;
          },
          {}
        );
        // console.log(updatedDailyTaskStatus);
        updatedSettings.dailyTaskStatus = updatedDailyTaskStatus;

        if (_.has(parsedSiteSettings, "weeklyTaskStatus")) {
          updatedSettings.weeklyTaskStatus = parsedSiteSettings.roster.reduce(
            (result, char) => {
              const weeklyStatus = {
                [char.id]: parsedSiteSettings.weeklyTaskStatus[char.id],
              };
              result = {
                ...result,
                ...weeklyStatus,
              };
              return result;
            },
            {}
          );
        } else {
          // grab from taskStatus localStorage
          updatedSettings.weeklyTaskStatus = parsedLocalTasks.reduce(
            (result, char) => {
              const weeklyStatus = {
                [char.id]: char.weeklies,
              };
              result = {
                ...result,
                ...weeklyStatus,
              };
              return result;
            },
            {}
          );
        }
      }
      if (_.isEmpty(parsedSiteSettings.rosterTaskStatus)) {
        updatedSettings.rosterTaskStatus = _.reduce(
          parsedRosterStatus,
          (result, task, name) => {
            if (
              [
                "grandprix",
                "adv",
                "cal",
                "chaosgate",
                "anguishedisle",
                "cradle",
              ].includes(name)
            ) {
              result[name] = task;
            }
            return result;
          },
          {}
        );
      }
      if (
        !_.has(parsedSiteSettings.taskSettings, "daily") ||
        parsedSiteSettings.taskSettings.daily.length === 0
      ) {
        updatedSettings.taskSettings.daily = dailyTaskData;
      } else {
        const customSettings = parsedSiteSettings.taskSettings.daily.reduce(
          (result, task) => {
            const defaultItem = _.find(
              dailyTaskData,
              (item) => item.id === task.id
            );
            if (task.custom || !_.isEqual(task, defaultItem)) {
              result.push(task);
            }

            return result;
          },
          []
        );
        // console.log("daily:", dailyTaskData);
        // delete default task data if custom exists
        let updatedDailyTasks = dailyTaskData.reduce((result, task) => {
          const customTaskExists = customSettings.find(
            (customTask) => customTask.id === task.id
          );
          if (!customTaskExists) {
            result.push(task);
          }
          return result;
        }, []);
        // add customized tasks
        _.each(customSettings, (task) => {
          updatedDailyTasks.push(task);
        });
        updatedSettings.taskSettings.daily = updatedDailyTasks;
      }
      if (
        !_.has(parsedSiteSettings.taskSettings, "weekly") ||
        parsedSiteSettings.taskSettings.weekly.length === 0
      ) {
        updatedSettings.taskSettings.weekly = weeklyTaskData;
      } else {
        const customSettings = parsedSiteSettings.taskSettings.weekly.reduce(
          (result, task) => {
            const defaultItem = _.find(
              weeklyTaskData,
              (item) => item.id === task.id
            );
            const isOldGhostship =
              task.id === "ghostship1" && !_.isEmpty(task.info);
            if (
              task.custom ||
              !_.isEqual(task, defaultItem) ||
              !["una2", "una3"].includes(task.id) ||
              !isOldGhostship
            ) {
              result.push(task);
            }

            return result;
          },
          []
        );
        // delete default task data if custom exists
        // console.log("weeklyTaskData", weeklyTaskData);
        let updatedWeeklyTasks = weeklyTaskData.reduce((result, task) => {
          const customTaskExists = customSettings.find(
            (customTask) => customTask.id === task.id
          );
          if (!customTaskExists) {
            result.push(task);
          }
          return result;
        }, []);
        // add customized tasks
        _.each(customSettings, (task) => {
          if (task.id === "ghostship1") {
            // removing the roster note, it is superfluous
            task.info = null;
            task.isRoster = true;
          }
          // removing 2 and 3, they are merging with 1
          if (!["una2", "una3"].includes(task.id)) {
            updatedWeeklyTasks.push(task);
          }
        });
        updatedSettings.taskSettings.weekly = updatedWeeklyTasks;
      }
      updateSiteSettings(updatedSettings);
    } else {
      // first time loading page / no siteSettings
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
          <Grid item sm={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Logo>
                <img src={logo} alt="tooki.gg - Lost Ark Tools" />
              </Logo>
              <Typography
                variant="subtitle2"
                sx={{
                  transform: "rotate(5deg)",
                  fontSize: 11,
                  verticalAlign: "top",
                }}
                color="chaos.main"
              >
                Tasks may now be customized by clicking <SettingsIcon />
                <br />
                Now hide those pesky abyss dungeons
                <br />
                Please report any problems!
              </Typography>
            </Box>
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
          <Arbitrage
            siteStore={useStore}
            useStore={arbitrageStore}
            theme={theme}
          />
        </TabPanel>
        <Box
          sx={{
            my: 1,
            p: { xs: 1, md: 1 },
          }}
        >
          <Typography align="center">
            Lost Ark Game content and assets are trademarks of Smilegate RPG,
            Inc. Please send any feedback to Salty#1961 on Discord or{" "}
            <Link href="https://github.com/datmeal/lostarkchecklist/issues">
              here
            </Link>{" "}
            on Github!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
