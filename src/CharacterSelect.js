import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ChromeReaderModeSharp } from "@mui/icons-material";

export default function CharacterSelect(props) {
  const { charData } = props;
  const useStore = props.useStore;
  const updateClass = useStore((state) => state.updateClass);

  function handleChangeClass(event) {
    updateClass(charData.id, event.target.value);
  }

  function renderMenuItems() {
    const classes = [
      "None",
      "Artillerist",
      "Bard",
      "Berserker",
      "Deadeye",
      "Deathblade",
      "Gunlancer",
      "Gunslinger",
      "Paladin",
      "Scrapper",
      "Shadowhunter",
      "Sharpshooter",
      "Sorceress",
      "Soulfist",
      "Striker",
      "Summoner",
      "Wardancer",
    ];

    return classes.map((characterName) => (
      <MenuItem value={characterName} key={characterName}>
        {characterName}
      </MenuItem>
    ));
  }

  return (
    <React.Fragment>
      <FormControl sx={{ m: 0.5, minWidth: 100 }}>
        <InputLabel id={`character-${charData.id}-label`}>Class</InputLabel>
        <Select
          labelId={`character-${charData.id}-label`}
          id={`character-${charData.id}`}
          value={useStore((state) => state.taskStatus[charData.id].class)}
          label={`Class`}
          onChange={handleChangeClass}
          autoWidth
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
