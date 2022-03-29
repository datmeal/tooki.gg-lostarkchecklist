import * as React from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SettingsIcon from "@mui/icons-material/Settings";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

function createData(name, id, info, icon, color, isRoster, minilvl, maxilvl) {
  return { name, id, info, icon, color, isRoster, minilvl, maxilvl };
}

// const dailies = {
//     id: 'guildDonation', // id
//     checked: false, // checkbox status
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     roster: false, // once per roster (one checkbox)
// }

const dailies = [
  createData(`Guild Donation`, "guildDonation", null, icon_guild),
  // createData(`Guild Mission`, "guildMission", null, icon_guild),
  createData(`Una's Task 1`, "una1", null, icon_una_daily, "una"),
  createData(`Una's Task 2`, "una2", null, icon_una_daily, "una"),
  createData(`Una's Task 3`, "una3", null, icon_una_daily, "una"),
  createData(`Chaos Dungeon 1`, "chaos1", null, icon_chaos_dungeon, "chaos"),
  createData(`Chaos Dungeon 2`, "chaos2", null, icon_chaos_dungeon, "chaos"),
  createData(`Guardian Raid 1`, "guardian1", null, icon_guardian, "guardian"),
  createData(`Guardian Raid 2`, "guardian2", null, icon_guardian, "guardian"),
  createData(
    `Event Guardian`,
    "eventguardian",
    null,
    icon_guardian,
    "guardian"
  ),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task"
  ),
];

// const dailies = {
//     id: 'guildDonation', // id
//     icon: icon_guild, // icon image
//     info: null, // info tooltip on left
//     name: 'Guild Donation', // display text
//     isRoster: false, // once per roster (one checkbox)
//     minilvl: null,
//     maxilvl: null,
// }

const newDailies = [
  createData(`Guild Donation`, "guildDonation", null, icon_guild),
  // createData(`Guild Mission`, "guildMission", null, icon_guild),
  createData(`Una's Task 1`, "una1", null, icon_una_daily, "una"),
  createData(`Una's Task 2`, "una2", null, icon_una_daily, "una"),
  createData(`Una's Task 3`, "una3", null, icon_una_daily, "una"),
  createData(`Chaos Dungeon 1`, "chaos1", null, icon_chaos_dungeon, "chaos"),
  createData(`Chaos Dungeon 2`, "chaos2", null, icon_chaos_dungeon, "chaos"),
  createData(`Guardian Raid 1`, "guardian1", null, icon_guardian, "guardian"),
  createData(`Guardian Raid 2`, "guardian2", null, icon_guardian, "guardian"),
  createData(
    `Event Guardian`,
    "eventguardian",
    null,
    icon_guardian,
    "guardian"
  ),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task"
  ),

  createData(`Grand Prix`, "grandprix", null, icon_competitive, null, true),
  createData(
    `Adventure Island`,
    "adv",
    null,
    icon_adventure_island,
    "adventure",
    true
  ),
  createData(`Field Boss`, "cal", null, icon_field_boss, "guardian", true),
  createData(
    `Chaos Gate`,
    "chaosgate",
    null,
    icon_chaos_gate,
    "chaosGate",
    true
  ),
  createData(
    `Anguished Isle`,
    "anguishedisle",
    null,
    icon_anguished,
    null,
    true
  ),
  createData(
    `Cradle of the Sea Fermata`,
    "cradle",
    null,
    icon_cradle,
    null,
    true
  ),
];

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

const accountDailies = [
  createData(`Grand Prix`, "grandprix", null, icon_competitive),
  createData(
    `Adventure Island`,
    "adv",
    null,
    icon_adventure_island,
    "adventure"
  ),
  createData(`Field Boss`, "cal", null, icon_field_boss, "guardian"),
  createData(`Chaos Gate`, "chaosgate", null, icon_chaos_gate, "chaosGate"),
  createData(`Anguished Isle`, "anguishedisle", null, icon_anguished),
  createData(`Cradle of the Sea Fermata`, "cradle"),
];

const weeklies = [
  createData(`Una's Task 1`, "una1", null, icon_una_weekly, "unaW"),
  createData(`Una's Task 2`, "una2", null, icon_una_weekly, "unaW"),
  createData(`Una's Task 3`, "una3", null, icon_una_weekly, "unaW"),
  createData(
    `Ghostship`,
    "ghostship1",
    "Account Weekly - once per roster",
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
  createData(`Guild`, "vendorGuild", null, icon_bloodstone),
  createData(`Pirate`, "vendorPirate", null, icon_pirate_coin),
  createData(`Rift Piece`, "vendorRift", null, icon_rift_pieces),
  createData(`Endless Chaos`, "vendorChaos", null, icon_chaos_dungeon),
  createData(`PVP`, "vendorPvp", null, icon_coin_of_courage),
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

  // normal hooks
  const [characterEditMode, toggleCharacterEditMode] = React.useState(false);
  // const [openDailyTasks, setOpenDailyTasks] = React.useState(false);
  // const [openDailyAccount, setOpenDailyAccount] = React.useState(false);
  // const [openWeeklyTasks, setOpenWeeklyTasks] = React.useState(false);
  // const [openWeeklyVendors, setOpenWeeklyVendors] = React.useState(false);

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

  React.useEffect(() => {
    console.log("siteSettings:", siteSettings);
  }, []);

  // console.log("rosterStatus:", rosterStatus);

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
                      <SettingsIcon />
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
              dailies.map((row) => {
                // console.log(row);
                return (
                  <>
                    {row.id === "una1" && (
                      <TableRow key={"boobboobeeboo"}>
                        <TableCell>
                          <IconButton size="small">
                            <IconImage src={row.icon} alt={row.name} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                    {row.id === "chaos1" && (
                      <TableRow key={"boobboobeechaos"}>
                        <TableCell>
                          <IconButton size="small">
                            <IconImage src={row.icon} alt={row.name} />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ width: "1px" }}>
                          <Typography
                            color={
                              row.color && theme.palette[row.color]["main"]
                            }
                          >
                            Chaos Rest Bonus
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
                                    value={20}
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
                                      20
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                    <TableRow hover role="checkbox" key={row.id}>
                      <TableCell sx={{ width: "1px" }}>
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
                      <TableCell sx={{ width: "1px" }}>
                        <Typography
                          color={row.color && theme.palette[row.color]["main"]}
                        >
                          {row.name}
                        </Typography>
                      </TableCell>
                      {!row.isRoster ? (
                        siteSettings.roster.map((charData) => (
                          <TableCell
                            padding="checkbox"
                            key={`dailies-${charData.id}`}
                          >
                            <Button
                              onClick={() => {
                                handleDailyStatus(row.id, charData.id);
                              }}
                              fullWidth
                              variant={"text"}
                            >
                              <Checkbox
                                checked={
                                  siteSettings.dailyTaskStatus[charData.id][
                                    row.id
                                  ]
                                }
                                sx={
                                  row.color && {
                                    color: theme.palette[row.color]["main"],
                                    "&.Mui-checked": {
                                      color: theme.palette[row.color]["main"],
                                    },
                                  }
                                }
                                disableRipple
                              />
                            </Button>
                          </TableCell>
                        ))
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
                                  color: theme.palette[row.color]["main"],
                                  "&.Mui-checked": {
                                    color: theme.palette[row.color]["main"],
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
                  </>
                );
              })}
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
                  siteSettings.accountDailiesOpen ? 2 : taskStatus.length + 1
                }
              >
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
              {siteSettings.accountDailiesOpen && (
                <>
                  <TableCell>
                    <Typography>Rapport Name</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Typography align="center">Song</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Typography align="center">Emote</Typography>
                  </TableCell>
                  <TableCell colSpan={taskStatus.length - 4} />
                </>
              )}
            </TableRow>
            {siteSettings.accountDailiesOpen &&
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
                        color={row.color && theme.palette[row.color]["main"]}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      padding="checkbox"
                      key={`${row.id}`}
                      colSpan={rapportItem ? 1 : taskStatus.length}
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
                              color: theme.palette[row.color]["main"],
                              "&.Mui-checked": {
                                color: theme.palette[row.color]["main"],
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
                        <TableCell colSpan={taskStatus.length - 5} />
                      </>
                    )}
                  </TableRow>
                );
              })}
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
                      <Button
                        onClick={() => handleWeeklyStatus(row.id, charData.id)}
                        fullWidth
                        variant={"text"}
                      >
                        <Checkbox
                          color="primary"
                          checked={charData.weeklies[row.id]}
                          sx={
                            row.color && {
                              color: theme.palette[row.color]["main"],
                              "&.Mui-checked": {
                                color: theme.palette[row.color]["main"],
                              },
                            }
                          }
                          disableRipple
                        />
                      </Button>
                    </TableCell>
                  ))}
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
                              color: theme.palette[row.color]["main"],
                              "&.Mui-checked": {
                                color: theme.palette[row.color]["main"],
                              },
                            }
                          }
                        />
                      </Button>
                    </TableCell>
                  ))}
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
