import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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
  const [openDialog, setOpenDialog] = React.useState(false);
  const characterName = charData.class;

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleChangeClass(event) {
    updateClass(charData.id, event.target.value);
  }

  return (
    <React.Fragment>
      {characterEditMode ? (
        <>
          <Box sx={{ textAlign: "center" }}>
            <Tooltip title="Delete character" placement="top">
              <IconButton
                onClick={() => {
                  //removeCharacter(charData.id);
                  handleOpenDialog();
                }}
                color="error"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
            <FormControl sx={{ m: 0, mt: 1, minWidth: 128, width: "100%" }}>
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
          </Box>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="Delete Character"
            aria-describedby="Confirm deleting character"
          >
            <DialogContent>
              <DialogContentText>
                Delete {characterName.length ? characterName : "this character"}
                ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={() => {
                  removeCharacter(charData.id);
                }}
                autoFocus
                color="error"
                variant="outlined"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography align="center">{characterName}</Typography>
      )}
    </React.Fragment>
  );
}
