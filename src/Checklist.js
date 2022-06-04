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
import icon_chaos_dungeon from "./img/icon_chaos_dungeon.png";
import icon_grandprix from "./img/events/grandprix.webp";
import icon_rapport from "./img/icon_rapport.png";
import icon_bloodstone from "./img/icon_bloodstone.png";
import icon_pirate_coin from "./img/icon_pirate_coin.png";
import icon_rift_pieces from "./img/icon_rift_pieces.png";
import icon_coin_of_courage from "./img/icon_coin_of_courage.png";
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

const weeklyVendors = [
  createData(`Wild Wing Event`, "vendorWildWing", null, false, icon_grandprix),
  createData(`Guild`, "vendorGuild", null, false, icon_bloodstone),
  createData(`Pirate`, "vendorPirate", null, false, icon_pirate_coin),
  createData(`Rift Piece`, "vendorRift", null, false, icon_rift_pieces),
  createData(`Endless Chaos`, "vendorChaos", null, false, icon_chaos_dungeon),
  createData(`PVP`, "vendorPvp", null, false, icon_coin_of_courage),
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
  const toggleRosterStatus = useStore((state) => state.toggleRosterStatus);
  const createRosterStatus = useStore((state) => state.createRosterStatus);
  const toggleWeeklyStatus = useStore((state) => state.toggleWeeklyStatus);
  const toggleWeeklyVendorStatus = useStore(
    (state) => state.toggleWeeklyVendorStatus
  );
  const setRapportName = useStore((state) => state.setRapportName);
  const toggleRapportStatus = useStore((state) => state.toggleRapportStatus);
  const addCharacter = useStore((state) => state.addCharacter);
  const updateCharacter = useStore((state) => state.updateCharacter);
  const addDailyTask = useStore((state) => state.addDailyTask);
  const setDailyTasks = useStore((state) => state.setDailyTasks);
  const addWeeklyTask = useStore((state) => state.addWeeklyTask);
  const setWeeklyTasks = useStore((state) => state.setWeeklyTasks);
  const deleteTask = useStore((state) => state.deleteTask);

  // normal hooks
  const [characterEditMode, toggleCharacterEditMode] = React.useState(false);
  const [dailyEditMode, toggleDailyEditMode] = React.useState(false);
  const [weeklyEditMode, toggleWeeklyEditMode] = React.useState(false);
  const [rapportEditMode, toggleRapportEditMode] = React.useState(false);
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

  function handleRosterStatus(taskId) {
    toggleRosterStatus(taskId);
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
    return siteSettings.taskSettings.daily[index];
  }

  function onDrop({ removedIndex, addedIndex, payload }) {
    arrayMoveMutable(siteSettings.taskSettings.daily, removedIndex, addedIndex);
    setDailyTasks(siteSettings.taskSettings.daily);
  }

  function onWeeklyDrop({ removedIndex, addedIndex, payload }) {
    arrayMoveMutable(
      siteSettings.taskSettings.weekly,
      removedIndex,
      addedIndex
    );
    setWeeklyTasks(siteSettings.taskSettings.weekly);
  }

  function toggleVisibility(taskName) {
    setDailyTasks(
      siteSettings.taskSettings.daily.map((item) =>
        item.id === taskName
          ? {
              ...item,
              isVisible: !item.isVisible,
            }
          : item
      )
    );
  }

  function toggleWeeklyVisibility(taskName) {
    setWeeklyTasks(
      siteSettings.taskSettings.weekly.map((item) =>
        item.id === taskName
          ? {
              ...item,
              isVisible: !item.isVisible,
            }
          : item
      )
    );
  }

  function changeTaskName(id, value) {
    setDailyTasks(
      siteSettings.taskSettings.daily.map((item) =>
        item.id === id
          ? {
              ...item,
              name: value,
            }
          : item
      )
    );
  }

  function changeWeeklyTaskName(id, value) {
    setWeeklyTasks(
      siteSettings.taskSettings.weekly.map((item) =>
        item.id === id
          ? {
              ...item,
              name: value,
            }
          : item
      )
    );
  }

  function toggleTaskRoster(taskName) {
    // toggle task from character to account-wide
    setDailyTasks(
      siteSettings.taskSettings.daily.map((item) =>
        item.id === taskName
          ? {
              ...item,
              isRoster: !item.isRoster,
            }
          : item
      )
    );
    if (!Object.hasOwn(siteSettings.rosterTaskStatus, taskName)) {
      createRosterStatus(taskName);
    }
  }

  function toggleWeeklyTaskRoster(taskName) {
    // toggle task from character to account-wide
    setWeeklyTasks(
      siteSettings.taskSettings.weekly.map((item) =>
        item.id === taskName
          ? {
              ...item,
              isRoster: !item.isRoster,
            }
          : item
      )
    );
    if (!Object.hasOwn(siteSettings.rosterTaskStatus, taskName)) {
      createRosterStatus(taskName);
    }
  }

  const IconImage = styled.img`
    display: inline-flex;
    width: 24px;
    height: 24px;
  `;

  // for testing
  // React.useEffect(() => {
  //   console.log("siteSettings:", siteSettings);
  // }, [siteSettings]);

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

  const renderTaskRows = (row, type = "daily") => {
    if (type === "daily") {
      switch (row.id) {
        case "una1":
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
        case "chaos1":
          const chaosTasks = [
            row,
            {
              ...row,
              id: "chaos2",
              name: `Chaos Dungeon 2`,
            },
          ];
          return _.map(chaosTasks, (task) => renderTaskRow(task));
        case "guardian1":
          const guardianTasks = [
            row,
            {
              ...row,
              id: "guardian2",
              name: `Guardian Raid 2`,
            },
          ];
          return _.map(guardianTasks, (task) => renderTaskRow(task));
        default:
          return renderTaskRow(row);
      }
    }
    if (type === "weekly") {
      switch (row.id) {
        case "una1":
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
          return _.map(unaTasks, (task) => renderTaskRow(task, "weekly"));
        case "guardian1":
          const guardianChallengeTasks = [
            row,
            { ...row, id: "guardian2", name: `Guardian Challenge 2` },
            {
              ...row,
              id: "guardian3",
              name: `Guardian Challenge 3`,
            },
          ];
          return _.map(guardianChallengeTasks, (task) =>
            renderTaskRow(task, "weekly")
          );
        default:
          return renderTaskRow(row, "weekly");
      }
    }
  };

  const renderTaskRow = (row, type = "daily") => {
    return (
      <TableRow
        hover
        role="checkbox"
        key={row.id}
        style={{ display: !row.isVisible ? "none" : "table-row" }}
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
              <TableCell padding="checkbox" key={`${type}-${charData.id}`}>
                <Button
                  onClick={() => {
                    if (type === "weekly") {
                      handleWeeklyStatus(row.id, charData.id, charData);
                    } else {
                      handleDailyStatus(row.id, charData.id, charData);
                    }
                  }}
                  fullWidth
                  variant={"text"}
                >
                  {type === "daily" &&
                  _.some(
                    ["una1", "una2", "una3"],
                    (item) => item === row.id
                  ) ? (
                    renderUnaTask(row, charData)
                  ) : (
                    <Checkbox
                      checked={
                        siteSettings[`${type}TaskStatus`][charData.id][row.id]
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
          // isRoster Task
          <TableCell padding="checkbox" key={`${type}-${row.id}`}>
            <Button
              onClick={() => {
                handleRosterStatus(row.id);
              }}
              fullWidth
              variant={"text"}
            >
              <Checkbox
                checked={siteSettings.rosterTaskStatus[row.id]}
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
        <TableCell colSpan={siteSettings.roster.length} />
      </TableRow>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 142px)" }}>
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
                  {/* {!dailyEditMode && !weeklyEditMode && (
                    <Tooltip title="Toggle roster edit mode">
                      <IconButton
                        onClick={() => {
                          toggleCharacterEditMode(!characterEditMode);
                        }}
                      >
                        {characterEditMode ? <SaveIcon /> : <SettingsIcon />}
                      </IconButton>
                    </Tooltip>
                  )} */}
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
                  {!characterEditMode && (
                    <>
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
                      {!dailyEditMode && (
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
                      )}
                    </>
                  )}
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
                      {siteSettings.taskSettings.daily.map((row) => {
                        const rename = ["una1", "chaos1", "guardian1"];
                        const staticTasks = [
                          "guildDonation",
                          "una1",
                          "chaos1",
                          "guardian1",
                          "kalthertz",
                          "eventguardian",
                          "anguishedisle",
                          "cradle",
                          "festivalssuccess",
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
                                        defaultValue={
                                          rename.includes(row.id)
                                            ? row.name.slice(0, -2)
                                            : row.name
                                        }
                                        onBlur={(event) => {
                                          changeTaskName(
                                            row.id,
                                            event.target.value
                                          );
                                        }}
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
                                onClick={() => {
                                  if (!staticTasks.includes(row.id)) {
                                    toggleTaskRoster(row.id);
                                  }
                                }}
                              />
                              <ListItemIcon>
                                {staticTasks.includes(row.id) ? (
                                  <IconButton color="error" disabled>
                                    <DeleteForeverIcon />
                                  </IconButton>
                                ) : (
                                  <Tooltip title="Delete task forever">
                                    <IconButton
                                      color="error"
                                      onClick={() => deleteTask(row.id)}
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </ListItemIcon>
                            </ListItem>
                          </Draggable>
                        );
                      })}
                    </Container>
                    <ListItem dense>
                      <ListItemIcon>
                        <Tooltip title="Add new task">
                          <IconButton onClick={() => addDailyTask()}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    </ListItem>
                  </List>
                </TableCell>
              </TableRow>
            ) : (
              siteSettings.dailyTasksOpen &&
              siteSettings.taskSettings.daily.map((row) => {
                // console.log(row);
                return (
                  <React.Fragment key={`daily_component_${row.id}`}>
                    {row.id === "una1" && siteSettings.useRestUna && (
                      <TableRow
                        key={"unas_rested_row"}
                        style={{
                          display: !row.isVisible ? "none" : "table-row",
                        }}
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
                    {row.id === "chaos1" &&
                      siteSettings.useRestChaos &&
                      row.isVisible && (
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
                    {row.id === "guardian1" &&
                      row.isVisible &&
                      siteSettings.useRestGuardian && (
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
                    {renderTaskRows(row, "daily")}
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
                  {!characterEditMode && (
                    <>
                      <Tooltip title="Toggle rapport edit mode">
                        <IconButton
                          onClick={() => {
                            toggleRapportEditMode(!rapportEditMode);
                          }}
                          sx={{ m: 2 }}
                        >
                          {rapportEditMode ? <SaveIcon /> : <SettingsIcon />}
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
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
                  <TableCell colSpan={siteSettings.roster.length - 3} />
                </>
              )}
            </TableRow>
            {siteSettings.accountDailiesOpen &&
              rapportItems.map((row, index) => {
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
                        {rapportEditMode ? (
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
                        ) : (
                          <Typography>{rapportItem.name}</Typography>
                        )}
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
                    <TableCell colSpan={siteSettings.roster.length - 3} />
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
                  {!characterEditMode && (
                    <>
                      <Tooltip title="Toggle task edit mode">
                        <IconButton
                          onClick={() => {
                            toggleWeeklyEditMode(!weeklyEditMode);
                          }}
                          sx={{ m: 2 }}
                        >
                          {weeklyEditMode ? <SaveIcon /> : <SettingsIcon />}
                        </IconButton>
                      </Tooltip>
                      {!weeklyEditMode && (
                        <Box>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => resetWeeklyTasks()}
                          >
                            Reset Weekly Tasks
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
            {siteSettings.weeklyTasksOpen && weeklyEditMode ? (
              <TableRow>
                <TableCell colSpan={siteSettings.roster.length + 2}>
                  <List>
                    <Container
                      dragHandleSelector=".drag-handle"
                      lockAxis="y"
                      onDrop={onWeeklyDrop}
                      getChildPayload={getChildPayload}
                    >
                      {siteSettings.taskSettings.weekly.map((row) => {
                        const rename = ["una1", "guardian1"];
                        const staticTasks = [
                          "una1",
                          // "una2",
                          // "una3",
                          "guardian1",
                          "ghostship1",
                          "gvg",
                          "legionraidvaltan",
                          "abyssraidargos",
                          "challengeabyssdungeon",
                          "abyssdistraughtforest",
                          "abyssrottingglade",
                          "abyssoblivionsea",
                          "abyssperilousabyss",
                          "abyssunderwatersanctuary",
                          "abyssroadofsorrow",
                          "abyssforgottenforge",
                          "abysstwistedwarlord",
                          "abysshildebrandt",
                          "abyssdemonbeastcanyon",
                          "abyssnecromancer",
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
                                    <Typography>{row.name}</Typography>
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
                                        defaultValue={
                                          rename.includes(row.id)
                                            ? row.name.slice(0, -2)
                                            : row.name
                                        }
                                        onChange={(event) => {
                                          changeWeeklyTaskName(
                                            row.id,
                                            event.target.value
                                          );
                                        }}
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
                                    onClick={() =>
                                      toggleWeeklyVisibility(row.id)
                                    }
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
                                onClick={() => {
                                  if (!staticTasks.includes(row.id)) {
                                    toggleWeeklyTaskRoster(row.id);
                                  }
                                }}
                              />
                              <ListItemIcon>
                                {staticTasks.includes(row.id) ? (
                                  <IconButton color="error" disabled>
                                    <DeleteForeverIcon />
                                  </IconButton>
                                ) : (
                                  <Tooltip title="Delete task forever">
                                    <IconButton
                                      color="error"
                                      onClick={() => deleteTask(row.id)}
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </ListItemIcon>
                            </ListItem>
                          </Draggable>
                        );
                      })}
                    </Container>
                    <ListItem dense>
                      <ListItemIcon>
                        <Tooltip title="Add new task">
                          <IconButton onClick={() => addWeeklyTask()}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    </ListItem>
                  </List>
                </TableCell>
              </TableRow>
            ) : (
              siteSettings.weeklyTasksOpen &&
              siteSettings.taskSettings.weekly.map((row) => {
                return (
                  <React.Fragment key={`weekly_component_${row.id}`}>
                    {renderTaskRows(row, "weekly")}
                  </React.Fragment>
                );
              })
            )}
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
