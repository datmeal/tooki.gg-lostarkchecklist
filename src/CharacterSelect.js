import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ChromeReaderModeSharp } from "@mui/icons-material";

import icon_deathblade from "./img/icon_deathblade.png";

const classes = [
  { label: "None", id: 0 },
  { label: "Artillerist", id: 1 },
  { label: "Bard", id: 2 },
  { label: "Berserker", id: 3 },
  { label: "Deadeye", id: 4 },
  { label: "Deathblade", id: 5 },
  { label: "Gunlancer", id: 6 },
  { label: "Gunslinger", id: 7 },
  { label: "Paladin", id: 8 },
  { label: "Scrapper", id: 9 },
  { label: "Shadowhunter", id: 10 },
  { label: "Sharpshooter", id: 11 },
  { label: "Sorceress", id: 12 },
  { label: "Soulfist", id: 13 },
  { label: "Striker", id: 14 },
  // { label: "Summoner", id: 15 },
  { label: "Wardancer", id: 16 },
];

// const testClasses = ["None", "Artillerist", "Bard"];

export default function CharacterSelect(props) {
  const { charData, characterEditMode } = props;
  const useStore = props.useStore;
  const updateClass = useStore((state) => state.updateClass);
  const removeCharacter = useStore((state) => state.removeCharacter);
  const characterName = charData.class;

  function handleChangeClass(event) {
    updateClass(charData.id, event.target.value);
  }

  function renderMenuItems() {
    return classes.map((characterName) => (
      <MenuItem value={characterName} key={characterName}>
        {characterName}
      </MenuItem>
    ));
  }

  return (
    <React.Fragment>
      {characterEditMode ? (
        <>
          <Tooltip title="Delete character" placement="top">
            <Button
              onClick={() => {
                removeCharacter(charData.id);
              }}
              color="error"
              fullWidth
            >
              <DeleteForeverIcon />
            </Button>
          </Tooltip>
          <FormControl sx={{ m: 0.5, minWidth: 128, width: "1px" }}>
            {/* <InputLabel id={`character-${charData.id}-label`}>Class</InputLabel> */}
            <Autocomplete
              freeSolo
              options={classes.map((option) => option.label)}
              value={characterName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{ ...params.inputProps, maxLength: 16 }}
                  label="Class"
                />
              )}
              onBlur={handleChangeClass}
              clearOnEscape
              disableClearable
              fullWidth
            />
          </FormControl>
        </>
      ) : (
        <Typography align="center">{characterName}</Typography>
      )}
    </React.Fragment>
  );
}
