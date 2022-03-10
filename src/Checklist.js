import * as React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
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

function createData(name, id, info) {
  return { name, id, info };
}

const dailies = [
  createData(`Una's Task 1`, "una1"),
  createData(`Una's Task 2`, "una2"),
  createData(`Una's Task 3`, "una3"),
  createData(`Chaos Dungeon 1`, "chaos1"),
  createData(`Chaos Dungeon 2`, "chaos2"),
  createData(`Guardian Raid 1`, "guardian1"),
  createData(`Guardian Raid 2`, "guardian2"),
  createData(
    `Kalthertz`,
    "kalthertz",
    "Buy $900 Males / $600 Females / $300 if you are impatient like me for Una's Daily Task"
  ),
  createData(`Guild Donation`, "guildDonation"),
];

const accountDailies = [
  createData(`Adventure Island`, "adv"),
  createData(`Calendar Boss`, "cal"),
  createData(`Chaos Gate`, "chaosgate"),
  createData(`Anguished Isle`, "anguishedisle"),
  createData(`Rapport Song 1`, "rapportsong1"),
  createData(`Rapport Song 2`, "rapportsong2"),
  createData(`Rapport Song 3`, "rapportsong3"),
  createData(`Rapport Song 4`, "rapportsong4"),
  createData(`Rapport Song 5`, "rapportsong5"),
  createData(`Rapport Song 6`, "rapportsong6"),
  createData(`Rapport Emote 1`, "rapportemote1"),
  createData(`Rapport Emote 2`, "rapportemote2"),
  createData(`Rapport Emote 3`, "rapportemote3"),
  createData(`Rapport Emote 4`, "rapportemote4"),
  createData(`Rapport Emote 5`, "rapportemote5"),
  createData(`Rapport Emote 6`, "rapportemote6"),
];

const weeklies = [
  createData(`Una's Task 1`, "una1"),
  createData(`Una's Task 2`, "una2"),
  createData(`Una's Task 3`, "una3"),
  createData(
    `Ghostship`,
    "ghostship1",
    "Starts Tuesday 11AM, Thursday 11AM, Saturday 11AM and occurs once per hour until reset"
  ),
  // createData(`Guardian 1`, "guardian1"),
  // createData(`Guardian 2`, "guardian2"),
  // createData(`Guardian 3`, "guardian3"),
  createData(`Abyss - Demon Beast Canyon`, "abyssdemonbeastcanyon"),
  createData(`Abyss - Necromancer's Origin`, "abyssnecromancer"),
  createData(`Abyss - Hall of the Twisted Warlord`, "abysstwistedwarlord"),
  createData(`Abyss - Hildebrandt Palace`, "abysshildebrandt"),
  createData(`Abyss - Road of Lament`, "abyssroadofsorrow"),
  createData(`Abyss - Forge of Fallen Pride`, "abyssforgottenforge"),
  createData(`Abyss - Sea of Indolence`, "abyssoblivionsea"),
  createData(`Abyss - Tranquil Karkosa`, "abyssperilousabyss"),
  createData(`Abyss - Alaric's Sanctuary`, "abyssunderwatersanctuary"),
  createData(`Abyss - Aira's Oculus`, "abyssdistraughtforest"),
  createData(`Abyss - Oreha Preveza`, "abyssrottingglade"),
  createData(`Abyss Raid - Argos`, "abyssraidargos"),
];

const weeklyVendors = [
  createData(`Guild`, "vendorGuild"),
  createData(`Pirate`, "vendorPirate"),
  createData(`Rift Piece`, "vendorRift"),
  createData(`Endless Chaos`, "vendorChaos"),
];

export default function Checklist(props) {
  const { useStore } = props;

  const resetDailyTasks = useStore((state) => state.resetDailyTasks);
  const resetWeeklyTasks = useStore((state) => state.resetWeeklyTasks);
  const taskStatus = useStore((state) => state.taskStatus);
  const rosterStatus = useStore((state) => state.rosterStatus);
  const updateTS = useStore((state) => state.updateTS);
  const updateName = useStore((state) => state.updateName);
  const toggleAccountDaily = useStore((state) => state.toggleAccountDaily);
  const toggleDailyStatus = useStore((state) => state.toggleDailyStatus);
  const toggleWeeklyStatus = useStore((state) => state.toggleWeeklyStatus);
  const toggleWeeklyVendorStatus = useStore(
    (state) => state.toggleWeeklyVendorStatus
  );

  // normal hooks

  const [openDailyTasks, setOpenDailyTasks] = React.useState(false);
  const [openDailyAccount, setOpenDailyAccount] = React.useState(false);
  const [openWeeklyTasks, setOpenWeeklyTasks] = React.useState(false);
  const [openWeeklyVendors, setOpenWeeklyVendors] = React.useState(false);

  function handleChangeName(event, id) {
    const name = event.target.value;
    updateName(id, name);
  }

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

  return (
    <>
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
                  onClick={() => setOpenDailyTasks(!openDailyTasks)}
                >
                  {openDailyTasks ? (
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
            {openDailyTasks &&
              dailies.map((row) => (
                <TableRow hover role="checkbox" key={row.id}>
                  <TableCell>
                    <Tooltip title={row.info}>
                      <IconButton size="small">
                        {row.info && <InfoIcon />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  {taskStatus.map((charData) => (
                    <TableCell
                      padding="checkbox"
                      key={`dailies-${charData.id}`}
                    >
                      <Checkbox
                        color="primary"
                        onChange={() => handleDailyStatus(row.id, charData.id)}
                        checked={taskStatus[charData.id].dailies[row.id]}
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
                  onClick={() => setOpenDailyAccount(!openDailyAccount)}
                >
                  {openDailyAccount ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={taskStatus.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="p" sx={{ padding: 2 }}>
                    Account Dailies
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {openDailyAccount &&
              accountDailies.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={row.id}
                  sx={{ backgroundColor: `rgba(0,0,0,.3)` }}
                >
                  <TableCell />
                  <TableCell>
                    <Typography>{row.name}</Typography>
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
                    />
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenWeeklyTasks(!openWeeklyTasks)}
                >
                  {openWeeklyTasks ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={taskStatus.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="p" sx={{ padding: 2 }}>
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
            {openWeeklyTasks &&
              weeklies.map((row) => (
                <TableRow hover role="checkbox" key={row.id}>
                  <TableCell>
                    <Tooltip title={row.info}>
                      <IconButton size="small">
                        {row.info && <InfoIcon />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  {taskStatus.map((charData) => (
                    <TableCell
                      padding="checkbox"
                      key={`weeklies-${charData.id}`}
                    >
                      <Checkbox
                        color="primary"
                        onChange={(event) =>
                          handleWeeklyStatus(row.id, charData.id)
                        }
                        checked={taskStatus[charData.id].weeklies[row.id]}
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
                  onClick={() => setOpenWeeklyVendors(!openWeeklyVendors)}
                >
                  {openWeeklyVendors ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell colSpan={taskStatus.length + 2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="p" sx={{ padding: 2 }}>
                    Weekly Vendors
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {openWeeklyVendors &&
              weeklyVendors.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={row.id}
                  sx={{ backgroundColor: `rgba(0,0,0,.3)` }}
                >
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
    </>
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
