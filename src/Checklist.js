import * as React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function ChecklistHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {/* <Checkbox /> */}
          Characters
        </TableCell>
        <TableCell>
          <CharacterSelect slot={1} />
        </TableCell>
        <TableCell>
          <CharacterSelect slot={2} />
        </TableCell>
        <TableCell>
          <CharacterSelect slot={3} />
        </TableCell>
        <TableCell>
          <CharacterSelect slot={4} />
        </TableCell>
        <TableCell>
          <CharacterSelect slot={5} />
        </TableCell>
        <TableCell>
          <CharacterSelect slot={6} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function CharacterSelect(props) {
  const { slot } = props;
  const [character, setCharacter] = React.useState("");

  const handleCharacterChange = (event) => {
    setCharacter(event.target.value);
  };

  function renderMenuItems() {
    const classes = [
      "Shadowhunter",
      "Paladin",
      "Gunslinger",
      "Artillerist",
      "Bard",
      "Berserker",
      "Deadeye",
      "Gunlancer",
      "Soulfist",
      "Deathblade",
      "Scrapper",
      "Wardancer",
      "Sharpshooter",
      "Striker",
      "Summoner",
      "Sorceress",
    ];

    return classes.map((characterName) => (
      <MenuItem value={characterName} key={characterName}>
        {characterName}
      </MenuItem>
    ));
  }

  return (
    <React.Fragment>
      {/* <InputLabel id={`character-${slot}-label`}>Character</InputLabel> */}
      <Select
        labelId={`character-${slot}-label`}
        id={`character-${slot}`}
        value={character}
        label={`Character`}
        onChange={handleCharacterChange}
      >
        {renderMenuItems()}
      </Select>
    </React.Fragment>
  );
}

function createData(name, id) {
  return { name, id };
}

const rows = [
  createData(`Una's Task 1`, "una-1"),
  createData(`Una's Task 2`, "una-2"),
  createData(`Una's Task 3`, "una-3"),
  createData(`Chaos Dungeon 1`, "chaos-1"),
  createData(`Chaos Dungeon 2`, "chaos-2"),
  createData(`Guardian Raid 1`, "guardian-1"),
  createData(`Guardian Raid 2`, "guardian-2"),
];

function renderChecklistItems() {}

export default function Checklist() {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <ChecklistHead />
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  onClick={(event) => console.log(event)}
                  role="checkbox"
                  key={row.id}
                >
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
