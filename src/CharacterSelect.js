import * as React from "react";
import _ from "lodash";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import icon_cube from "./img/icon_cube.png";
import icon_bossrush from "./img/icon_bossrush.png";

const classes = [
  { label: "None", id: 0 },
  { label: "Arcana", id: 19 },
  { label: "Artillerist", id: 1 },
  { label: "Artist", id: 22 },
  { label: "Bard", id: 2 },
  { label: "Berserker", id: 3 },
  { label: "Deadeye", id: 4 },
  { label: "Deathblade", id: 5 },
  { label: "Destroyer", id: 18 },
  { label: "Glavier", id: 17 },
  { label: "Gunlancer", id: 6 },
  { label: "Gunslinger", id: 7 },
  { label: "Paladin", id: 8 },
  { label: "Reaper", id: 21 },
  { label: "Machinist", id: 20 },
  { label: "Scrapper", id: 9 },
  { label: "Shadowhunter", id: 10 },
  { label: "Sharpshooter", id: 11 },
  { label: "Sorceress", id: 12 },
  { label: "Soulfist", id: 13 },
  { label: "Striker", id: 14 },
  { label: "Summoner", id: 15 },
  { label: "Wardancer", id: 16 },
];

const unasTasks = [
  {
    id: "0",
    label: "Repairing the Seal Site",
    location: "Rohendel",
    require: 70,
    reward: "skillpoint",
  },
  {
    id: "1",
    label: "The Rebuilding of Xeneela",
    location: "Rohendel",
    require: 380,
    reward: "skillpoint",
  },
  {
    id: "2",
    label: "Whispering Minuet",
    location: "Whispering Islet",
    require: 20,
    reward: "skillpoint",
  },
  {
    id: "3",
    label: "Whispering Resonance",
    location: "Whispering Islet",
    require: 30,
    reward: "skillpoint",
  },
  {
    id: "4",
    label: "Whispering Harmony",
    location: "Whispering Islet",
    require: 50,
    reward: "skillpoint",
  },
  {
    id: "5",
    label: "Taking on Tooki",
    location: "Tooki Island",
    require: 270,
    reward: "giantheart",
  },
  {
    id: "6",
    label: "Super Secret Materials for a Super Secret Project",
    location: "Shadowmoon Market",
    require: 220,
    reward: "giantheart",
  },
  {
    id: "7",
    label: "Ruffians in the Ground",
    location: "Azure Wind Island",
    require: 150,
    reward: "giantheart",
  },
  {
    id: "8",
    label: "Pond of Purification",
    location: "Punika",
    require: 70,
    reward: "omniumstar",
  },
  {
    id: "9",
    label: "Madness Piles on the Altar",
    location: "Punika",
    require: 140,
    reward: "omniumstar",
  },
  {
    id: "10",
    label: "Ride Like the Wind",
    location: "",
    require: 210,
    reward: "piratecoin",
  },
  {
    id: "11",
    label: `Playing by the Pirate's Rules`,
    location: `Hypnos's Eyes`,
    require: 100,
    reward: "piratecoin",
  },
  {
    id: "12",
    label: "Pest Control",
    location: `Blackfang's Den`,
    require: 150,
    reward: "piratecoin",
  },
  {
    id: "13",
    label: "Bleak Night Fog",
    location: "",
    require: 120,
    reward: "piratecoin",
  },
  {
    id: "14",
    label: "She Drifts, Sea Gifts",
    location: "",
    require: 250,
    reward: "piratecoin",
  },
  {
    id: "15",
    label: "Whale Tale",
    location: "Notos Island",
    require: 10,
    reward: "islandsoul",
  },
  {
    id: "16",
    label: `Whalekeeper's Reward`,
    location: "Notos Island",
    require: 50,
    reward: "islandsoul",
  },
  {
    id: "17",
    label: "Whale Watching",
    location: "Notos Island",
    require: 100,
    reward: "islandsoul",
  },
  {
    id: "18",
    label: "Totopia Tutor for a Day",
    location: "Totopia",
    require: 150,
    reward: "islandsoul",
  },
  {
    id: "19",
    label: "Cocktail in Hand",
    location: "Revelry Row",
    require: 160,
    reward: "islandsoul",
  },
  {
    id: "20",
    label: `What's in the Ship?`,
    location: "Atropos",
    require: 70,
    reward: "islandsoul",
  },
  {
    id: "21",
    label: `Only the Strong Survive`,
    location: "Goblin Island",
    require: 70,
    reward: "islandsoul",
  },
  {
    id: "22",
    label: `Prove Your Mettle`,
    location: "Goblin Island",
    require: 80,
    reward: "islandsoul",
  },
  {
    id: "23",
    label: `A Great Beer Snack`,
    location: "Gesbroy",
    require: 40,
    reward: "islandsoul",
  },
  {
    id: "24",
    label: `An Even Better Beer Snack`,
    location: "Gesbroy",
    require: 60,
    reward: "islandsoul",
  },
  {
    id: "25",
    label: `The Beer Snack to End All Beer Snacks`,
    location: "Gesbroy",
    require: 100,
    reward: "islandsoul",
  },
  {
    id: "26",
    label: `Peering Into Chaos`,
    location: "Isteri",
    require: 210,
    reward: "islandsoul",
  },
  {
    id: "27",
    label: `Special Delivery`,
    location: "Lopang Island",
    require: 50,
    reward: "islandsoul", // also silver
  },
  {
    id: "28",
    label: `Crook Catcher`,
    location: "Runaways Island",
    require: 160,
    reward: "islandsoul", // also pirate coins
  },
  {
    id: "29",
    label: `A Hard Day at Work`,
    location: "Peyto",
    require: 10,
    reward: "islandsoul", // also pirate coins
  },
  {
    id: "30",
    label: `Another Hard Day at Work`,
    location: "Peyto",
    require: 30,
    reward: "islandsoul", // also pirate coins
  },
  {
    id: "31",
    label: `Everything Circles Back Around`,
    location: "Peyto",
    require: 50,
    reward: "islandsoul", // also pirate coins
  },
  {
    id: "32",
    label: `Dance Time Redux`,
    location: "Peyto",
    require: 80,
    reward: "islandsoul", // also pirate coins
  },
  {
    id: "33",
    label: `For the Fermata's Maintenance`,
    location: "Cradle of the Sea Fermata",
    require: 20,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "34",
    label: `For the Fermata's Safety`,
    location: "Cradle of the Sea Fermata",
    require: 150,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "35",
    label: `The Cursed Ruins`,
    location: "Ozhorn Hill",
    require: 70,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "36",
    label: `Moronto's Agent`,
    location: "Wavestrand Port",
    require: 70,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "37",
    label: `Prisoner Release`,
    location: "Kalthertz",
    require: 150,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "38",
    label: `An Archaeologist's Request`,
    location: "Freedom Isle",
    require: 70,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "39",
    label: `Help Wanted at the Hot Springs`,
    location: "Starsand Beach",
    require: 50,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "40",
    label: `Customer Comes First`,
    location: "Starsand Beach",
    require: 80,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "41",
    label: `Guard Wanted!`,
    location: "Starsand Beach",
    require: 120,
    reward: "masterpiece", // also pirate coins
  },
  {
    id: "42",
    label: `Mischievous Fairy`,
    location: "Breezesome Brae",
    require: 150,
    reward: "adventuretome",
  },
  {
    id: "43",
    label: `Crash Boom Bang!`,
    location: "Black Anvil Mine",
    require: 150,
    reward: "adventuretome",
  },
  {
    id: "44",
    label: `Quality Check`,
    location: "Great Castle",
    require: 30,
    reward: "adventuretome",
  },
  {
    id: "45",
    label: `Research and Development`,
    location: "Great Castle",
    require: 60,
    reward: "adventuretome",
  },
  {
    id: "46",
    label: `Market Research`,
    location: "Great Castle",
    require: 260,
    reward: "adventuretome",
  },
];

// const testClasses = ["None", "Artillerist", "Bard"];

export default function CharacterSelect(props) {
  const { charData, characterEditMode, theme } = props;
  const useStore = props.useStore;
  const siteSettings = useStore((state) => state.siteSettings);
  const toggleSiteSetting = useStore((state) => state.toggleSiteSetting);
  const rosterData = useStore((state) => state.siteSettings.roster);
  const updateClass = useStore((state) => state.updateClass);
  const updateCharacter = useStore((state) => state.updateCharacter);
  const removeCharacter = useStore((state) => state.removeCharacter);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const defaultUna = {
    name: "",
    location: "",
    current: 0,
    require: 0,
  };
  const defaultTempCharacter = {
    id: "",
    name: "",
    ilvl: 0,
    rest_chaos: 0,
    rest_chaos_temp: 0,
    rest_guardian: 0,
    rest_guardian_temp: 0,
    rest_una: 0,
    rest_una_temp: 0,
    una1: {
      ...defaultUna,
    },
    una2: {
      ...defaultUna,
    },
    una3: {
      ...defaultUna,
    },
  };
  const [tempCharacter, setTempCharacter] =
    React.useState(defaultTempCharacter);
  const characterName = charData.name;

  // Initialize
  React.useEffect(() => {
    setTempCharacter({
      ...tempCharacter,
      ...charData,
    });
  }, []);

  React.useEffect(() => {
    setTempCharacter(_.find(rosterData, (item) => item.id === charData.id));
  }, [rosterData]);

  function handleOpenDeleteDialog() {
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
  }

  function handleChangeClass(event) {
    updateClass(charData.id, event.target.value);
  }

  function handleOpenEditDialog(character) {
    // console.log("tempCharacter:", tempCharacter);
    setOpenEditDialog(true);
  }

  function handleCloseEditDialog() {
    setTempCharacter({
      ...defaultTempCharacter,
      ...charData,
    });
    setOpenEditDialog(false);
  }

  function handleSaveEditDialog(character) {
    updateCharacter(character);
    handleCloseEditDialog();
  }

  function toggleRest(type) {
    const rest = {
      chaos: "useRestChaos",
      guardian: "useRestGuardian",
      una: "useRestUna",
    };
    toggleSiteSetting(rest[type]);
  }

  function handleUnasTaskName(task, event, obj) {
    const taskObj = _.find(unasTasks, (task) => task.label === obj);
    if (taskObj) {
      setTempCharacter({
        ...tempCharacter,
        [task]: {
          ...tempCharacter[task],
          name: taskObj.label,
          require: taskObj.require,
          location: taskObj.location,
        },
      });
    } else {
      const taskName = _.isUndefined(event.target.value)
        ? ""
        : event.target.value;
      setTempCharacter({
        ...tempCharacter,
        [task]: {
          ...tempCharacter[task],
          name: taskName,
          location: "",
        },
      });
    }
  }

  const IconImage = styled.img`
    display: inline-flex;
    width: 24px;
    height: 24px;
  `;

  const TicketItem = styled.span(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: 0,
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }));

  return (
    <ThemeProvider theme={theme}>
      {characterEditMode ? (
        // currently unused
        <>
          <Box sx={{ textAlign: "center" }}>
            {/* <Tooltip title="Delete character" placement="top">
              <IconButton
                onClick={() => {
                  //removeCharacter(charData.id);
                  handleOpenDeleteDialog();
                }}
                color="error"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip> */}
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
              handleOpenEditDialog(charData);
            }}
            fullWidth
            sx={{
              textTransform: "none",
              borderColor: "rgba(255,255,255,0.16)",
              display: "flex",
              flexDirection: "column",
            }}
            variant="outlined"
          >
            <Typography align="center" color="#fff">
              {characterName}
            </Typography>
            {charData.ilvl > 0 && (
              <Typography
                align="center"
                color="rgba(255,255,255,0.5)"
                variant="subtitle2"
              >
                {charData.ilvl}
              </Typography>
            )}
            {(charData.cubeTickets > 0 || charData.bossrushTickets > 0) && (
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                {charData.cubeTickets > 0 && (
                  <TicketItem>
                    <Typography
                      align="center"
                      color="rgba(255,255,255,0.5)"
                      variant="subtitle2"
                    >
                      {charData.cubeTickets}
                    </Typography>
                    <IconImage
                      src={icon_cube}
                      alt="Cube Tickets"
                      style={{ marginLeft: 4 }}
                    />
                  </TicketItem>
                )}
                {charData.bossrushTickets > 0 && (
                  <TicketItem>
                    <Typography
                      align="center"
                      color="rgba(255,255,255,0.5)"
                      variant="subtitle2"
                    >
                      {charData.bossrushTickets}
                    </Typography>
                    <IconImage
                      src={icon_bossrush}
                      alt="Boss Rush Tickets"
                      style={{ marginLeft: 4 }}
                    />
                  </TicketItem>
                )}
              </Stack>
            )}
          </Button>
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            aria-labelledby="Edit Character"
            aria-describedby="Edit selected character"
            maxWidth="md"
          >
            <DialogTitle>Edit Character</DialogTitle>
            <DialogContent>
              <Typography align="center">Basic Settings</Typography>
              <List>
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
                      value={tempCharacter.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{ ...params.inputProps, maxLength: 16 }}
                          label="Name / Class"
                        />
                      )}
                      onBlur={(event) => {
                        setTempCharacter({
                          ...tempCharacter,
                          name: event.target.value,
                        });
                      }}
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
                  <Typography color="rgba(255,255,255,0.5)" variant="subtitle2">
                    Enter '0' to hide
                  </Typography>
                  <TextField
                    id={`ilvl_${charData.id}`}
                    label="Item Level"
                    type="number"
                    inputProps={{
                      min: "0",
                      max: "9999",
                      maxLength: "6",
                      step: "1",
                    }}
                    value={tempCharacter.ilvl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setTempCharacter({
                        ...tempCharacter,
                        ilvl: _.toNumber(event.target.value),
                      });
                    }}
                    sx={{ width: 100 }}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Cube Tickets</Typography>
                  <TextField
                    id={`ilvl_${charData.id}`}
                    label="Tickets"
                    type="number"
                    inputProps={{
                      min: "0",
                      max: "99",
                      maxLength: "6",
                      step: "1",
                    }}
                    value={tempCharacter.cubeTickets}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setTempCharacter({
                        ...tempCharacter,
                        cubeTickets: _.toNumber(event.target.value),
                      });
                    }}
                    sx={{ width: 100 }}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Boss Rush Tickets</Typography>
                  <TextField
                    id={`ilvl_${charData.id}`}
                    label="Tickets"
                    type="number"
                    inputProps={{
                      min: "0",
                      max: "99",
                      maxLength: "6",
                      step: "1",
                    }}
                    value={tempCharacter.bossrushTickets}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setTempCharacter({
                        ...tempCharacter,
                        bossrushTickets: _.toNumber(event.target.value),
                      });
                    }}
                    sx={{ width: 100 }}
                  />
                </ListItem>
                <Accordion expanded={siteSettings.useRestChaos}>
                  <AccordionSummary
                    expandIcon={<Switch checked={siteSettings.useRestChaos} />}
                    onChange={() => toggleRest("chaos")}
                    sx={{
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "none",
                      },
                    }}
                  >
                    <Typography>Chaos Dungeon Rest Bonus Tracking</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ padding: 0 }}>
                      <ListItem
                        dense={true}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <Typography>Chaos Dungeon Rest Bonus</Typography>
                        <TextField
                          id={`rest_chaos_${charData.id}`}
                          label="Rest Bonus"
                          type="number"
                          inputProps={{ min: "0", max: "100", step: "10" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={
                            tempCharacter.rest_chaos && tempCharacter.rest_chaos
                          }
                          onChange={(event) => {
                            const value = _.toInteger(event.target.value);
                            setTempCharacter({
                              ...tempCharacter,
                              rest_chaos: value,
                              rest_chaos_temp: value,
                            });
                          }}
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={siteSettings.useRestGuardian}>
                  <AccordionSummary
                    expandIcon={
                      <Switch checked={siteSettings.useRestGuardian} />
                    }
                    onChange={() => toggleRest("guardian")}
                    sx={{
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "none",
                      },
                    }}
                  >
                    <Typography>Guardian Raid Rest Bonus Tracking</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ padding: 0 }}>
                      <ListItem
                        dense={true}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <Typography>Guardian Raid Rest Bonus</Typography>
                        <TextField
                          id={`rest_guardian_${charData.id}`}
                          label="Rest Bonus"
                          type="number"
                          inputProps={{ min: "0", max: "100", step: "10" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={
                            tempCharacter.rest_guardian &&
                            tempCharacter.rest_guardian
                          }
                          onChange={(event) => {
                            const value = _.toInteger(event.target.value);
                            setTempCharacter({
                              ...tempCharacter,
                              rest_guardian: value,
                              rest_guardian_temp: value,
                            });
                          }}
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={siteSettings.useRestUna}>
                  <AccordionSummary
                    expandIcon={<Switch checked={siteSettings.useRestUna} />}
                    onChange={() => toggleRest("una")}
                    sx={{
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "none",
                      },
                    }}
                  >
                    <Typography>Una's Tasks Rest Bonus Tracking</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ padding: 0 }}>
                      <ListItem
                        dense={true}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <Typography>Una's Tasks Rest Bonus</Typography>
                        <TextField
                          id={`rest_una_${charData.id}`}
                          label="Rest Bonus"
                          type="number"
                          inputProps={{ min: "0", max: "100", step: "10" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={
                            tempCharacter.rest_una && tempCharacter.rest_una
                          }
                          onChange={(event) => {
                            const value = _.toInteger(event.target.value);
                            setTempCharacter({
                              ...tempCharacter,
                              rest_una: value,
                              rest_una_temp: value,
                            });
                          }}
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                {["una1", "una2", "una3"].map((task, index) => {
                  const taskNo = index + 1;
                  const quest = tempCharacter[task];
                  return (
                    <Accordion key={`${task}_details`}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                          sx={{ width: "33%", flexShrink: 0 }}
                          color={theme.palette.una.main}
                        >
                          Una's Task {taskNo}
                        </Typography>
                        {quest.name && (
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "text.secondary" }}
                          >
                            {quest.name}
                          </Typography>
                        )}
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: 0 }}>
                        <List dense={true}>
                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography color={theme.palette.una.main}>
                              Una's Task {taskNo} - Quest Name
                            </Typography>
                            <FormControl sx={{ minWidth: 210 }}>
                              <Autocomplete
                                freeSolo
                                options={unasTasks.map(
                                  (option) => option.label
                                )}
                                value={
                                  tempCharacter[task]
                                    ? tempCharacter[task].name
                                    : ""
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      maxLength: 255,
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    label={`Quest Name`}
                                  />
                                )}
                                onBlur={(event, obj) => {
                                  handleUnasTaskName(task, event, obj);
                                }}
                                onChange={(event, obj) => {
                                  handleUnasTaskName(task, event, obj);
                                }}
                                clearOnEscape
                                fullWidth
                              />
                            </FormControl>
                          </ListItem>
                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              color={theme.palette.una.main}
                              sx={{ mr: "64px" }}
                            >
                              Una's Task {taskNo} - Reputation
                            </Typography>
                            <TextField
                              id={`una_${taskNo}_current_rep_${charData.id}`}
                              label="Current"
                              type="number"
                              inputProps={{
                                min: "0",
                                max: tempCharacter[task]["require"],
                                step: "10",
                              }}
                              value={
                                tempCharacter[task] &&
                                tempCharacter[task]["current"]
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(event) => {
                                setTempCharacter({
                                  ...tempCharacter,
                                  [task]: {
                                    ...tempCharacter[task],
                                    current: _.toInteger(event.target.value),
                                  },
                                });
                              }}
                              // sx={{ width: 100 }}
                            />
                            <Typography sx={{ m: "13px" }}>/</Typography>
                            <TextField
                              id={`una_${taskNo}_req_rep_${charData.id}`}
                              label="Required"
                              type="number"
                              value={
                                tempCharacter[task] &&
                                tempCharacter[task]["require"]
                              }
                              inputProps={{
                                min: "0",
                                step: "10",
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(event) => {
                                setTempCharacter({
                                  ...tempCharacter,
                                  [task]: {
                                    ...tempCharacter[task],
                                    require: _.toInteger(event.target.value),
                                  },
                                });
                              }}
                              sx={{ width: 89 }}
                            />
                          </ListItem>
                        </List>
                      </AccordionDetails>
                      <AccordionActions sx={{ justifyContent: "flex-start" }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setTempCharacter({
                              ...tempCharacter,
                              [task]: {
                                ...defaultUna,
                              },
                            });
                          }}
                        >
                          Reset
                        </Button>
                      </AccordionActions>
                    </Accordion>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleOpenDeleteDialog()}
                color="error"
                variant="contained"
              >
                Delete Character
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button
                onClick={() => {
                  handleSaveEditDialog(tempCharacter);
                }}
                autoFocus
                color="success"
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="Delete Character"
            aria-describedby="Confirm deleting character"
          >
            <DialogContent>
              <DialogContentText>
                Delete {characterName.length ? characterName : "this character"}{" "}
                forever? This cannot be undone!
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
      )}
    </ThemeProvider>
  );
}
