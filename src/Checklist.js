import * as React from "react";
import _ from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "@emotion/styled";
import { arrayMoveImmutable, arrayMoveMutable } from "array-move";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
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
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import create from "zustand";
import CharacterSelect from "./CharacterSelect";

// Image / Color Stuff
import icon_guild from "./img/icon_guild.png";
import icon_una_daily from "./img/icon_una_daily.png";
import icon_una_weekly from "./img/icon_una_weekly.png";
import icon_chaos_dungeon from "./img/icon_chaos_dungeon.png";
import icon_guardian from "./img/icon_guardian.png";
import icon_adventure_island from "./img/icon_adventure_island.png";
import icon_chaos_gate from "./img/icon_chaos_gate.png";
import icon_field_boss from "./img/icon_field_boss.png";
import icon_ghost_ship from "./img/icon_ghost_ship.png";
import icon_rapport from "./img/icon_rapport.png";
import icon_tower from "./img/icon_tower.png";
import icon_abyss_dungeon from "./img/icon_abyss_dungeon.png";
import icon_abyss_raid from "./img/icon_abyss_raid.png";
import icon_grandprix from "./img/events/grandprix.webp";
import icon_bloodstone from "./img/icon_bloodstone.png";
import icon_pirate_coin from "./img/icon_pirate_coin.png";
import icon_rift_pieces from "./img/icon_rift_pieces.png";
import icon_coin_of_courage from "./img/icon_coin_of_courage.png";
import icon_competitive from "./img/icon_competitive.png";
import icon_anguished from "./img/icon_anguished.png";
import icon_cradle from "./img/icon_cradle.png";
import { LinearProgress } from "@mui/material";

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

// const dailies = {
//     id: 'guildDonation', // id
//     checked: false, // checkbox status
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     order: null, // row order
//     roster: false, // once per roster (one checkbox)
//     show: true, // show only on Setting Mode when false
// }

// const dailies = [
//   createData(`Guild Donation`, "guildDonation", null, false, icon_guild),
//   // createData(`Guild Mission`, "guildMission", null, false, icon_guild),
//   createData(`Una's Task 1`, "una1", null, false, icon_una_daily, "una"),
//   createData(`Una's Task 2`, "una2", null, false, icon_una_daily, "una"),
//   createData(`Una's Task 3`, "una3", null, false, icon_una_daily, "una"),
//   createData(
//     `Chaos Dungeon 1`,
//     "chaos1",
//     null,
//     false,
//     icon_chaos_dungeon,
//     "chaos"
//   ),
//   createData(
//     `Chaos Dungeon 2`,
//     "chaos2",
//     null,
//     false,
//     icon_chaos_dungeon,
//     "chaos"
//   ),
//   createData(
//     `Guardian Raid 1`,
//     "guardian1",
//     null,
//     false,
//     icon_guardian,
//     "guardian"
//   ),
//   createData(
//     `Guardian Raid 2`,
//     "guardian2",
//     null,
//     false,
//     icon_guardian,
//     "guardian"
//   ),
//   createData(
//     `Event Guardian`,
//     "eventguardian",
//     null,
//     true,
//     icon_guardian,
//     "guardian"
//   ),
//   createData(
//     `Kalthertz`,
//     "kalthertz",
//     "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task",
//     true // custom, deletable/hideable
//   ),
// ];

// const dailies = {
//     id: 'guildDonation', // id
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     isRoster: false, // once per roster (one checkbox)
//     minilvl: null,
//     maxilvl: null,
// }

const taskData = [
  createData(`Guild Donations`, "guildDonation", null, false, icon_guild),
  createData(
    `Una's Task 1`,
    "una1",
    null,
    false,
    icon_una_daily,
    lightGreen[500]
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
    amber[500]
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
    red[300]
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
    red[300]
  ),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task",
    true
  ),

  // createData(`Grand Prix`, "grandprix", null, icon_competitive, null, true),
  createData(
    `Adventure Island`,
    "adv",
    null,
    false,
    icon_adventure_island,
    purple[200],
    true
  ),
  createData(`Field Boss`, "cal", null, false, icon_field_boss, red[300], true),
  createData(
    `Chaos Gate`,
    "chaosgate",
    null,
    false,
    icon_chaos_gate,
    deepPurple["A100"],
    true
  ),
  createData(
    `Anguished Isle`,
    "anguishedisle",
    null,
    true,
    icon_anguished,
    null,
    false
  ),
  createData(
    `Cradle of the Sea Fermata`,
    "cradle",
    null,
    true,
    icon_cradle,
    null,
    false
  ),
];

console.log("taskData:", taskData);

// const defaultDailyList = [
//   {
//     id: 'guildDonation', // id
//     checked: false, // checkbox status
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     roster: false, // once per roster (one checkbox)
//   },
//   {
//     id: 'guildDonation', // id
//     checked: false, // checkbox status
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     roster: false, // once per roster (one checkbox)
//   },
// ];

// const accountDailies = [
//   // createData(`Grand Prix`, "grandprix", null, icon_competitive),
//   createData(
//     `Adventure Island`,
//     "adv",
//     null,
//     icon_adventure_island,
//     "adventure"
//   ),
//   createData(`Field Boss`, "cal", null, icon_field_boss, "guardian"),
//   createData(`Chaos Gate`, "chaosgate", null, icon_chaos_gate, "chaosGate"),
//   createData(`Anguished Isle`, "anguishedisle", null, icon_anguished),
//   createData(`Cradle of the Sea Fermata`, "cradle", null, icon_cradle),
//   createData(`Shower/Sleep`, "sleep"),
// ];

const weeklies = [
  createData(`Una's Task 1`, "una1", null, false, icon_una_weekly, "unaW"),
  createData(`Una's Task 2`, "una2", null, false, icon_una_weekly, "unaW"),
  createData(`Una's Task 3`, "una3", null, false, icon_una_weekly, "unaW"),
  createData(
    `Ghostship`,
    "ghostship1",
    "Account Weekly - once per roster",
    false,
    icon_ghost_ship,
    "ghost"
  ),
  // createData(`Guardian 1`, "guardian1"),
  // createData(`Guardian 2`, "guardian2"),
  // createData(`Guardian 3`, "guardian3"),
  createData(
    `Abyss Raid - Argos`,
    "abyssraidargos",
    null,
    false,
    icon_abyss_raid,
    "abyssR"
  ),
  createData(
    `[1325] Punika 5-1`,
    "abyssdistraughtforest",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[1340] Punika 5-2`,
    "abyssrottingglade",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-1`,
    "abyssoblivionsea",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-2`,
    "abyssperilousabyss",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-3`,
    "abyssunderwatersanctuary",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[840] Yorn 3-1`,
    "abyssroadofsorrow",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[840] Yorn 3-2`,
    "abyssforgottenforge",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[460] Rohendel 2-1`,
    "abysstwistedwarlord",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[460] Rohendel 2-2`,
    "abysshildebrandt",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[340] Vern 1-1`,
    "abyssdemonbeastcanyon",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[340] Vern 1-2`,
    "abyssnecromancer",
    null,
    false,
    icon_abyss_dungeon,
    "abyssD"
  ),
];

const weeklyVendors = [
  createData(`Guild`, "vendorGuild", null, icon_bloodstone),
  createData(`Pirate`, "vendorPirate", null, icon_pirate_coin),
  createData(`Rift Piece`, "vendorRift", null, icon_rift_pieces),
  createData(`Endless Chaos`, "vendorChaos", null, icon_chaos_dungeon),
  createData(`PVP`, "vendorPvp", null, icon_coin_of_courage),
];

const rapportItems = [
  "rapport1",
  "rapport2",
  "rapport3",
  "rapport4",
  "rapport5",
  "rapport6",
];

export default function Checklist(props) {
  const { theme, useStore } = props;

  const resetDailyTasks = useStore((state) => state.resetDailyTasks);
  const resetWeeklyTasks = useStore((state) => state.resetWeeklyTasks);
  const siteSettings = useStore((state) => state.siteSettings);
  const toggleSiteSetting = useStore((state) => state.toggleSiteSetting);
  const taskStatus = useStore((state) => state.taskStatus);
  const rosterStatus = useStore((state) => state.rosterStatus);
  const toggleAccountDaily = useStore((state) => state.toggleAccountDaily);
  const toggleDailyStatus = useStore((state) => state.toggleDailyStatus);
  const toggleWeeklyStatus = useStore((state) => state.toggleWeeklyStatus);
  const toggleWeeklyVendorStatus = useStore(
    (state) => state.toggleWeeklyVendorStatus
  );
  const setRapportName = useStore((state) => state.setRapportName);
  const toggleRapportStatus = useStore((state) => state.toggleRapportStatus);
  const addCharacter = useStore((state) => state.addCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);

  // normal hooks
  const [characterEditMode, toggleCharacterEditMode] = React.useState(false);
  const [dailyEditMode, toggleDailyEditMode] = React.useState(false);
  const [tasks, setTasks] = React.useState(taskData);
  // const [openDailyTasks, setOpenDailyTasks] = React.useState(false);
  // const [openDailyAccount, setOpenDailyAccount] = React.useState(false);
  // const [openWeeklyTasks, setOpenWeeklyTasks] = React.useState(false);
  // const [openWeeklyVendors, setOpenWeeklyVendors] = React.useState(false);

  function handleDailyStatus(taskName, id) {
    const character = _.find(siteSettings.roster, (item) => item.id === id);
    const taskStatus = siteSettings.dailyTaskStatus[id];
    const checks = _.find(
      siteSettings.dailyTaskStatus,
      (item, index) => index === id
    );
    if (
      [
        "chaos1",
        "chaos2",
        "guardian1",
        "guardian2",
        "una1",
        "una2",
        "una3",
      ].includes(taskName)
    ) {
      const taskType = taskName.slice(0, -1); // 'chaos', 'guardian', 'una'
      const checkCount = _.reduce(
        checks,
        (result, value, name) => {
          if (name.slice(0, -1) === taskType && value === true)
            result.push({ [name]: value });
          return result;
        },
        []
      ).length;
      // console.log(checkCount);
      if (taskStatus[taskName] === true) {
        // if its getting turned off, count number of current checkmarks and multiply the less than requirement by it
        // current - temp = 20 * checks
        if (
          character[`rest_${taskType}`] - character[`rest_${taskType}_temp`] ===
          20 * checkCount
        ) {
          character[`rest_${taskType}_temp`] += 20;
        }
        // if rep isn't already maxed out when you uncheck, subtract 10 rep
        if (
          ["una1", "una2", "una3"].includes(taskName) &&
          character[taskName].current !== character[taskName].require
        ) {
          character[taskName].current -= 10;
        }
      } else {
        // if its getting checked

        // console.log(char, checks);
        // check if character has at least 20 rest bonus
        if (
          character[`rest_${taskType}`] >= 20 &&
          character[`rest_${taskType}_temp`] >= 20
        ) {
          character[`rest_${taskType}_temp`] -= 20;
        }
        if (
          ["una1", "una2", "una3"].includes(taskName) &&
          character[taskName].current < character[taskName].require
        ) {
          character[taskName].current += 10;
        }
      }
      updateCharacter(character);
    }
    toggleDailyStatus(taskName, id);
  }

  function handleWeeklyStatus(taskName, id) {
    toggleWeeklyStatus(taskName, id);
  }

  function handleWeeklyVendorStatus(taskName, id) {
    toggleWeeklyVendorStatus(taskName, id);
  }

  function handleAccountDaily(event, id) {
    toggleAccountDaily(id);
  }

  function getChildPayload(index) {
    return tasks[index];
  }

  function onDrop({ removedIndex, addedIndex, payload }) {
    console.log(removedIndex, addedIndex, payload, tasks[removedIndex]);
    // setTasks(
    //   ([tasks[removedIndex], tasks[addedIndex]] = [
    //     tasks[addedIndex],
    //     tasks[removedIndex],
    //   ])
    // );
    // let newTasks = _.reduce(
    //   tasks,
    //   (result, task) => {
    //     if (!["chaos1",
    //     "chaos2",
    //     "guardian1",
    //     "guardian2",
    //     "una1",
    //     "una2",
    //     "una3",].includes(task.id)) {
    //       result.push(task);
    //     }
    //     return result;
    //   },
    //   []
    // );
    // console.log(newTasks);
    let newTasks = _.cloneDeep(tasks);

    // if (["chaos1", "guardian1"].includes(tasks[removedIndex]["id"])) {
    //   console.log("move CG to");
    //   if (removedIndex > addedIndex) {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //     arrayMoveMutable(newTasks, removedIndex + 1, addedIndex + 1);
    //   } else {
    //     if (["una1"].includes(tasks[addedIndex]["id"])) {
    //       console.log("moving c/g under una");
    //       arrayMoveMutable(newTasks, addedIndex, removedIndex);
    //       arrayMoveMutable(newTasks, addedIndex + 1, removedIndex + 1);
    //       arrayMoveMutable(newTasks, addedIndex + 2, removedIndex + 2);
    //     } else if (["chaos1", "guardian1"].includes(tasks[addedIndex]["id"])) {
    //       arrayMoveMutable(newTasks, addedIndex, removedIndex);
    //       arrayMoveMutable(newTasks, addedIndex + 1, removedIndex + 1);
    //     } else {
    //       arrayMoveMutable(newTasks, addedIndex, removedIndex);
    //     }
    //   }
    // } else if (["una1"].includes(tasks[removedIndex]["id"])) {
    //   console.log("move una to");

    //   if (removedIndex > addedIndex) {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //     arrayMoveMutable(newTasks, removedIndex + 1, addedIndex + 1);
    //     arrayMoveMutable(newTasks, removedIndex + 2, addedIndex + 2);
    //   } else {
    //     if (["chaos1", "guardian1"].includes(tasks[addedIndex]["id"])) {
    //       console.log("moving una under chaos or guardian");
    //       arrayMoveMutable(newTasks, addedIndex, removedIndex);
    //       arrayMoveMutable(newTasks, addedIndex + 1, removedIndex + 1);
    //     } else {
    //       console.log("drag una below something else");
    //       arrayMoveMutable(newTasks, addedIndex, removedIndex);
    //     }
    //   }
    // } else if (["chaos1", "guardian1"].includes(tasks[addedIndex]["id"])) {
    //   if (removedIndex > addedIndex) {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //   } else {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //     arrayMoveMutable(newTasks, removedIndex + 1, addedIndex + 1);
    //   }
    // } else if (["una1"].includes(tasks[addedIndex]["id"])) {
    //   if (removedIndex > addedIndex) {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //   } else {
    //     arrayMoveMutable(newTasks, removedIndex, addedIndex);
    //     arrayMoveMutable(newTasks, removedIndex + 1, addedIndex + 1);
    //     arrayMoveMutable(newTasks, removedIndex + 2, addedIndex + 2);
    //   }
    // }
    // // 3, 0
    // // 4, 1
    // // 5, 2
    // else {
    //   arrayMoveMutable(newTasks, removedIndex, addedIndex);
    // }
    arrayMoveMutable(newTasks, removedIndex, addedIndex);
    setTasks(newTasks);
    console.log(newTasks);
  }

  function toggleVisibility(taskName) {
    let newTasks = _.cloneDeep(tasks);
    setTasks(
      newTasks.map((item) =>
        item.id === taskName
          ? {
              ...item,
              isVisible: !item.isVisible,
            }
          : item
      )
    );
  }

  const IconImage = styled.img`
    display: inline-flex;
    width: 24px;
    height: 24px;
  `;

  React.useEffect(() => {
    // console.log("siteSettings:", siteSettings);
  }, [siteSettings]);

  // console.log("rosterStatus:", rosterStatus);

  const CheckBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      top: 10,
      right: 10,
      "& .MuiSvgIcon-root": {
        width: 16,
        height: 16,
        color: theme.palette.una.main,
      },
    },
  }));

  const renderUnaTooltip = (row, charData) => {
    const task = charData[row.id];
    return (
      <React.Fragment>
        <Typography variant="h6">{task.name ? task.name : ""}</Typography>
        {task.location !== "" && (
          <Typography variant="subtitle">{task.location}</Typography>
        )}

        {task.require > 0 && (
          <>
            <LinearProgress
              color="una"
              variant="determinate"
              value={(task.current / task.require) * 100}
            />
            <Typography>
              {task.current} / {task.require}
            </Typography>
          </>
        )}
      </React.Fragment>
    );
  };

  const renderUnaTask = (row, charData) => {
    const task = charData[row.id];
    const hasUnaDesc =
      task.name !== "" ||
      task.location !== "" ||
      task.current > 0 ||
      task.require > 0;
    return hasUnaDesc ? (
      <Tooltip
        title={renderUnaTooltip(row, charData)}
        placement="top"
        followCursor
      >
        <CheckBadge badgeContent={<InfoIcon />}>
          <Checkbox
            checked={siteSettings.dailyTaskStatus[charData.id][row.id]}
            sx={
              row.color && {
                color: row.color,
                "&.Mui-checked": {
                  color: row.color,
                },
              }
            }
            disableRipple
          />
        </CheckBadge>
      </Tooltip>
    ) : (
      <Checkbox
        checked={siteSettings.dailyTaskStatus[charData.id][row.id]}
        sx={
          row.color && {
            color: row.color,
            "&.Mui-checked": {
              color: row.color,
            },
          }
        }
        disableRipple
      />
    );
  };

  const renderTaskRows = (row) => {
    if (row.id === "una1") {
      const unaTasks = [
        row,
        {
          ...row,
          id: "una2",
          name: `Una's Task 2`,
        },
        {
          ...row,
          id: "una3",
          name: `Una's Task 3`,
        },
      ];
      return _.map(unaTasks, (task) => renderTaskRow(task));
    } else if (row.id === "chaos1") {
      const chaosTasks = [
        row,
        {
          ...row,
          id: "chaos2",
          name: `Chaos Dungeon 2`,
        },
      ];
      return _.map(chaosTasks, (task) => renderTaskRow(task));
    } else if (row.id === "guardian1") {
      const guardianTasks = [
        row,
        {
          ...row,
          id: "guardian2",
          name: `Guardian Raid 2`,
        },
      ];
      return _.map(guardianTasks, (task) => renderTaskRow(task));
    } else {
      return renderTaskRow(row);
    }
  };

  const renderTaskRow = (row) => {
    return (
      <TableRow
        hover
        role="checkbox"
        key={row.id}
        sx={!row.isVisible && { display: "none" }}
      >
        <TableCell sx={{ width: "1px" }}>
          {row.info && (
            <Tooltip title={row.info}>
              <IconButton size="small">{row.info && <InfoIcon />}</IconButton>
            </Tooltip>
          )}
          {row.icon && (
            <IconButton size="small">
              <IconImage src={row.icon} alt={row.name} />
            </IconButton>
          )}
        </TableCell>
        <TableCell sx={{ width: "1px" }}>
          <Typography color={row.color ? row.color : "#fff"}>
            {row.name}
          </Typography>
        </TableCell>
        {!row.isRoster ? (
          siteSettings.roster.map((charData) => {
            return (
              <TableCell padding="checkbox" key={`dailies-${charData.id}`}>
                <Button
                  onClick={() => {
                    handleDailyStatus(row.id, charData.id, charData);
                  }}
                  fullWidth
                  variant={"text"}
                >
                  {_.some(
                    ["una1", "una2", "una3"],
                    (item) => item === row.id
                  ) ? (
                    renderUnaTask(row, charData)
                  ) : (
                    <Checkbox
                      checked={
                        siteSettings.dailyTaskStatus[charData.id][row.id]
                      }
                      sx={
                        row.color && {
                          color: row.color,
                          "&.Mui-checked": {
                            color: row.color,
                          },
                        }
                      }
                      disableRipple
                    />
                  )}
                </Button>
              </TableCell>
            );
          })
        ) : (
          <TableCell padding="checkbox" key={`dailies-${row.id}`}>
            <Button
              onClick={() => {
                handleDailyStatus(row.id);
              }}
              fullWidth
              variant={"text"}
            >
              <Checkbox
                checked={false}
                sx={
                  row.color && {
                    color: row.color,
                    "&.Mui-checked": {
                      color: row.color,
                    },
                  }
                }
                disableRipple
              />
            </Button>
          </TableCell>
        )}
        <TableCell />
      </TableRow>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 132px)" }}>
        <Table
          stickyHeader
          size="small"
          sx={{ maxHeight: "calc(100vh - 144px)", tableLayout: "auto" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  width: "1px",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  width: "1px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 2 }}>Characters</Typography>
                  <Tooltip title="Toggle roster edit mode">
                    <IconButton
                      onClick={() => {
                        toggleCharacterEditMode(!characterEditMode);
                      }}
                    >
                      {characterEditMode ? <SaveIcon /> : <SettingsIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              {siteSettings.roster.map((charData) => (
                <TableCell
                  key={`class_${charData.id}`}
                  sx={{ backgroundColor: theme.palette.background.paper }}
                >
                  <CharacterSelect
                    characterEditMode={characterEditMode}
                    charData={charData}
                    useStore={props.useStore}
                    theme={theme}
                  />
                </TableCell>
              ))}
              <TableCell
                sx={{
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                {characterEditMode && (
                  <Tooltip title="Add new character">
                    <Button
                      onClick={() => addCharacter()}
                      variant="text"
                      sx={{ color: "#fff" }}
                      size="large"
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell size="small">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => toggleSiteSetting("dailyTasksOpen")}
                >
                  {siteSettings.dailyTasksOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={siteSettings.roster.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="p" sx={{ padding: 0 }}>
                    Daily Tasks
                  </Typography>
                  <Tooltip title="Toggle task edit mode">
                    <IconButton
                      onClick={() => {
                        toggleDailyEditMode(!dailyEditMode);
                      }}
                      sx={{ m: 2 }}
                    >
                      {dailyEditMode ? <SaveIcon /> : <SettingsIcon />}
                    </IconButton>
                  </Tooltip>
                  <Box>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() =>
                        resetDailyTasks(
                          siteSettings.roster,
                          siteSettings.dailyTaskStatus
                        )
                      }
                    >
                      Reset Daily Tasks
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.dailyTasksOpen && dailyEditMode ? (
              <TableRow>
                <TableCell colSpan={siteSettings.roster.length + 2}>
                  <List>
                    <Container
                      dragHandleSelector=".drag-handle"
                      lockAxis="y"
                      onDrop={onDrop}
                      getChildPayload={getChildPayload}
                    >
                      {tasks.map((row) => {
                        const rename = ["una1", "chaos1", "guardian1"];
                        const staticTasks = [
                          "guildDonation",
                          "una1",
                          "chaos1",
                          "guardian1",
                          "adv",
                          "cal",
                          "chaosgate",
                        ];
                        return (
                          <Draggable key={`drag-item-${row.id}`}>
                            <ListItem dense>
                              <ListItemIcon>
                                <IconButton>
                                  <SwapVertIcon className="drag-handle" />
                                </IconButton>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  staticTasks.includes(row.id) ? (
                                    <Typography>
                                      {rename.includes(row.id)
                                        ? row.name.slice(0, -2)
                                        : row.name}
                                    </Typography>
                                  ) : (
                                    <FormControl
                                      sx={{
                                        m: 0,
                                        mt: 1,
                                        minWidth: 128,
                                        width: "100%",
                                      }}
                                    >
                                      {/* <InputLabel id={`character-${charData.id}-label`}>Class</InputLabel> */}
                                      <TextField
                                        fullWidth
                                        label="Task name"
                                        value={
                                          rename.includes(row.id)
                                            ? row.name.slice(0, -2)
                                            : row.name
                                        }
                                      />
                                    </FormControl>
                                  )
                                }
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexGrow: 0,
                                  mr: 2,
                                  height: 80,
                                  width: 240,
                                }}
                              />
                              <ListItemIcon>
                                <Tooltip title="Show/Hide task">
                                  <IconButton
                                    onClick={() => toggleVisibility(row.id)}
                                    color={
                                      row.isVisible ? "primary" : "secondary"
                                    }
                                  >
                                    {row.isVisible ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </ListItemIcon>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled={staticTasks.includes(row.id)}
                                    checked={row.isRoster}
                                  />
                                }
                                label="Roster-wide"
                              />
                              <ListItemIcon>
                                <Tooltip title="Delete task forever">
                                  <IconButton
                                    color="error"
                                    disabled={staticTasks.includes(row.id)}
                                  >
                                    <DeleteForeverIcon />
                                  </IconButton>
                                </Tooltip>
                              </ListItemIcon>
                            </ListItem>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </List>
                </TableCell>
              </TableRow>
            ) : (
              siteSettings.dailyTasksOpen &&
              tasks.map((row) => {
                // console.log(row);
                return (
                  <React.Fragment key={`daily_component_${row.id}`}>
                    {row.id === "una1" && siteSettings.useRestUna && (
                      <TableRow
                        key={"unas_rested_row"}
                        sx={!row.isVisible && { display: "none" }}
                      >
                        <TableCell>
                          <IconButton size="small">
                            <IconImage src={row.icon} alt={row.name} />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ width: "1px" }}>
                          <Typography color={row.color ? row.color : "#fff"}>
                            Una's Tasks Rest Bonus
                          </Typography>
                        </TableCell>
                        {siteSettings.roster.map((charData) => {
                          // console.log(charData);
                          return (
                            <TableCell key={`restBonus_${charData.id}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    value={charData.rest_una_temp}
                                    color="una"
                                  />
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                    >
                                      {charData.rest_una_temp}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                          );
                        })}
                        <TableCell />
                      </TableRow>
                    )}
                    {row.id === "chaos1" && siteSettings.useRestChaos && (
                      <TableRow key={"chaos_rested_row"}>
                        <TableCell>
                          <IconButton size="small">
                            <IconImage src={row.icon} alt={row.name} />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ width: "1px" }}>
                          <Typography color={row.color ? row.color : "#fff"}>
                            Chaos Rest Bonus
                          </Typography>
                        </TableCell>
                        {siteSettings.roster.map((charData) => {
                          // console.log(charData);
                          return (
                            <TableCell key={`restBonus_${charData.id}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    value={charData.rest_chaos_temp}
                                    color="chaos"
                                  />
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                    >
                                      {charData.rest_chaos_temp}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                          );
                        })}
                        <TableCell />
                      </TableRow>
                    )}
                    {row.id === "guardian1" && siteSettings.useRestGuardian && (
                      <TableRow key={"guardian_rested_row"}>
                        <TableCell>
                          <IconButton size="small">
                            <IconImage src={row.icon} alt={row.name} />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ width: "1px" }}>
                          <Typography color={row.color ? row.color : "#fff"}>
                            Guardian Raid Rest Bonus
                          </Typography>
                        </TableCell>
                        {siteSettings.roster.map((charData) => {
                          return (
                            <TableCell key={`restBonus_${charData.id}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    value={charData.rest_guardian_temp}
                                    color="guardian"
                                  />
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                    >
                                      {charData.rest_guardian_temp}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                          );
                        })}
                        <TableCell />
                      </TableRow>
                    )}
                    {renderTaskRows(row)}
                  </React.Fragment>
                );
              })
            )}
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => toggleSiteSetting("accountDailiesOpen")}
                >
                  {siteSettings.accountDailiesOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell
                colSpan={
                  siteSettings.accountDailiesOpen
                    ? 1
                    : siteSettings.roster.length + 2
                }
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Rapport
                  </Typography>
                </Box>
              </TableCell>
              {siteSettings.accountDailiesOpen && (
                <>
                  <TableCell colSpan={2}>
                    <Typography align="center">Song</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Typography align="center">Emote</Typography>
                  </TableCell>
                  <TableCell colSpan={siteSettings.roster.length - 4} />
                </>
              )}
            </TableRow>
            {siteSettings.accountDailiesOpen &&
              rapportItems.map((row, index) => {
                console.log(row, index);
                const rapportItem = rosterStatus[`rapport${index + 1}`];
                return (
                  <TableRow hover role="checkbox" key={row}>
                    <TableCell>
                      <IconButton size="small">
                        <IconImage src={icon_rapport} />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ minWidth: 200, width: "1px" }}>
                      <Box>
                        <TextField
                          id={`rapport${index + 1}_name`}
                          label="NPC"
                          defaultValue={rapportItem.name}
                          type="string"
                          margin="normal"
                          onBlur={(e) => {
                            setRapportName(
                              `rapport${index + 1}`,
                              e.target.value
                            );
                          }}
                        />
                      </Box>
                    </TableCell>
                    {["song1", "song2", "emote1", "emote2"].map((item) => (
                      <TableCell
                        padding="checkbox"
                        key={`rapport${index + 1}_${item}`}
                        colSpan={1}
                      >
                        <Button
                          onClick={() =>
                            toggleRapportStatus(`rapport${index + 1}`, item)
                          }
                          fullWidth
                          variant={"text"}
                        >
                          <Checkbox
                            color="primary"
                            checked={rapportItem[item]}
                            sx={{
                              color: theme.palette["rapport"]["main"],
                              "&.Mui-checked": {
                                color: theme.palette["rapport"]["main"],
                              },
                            }}
                            disableRipple
                          />
                        </Button>
                      </TableCell>
                    ))}
                    <TableCell colSpan={siteSettings.roster.length - 5} />
                  </TableRow>
                );
              })}
            {/* {siteSettings.accountDailiesOpen &&
              accountDailies.map((row, index) => {
                const rapportItem = rosterStatus[`rapport${index + 1}`];
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    <TableCell>
                      {row.info && (
                        <Tooltip title={row.info}>
                          <IconButton size="small">
                            {row.info && <InfoIcon />}
                          </IconButton>
                        </Tooltip>
                      )}
                      {row.icon && (
                        <IconButton size="small">
                          <IconImage src={row.icon} alt={row.name} />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={row.color && row.color}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      key={`${row.id}`}
                      colSpan={rapportItem ? 1 : siteSettings.roster.length}
                    >
                      <Button
                        onClick={(event) => {
                          handleAccountDaily(event, row.id);
                        }}
                        fullWidth
                        variant={"text"}
                      >
                        <Checkbox
                          color="primary"
                          checked={rosterStatus[row.id]}
                          sx={
                            row.color && {
                              color: row.color,
                              "&.Mui-checked": {
                                color: row.color,
                              },
                            }
                          }
                          disableRipple
                        />
                      </Button>
                    </TableCell>
                    {rapportItem && (
                      <>
                        <TableCell sx={{ minWidth: 200, width: "1px" }}>
                          <Box>
                            <TextField
                              id={`rapport${index + 1}_name`}
                              label="NPC"
                              defaultValue={rapportItem.name}
                              type="string"
                              margin="normal"
                              onBlur={(e) => {
                                setRapportName(
                                  `rapport${index + 1}`,
                                  e.target.value
                                );
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconImage src={icon_rapport} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        </TableCell>
                        {["song1", "song2", "emote1", "emote2"].map((item) => (
                          <TableCell
                            padding="checkbox"
                            key={`rapport${index + 1}_${item}`}
                            colSpan={1}
                          >
                            <Button
                              onClick={() =>
                                toggleRapportStatus(`rapport${index + 1}`, item)
                              }
                              fullWidth
                              variant={"text"}
                            >
                              <Checkbox
                                color="primary"
                                checked={rapportItem[item]}
                                sx={{
                                  color: theme.palette["rapport"]["main"],
                                  "&.Mui-checked": {
                                    color: theme.palette["rapport"]["main"],
                                  },
                                }}
                                disableRipple
                              />
                            </Button>
                          </TableCell>
                        ))}
                        <TableCell colSpan={siteSettings.roster.length - 5} />
                      </>
                    )}
                  </TableRow>
                );
              })} */}
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => toggleSiteSetting("weeklyTasksOpen")}
                >
                  {siteSettings.weeklyTasksOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={siteSettings.roster.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Weekly Tasks
                  </Typography>
                  <Box>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => resetWeeklyTasks()}
                    >
                      Reset Weekly Tasks
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.weeklyTasksOpen &&
              weeklies.map((row) => (
                <TableRow hover role="checkbox" key={row.id}>
                  <TableCell>
                    {row.icon && (
                      <IconButton size="small">
                        <IconImage src={row.icon} alt={row.name} />
                      </IconButton>
                    )}
                    {row.info && (
                      <Tooltip title={row.info}>
                        <IconButton size="small">
                          {row.info && <InfoIcon />}
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography color={row.color ? row.color : "#fff"}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  {siteSettings.roster.map((char) => {
                    const charData = _.find(
                      taskStatus,
                      (character) => _.toString(character.id) === char.id
                    );
                    return (
                      <TableCell
                        padding="checkbox"
                        key={`weeklies-${charData.id}`}
                      >
                        <Button
                          onClick={() =>
                            handleWeeklyStatus(row.id, charData.id)
                          }
                          fullWidth
                          variant={"text"}
                        >
                          <Checkbox
                            color="primary"
                            checked={charData.weeklies[row.id]}
                            sx={
                              row.color && {
                                color: row.color,
                                "&.Mui-checked": {
                                  color: row.color,
                                },
                              }
                            }
                            disableRipple
                          />
                        </Button>
                      </TableCell>
                    );
                  })}
                  <TableCell />
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => toggleSiteSetting("weeklyVendorsOpen")}
                >
                  {siteSettings.weeklyVendorsOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={siteSettings.roster.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Weekly Vendors
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.weeklyVendorsOpen &&
              weeklyVendors.map((row) => (
                <TableRow hover role="checkbox" key={row.id}>
                  <TableCell>
                    {row.info && (
                      <Tooltip title={row.info}>
                        <IconButton size="small">
                          {row.info && <InfoIcon />}
                        </IconButton>
                      </Tooltip>
                    )}
                    {row.icon && (
                      <IconButton size="small">
                        <IconImage src={row.icon} alt={row.name} />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography color={row.color ? row.color : "#fff"}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  {siteSettings.roster.map((char) => {
                    const charData = _.find(
                      taskStatus,
                      (character) => _.toString(character.id) === char.id
                    );
                    return (
                      <TableCell
                        padding="checkbox"
                        key={`weeklyVendors-${charData.id}`}
                      >
                        <Button
                          onClick={(event) =>
                            handleWeeklyVendorStatus(row.id, charData.id)
                          }
                          fullWidth
                          variant={"text"}
                        >
                          <Checkbox
                            color="primary"
                            checked={charData.weeklyVendors[row.id]}
                            disableRipple
                            sx={
                              row.color && {
                                color: row.color,
                                "&.Mui-checked": {
                                  color: row.color,
                                },
                              }
                            }
                          />
                        </Button>
                      </TableCell>
                    );
                  })}
                  <TableCell />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

function CharacterNameRow(props) {
  const useStore = props.useStore;

  const siteSettings = useStore((state) => state.siteSettings);
  const taskStatus = useStore((state) => state.taskStatus);
  const updateName = useStore((state) => state.updateName);

  function handleChangeName(event, id) {
    const name = event.target.value;
    updateName(id, name);
  }

  return (
    <TableRow hover key={"characterName"}>
      <TableCell>
        <Typography>Name (Optional)</Typography>
      </TableCell>
      {siteSettings.roster.map((charData) => (
        <TableCell size="medium" key={`${charData.name}-${charData.id}-name`}>
          <TextField
            id={`characterName-${charData.id}`}
            value={charData.name}
            onChange={(event) => handleChangeName(event, charData.id)}
            variant="standard"
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
