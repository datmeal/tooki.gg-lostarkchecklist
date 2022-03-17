import * as React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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

function createData(name, id, info, icon, color) {
  return { name, id, info, icon, color };
}

// const dailies = {
//   name: `Una's Task 1`,
//   id: 'una1',
//   info: 'Tooltip information',
//   icon: 'icon_una_daily.png'
// }

const dailies = [
  createData(`Guild Donation`, "guildDonation", null, icon_guild),
  createData(`Una's Task 1`, "una1", null, icon_una_daily, "una"),
  createData(`Una's Task 2`, "una2", null, icon_una_daily, "una"),
  createData(`Una's Task 3`, "una3", null, icon_una_daily, "una"),
  createData(`Chaos Dungeon 1`, "chaos1", null, icon_chaos_dungeon, "chaos"),
  createData(`Chaos Dungeon 2`, "chaos2", null, icon_chaos_dungeon, "chaos"),
  createData(`Guardian Raid 1`, "guardian1", null, icon_guardian, "guardian"),
  createData(`Guardian Raid 2`, "guardian2", null, icon_guardian, "guardian"),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task"
  ),
];

const accountDailies = [
  createData(`Grand Prix`, "grandprix", null, icon_grandprix),
  createData(
    `Adventure Island`,
    "adv",
    null,
    icon_adventure_island,
    "adventure"
  ),
  createData(`Field Boss`, "cal", null, icon_field_boss, "boss"),
  createData(`Chaos Gate`, "chaosgate", null, icon_chaos_gate, "chaosGate"),
  createData(`Anguished Isle`, "anguishedisle"),
  createData(`Rapport Song 1`, "rapportsong1", null, icon_rapport, "rapport"),
  createData(`Rapport Song 2`, "rapportsong2", null, icon_rapport, "rapport"),
  createData(`Rapport Song 3`, "rapportsong3", null, icon_rapport, "rapport"),
  createData(`Rapport Song 4`, "rapportsong4", null, icon_rapport, "rapport"),
  createData(`Rapport Song 5`, "rapportsong5", null, icon_rapport, "rapport"),
  createData(`Rapport Song 6`, "rapportsong6", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 1`, "rapportemote1", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 2`, "rapportemote2", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 3`, "rapportemote3", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 4`, "rapportemote4", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 5`, "rapportemote5", null, icon_rapport, "rapport"),
  createData(`Rapport Emote 6`, "rapportemote6", null, icon_rapport, "rapport"),
];

const weeklies = [
  createData(`Una's Task 1`, "una1", null, icon_una_weekly, "unaW"),
  createData(`Una's Task 2`, "una2", null, icon_una_weekly, "unaW"),
  createData(`Una's Task 3`, "una3", null, icon_una_weekly, "unaW"),
  createData(
    `Ghostship`,
    "ghostship1",
    "Starts Tuesday 11AM, Thursday 11AM, Saturday 11AM and occurs once per hour until reset",
    icon_ghost_ship,
    "ghost"
  ),
  // createData(`Guardian 1`, "guardian1"),
  // createData(`Guardian 2`, "guardian2"),
  // createData(`Guardian 3`, "guardian3"),
  createData(
    `[340] Vern 1-1`,
    "abyssdemonbeastcanyon",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[340] Vern 1-2`,
    "abyssnecromancer",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[460] Rohendel 2-1`,
    "abysstwistedwarlord",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[460] Rohendel 2-2`,
    "abysshildebrandt",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[840] Yorn 3-1`,
    "abyssroadofsorrow",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[840] Yorn 3-2`,
    "abyssforgottenforge",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-1`,
    "abyssoblivionsea",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-2`,
    "abyssperilousabyss",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[960] Feiton 4-3`,
    "abyssunderwatersanctuary",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[1325] Punika 5-1`,
    "abyssdistraughtforest",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `[1340] Punika 5-2`,
    "abyssrottingglade",
    null,
    icon_abyss_dungeon,
    "abyssD"
  ),
  createData(
    `Abyss Raid - Argos`,
    "abyssraidargos",
    null,
    icon_abyss_raid,
    "abyssR"
  ),
];

const weeklyVendors = [
  createData(`Guild`, "vendorGuild"),
  createData(`Pirate`, "vendorPirate"),
  createData(`Rift Piece`, "vendorRift"),
  createData(`Endless Chaos`, "vendorChaos"),
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

  // normal hooks
  // const [openDailyTasks, setOpenDailyTasks] = React.useState(false);
  const [openDailyAccount, setOpenDailyAccount] = React.useState(false);
  const [openWeeklyTasks, setOpenWeeklyTasks] = React.useState(false);
  const [openWeeklyVendors, setOpenWeeklyVendors] = React.useState(false);

  function handleDailyStatus(taskName, id) {
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

  const IconImage = styled.img`
    display: inline-flex;
    width: 24px;
    height: 24px;
  `;

  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" variant="h4" align="center">
        Lost Ark Dailies/Weeklies Checklist
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                {/* <Checkbox /> */}
                Characters
              </TableCell>
              {taskStatus.map((charData) => (
                <TableCell key={`class-${charData.id}`}>
                  <CharacterSelect
                    charData={charData}
                    useStore={props.useStore}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <CharacterNameRow useStore={props.useStore} /> */}
            <TableRow>
              <TableCell>
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
              <TableCell colSpan={taskStatus.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Daily Tasks
                  </Typography>
                  <Box>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => resetDailyTasks()}
                    >
                      Reset Daily Tasks
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.dailyTasksOpen &&
              dailies.map((row) => (
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
                      color={row.color && theme.palette[row.color]["main"]}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  {taskStatus.map((charData) => (
                    <TableCell
                      padding="checkbox"
                      key={`dailies-${charData.id}`}
                    >
                      <Checkbox
                        // color={row.color ? row.color : "primary"}
                        onChange={() => handleDailyStatus(row.id, charData.id)}
                        checked={taskStatus[charData.id].dailies[row.id]}
                        sx={
                          row.color && {
                            color: theme.palette[row.color]["main"],
                            "&.Mui-checked": {
                              color: theme.palette[row.color]["main"],
                            },
                          }
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
              <TableCell colSpan={taskStatus.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Account Dailies
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.accountDailiesOpen &&
              accountDailies.map((row) => (
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
                      color={row.color && theme.palette[row.color]["main"]}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    key={`${row.id}`}
                    colSpan={taskStatus.length}
                  >
                    <Checkbox
                      color="primary"
                      onChange={(event) => handleAccountDaily(event, row.id)}
                      checked={rosterStatus[row.id]}
                      sx={
                        row.color && {
                          color: theme.palette[row.color]["main"],
                          "&.Mui-checked": {
                            color: theme.palette[row.color]["main"],
                          },
                        }
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
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
              <TableCell colSpan={taskStatus.length + 2}>
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
                    <Typography
                      color={row.color && theme.palette[row.color]["main"]}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  {taskStatus.map((charData) => (
                    <TableCell
                      padding="checkbox"
                      key={`weeklies-${charData.id}`}
                    >
                      <Checkbox
                        color="primary"
                        onChange={() => handleWeeklyStatus(row.id, charData.id)}
                        checked={taskStatus[charData.id].weeklies[row.id]}
                        sx={
                          row.color && {
                            color: theme.palette[row.color]["main"],
                            "&.Mui-checked": {
                              color: theme.palette[row.color]["main"],
                            },
                          }
                        }
                      />
                    </TableCell>
                  ))}
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
              <TableCell colSpan={taskStatus.length + 2}>
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
                  <TableCell />
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  {taskStatus.map((charData) => (
                    <TableCell
                      padding="checkbox"
                      key={`weeklyVendors-${charData.id}`}
                    >
                      <Checkbox
                        color="primary"
                        onChange={(event) =>
                          handleWeeklyVendorStatus(row.id, charData.id)
                        }
                        checked={taskStatus[charData.id].weeklyVendors[row.id]}
                      />
                    </TableCell>
                  ))}
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
      {taskStatus.map((charData) => (
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
