import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const characterName = charData.name;

  function handleOpenDeleteDialog() {
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
  }

  function handleChangeClass(event) {
    updateClass(charData.id, event.target.value);
  }

  function handleOpenEditDialog() {
    setOpenEditDialog(true);
  }

  function handleCloseEditDialog() {
    setOpenEditDialog(false);
  }

  function handleSaveEditDialog(value) {
    console.log(value);
    handleCloseEditDialog();
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
                  handleOpenDeleteDialog();
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
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
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
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
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
        <>
          <Button
            onClick={() => {
              handleOpenEditDialog();
            }}
            fullWidth
            sx={{ textTransform: "none" }}
            variant="text"
          >
            <Typography align="center" color="#fff">
              {characterName}
            </Typography>
          </Button>
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            aria-labelledby="Edit Character"
            aria-describedby="Edit selected character"
            sx={{ minWidth: "640px" }}
          >
            <DialogTitle>Edit Character</DialogTitle>
            <DialogContent>
              <Typography align="center">Basic Settings</Typography>
              <List sx={{ width: 552 }}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Character Name / Class</Typography>
                  <FormControl sx={{ minWidth: 210 }}>
                    <Autocomplete
                      freeSolo
                      options={classes.map((option) => option.label)}
                      value={characterName}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{ ...params.inputProps, maxLength: 16 }}
                          label="Name / Class"
                        />
                      )}
                      onBlur={handleChangeClass}
                      clearOnEscape
                      disableClearable
                      fullWidth
                    />
                  </FormControl>
                </ListItem>
              </List>
              <Typography align="center">Optional Settings</Typography>
              <List>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Item Level</Typography>
                  <TextField
                    id={`ilvl_${charData.id}`}
                    label="Item Level"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button
                onClick={() => {
                  handleSaveEditDialog("somethin");
                }}
                autoFocus
                color="success"
                variant="outlined"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </React.Fragment>
  );
}
