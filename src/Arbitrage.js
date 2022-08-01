import React, { useEffect } from "react";
import _ from "lodash";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import icon_crystal from "./img/icon_crystal.png";
import icon_gold from "./img/icon_gold.png";
import icon_map from "./img/icon_map.png";

export default function Arbitrage(props) {
  const { theme, siteStore, useStore } = props;
  const goldValues = useStore((state) => state.goldValues);
  const updateGV = useStore((state) => state.updateGV);
  const siteSettings = siteStore((state) => state.siteSettings);
  const toggleSiteSetting = siteStore((state) => state.toggleSiteSetting);

  // Initialize
  useEffect(() => {
    const localGoldValues = localStorage.getItem("goldValues");
    if (localGoldValues) {
      updateGV(JSON.parse(localGoldValues));
    }
  }, []);

  function createData(name, id, bundle = 10, mariAmount = 1, bound = false) {
    return { name, id, bundle, mariAmount, bound };
  }

  const itemData = [
    createData(
      `Destruction Stone Fragment (Bound)`,
      "destructionStoneFragment",
      10,
      600,
      true
    ),
    createData(`Destruction Stone (Bound)`, "destructionStone", 10, 300, true),
    createData(
      `Destruction Stone Crystal (Bound)`,
      "destructionStoneCrystal",
      10,
      500,
      true
    ),
    createData(
      `Guardian Stone Fragment (Bound)`,
      "guardianStoneFragment",
      10,
      1000,
      true
    ),
    createData(`Guardian Stone (Bound)`, "guardianStone", 10, 1000, true),
    createData(
      `Guardian Stone Crystal (Bound)`,
      "guardianStoneCrystal",
      10,
      1000,
      true
    ),
    createData(`Harmony Shard Pouch (M)`, "harmonyShardM", 1, 15, true),
    createData(`Life Shard Pouch (S)`, "lifeShardS", 1, 20, true),
    createData(`Honor Shard Pouch (S)`, "honorShardS", 1, 20, true),
    createData(`Honor Shard Pouch (L)`, "honorShardL", 1, 20, true),
    createData(`Harmony Leapstone (Bound)`, "harmonyLeapstone", 1, 30, true),
    createData(`Life Leapstone (Bound)`, "lifeLeapstone", 1, 40, true),
    createData(`Honor Leapstone (Bound)`, "honorLeapstone", 1, 20, true),
    createData(
      `Great Honor Leapstone (Bound)`,
      "greatHonorLeapstone",
      1,
      5,
      true
    ),
    createData(`Star's Breath (Bound)`, "starsBreath", 1, 20, true),
    createData(`Moon's Breath (Bound)`, "moonsBreath", 1, 10, true),
    createData(`Solar Grace (Bound)`, "solarGrace", 1, 40, true),
    createData(`Solar Blessing (Bound)`, "solarBlessing", 1, 30, true),
    createData(`Solar Protection (Bound)`, "solarProtection", 1, 25, true),
    createData(`Caldarr Fusion Material (Bound)`, "caldarrFusion", 1, 15, true),
    createData(
      `Basic Oreha Fusion Material (Bound)`,
      "basicOrehaFusion",
      1,
      20,
      true
    ),
    createData(
      `Simple Oreha Fusion Material (Bound)`,
      "simpleOrehaFusion",
      1,
      20,
      true
    ),
    createData(`Tailoring: Applied Mending`, "bookMending", 1, 4, true),
    createData(
      `Major HP Potion (Healing Battle Item Chest [5])`,
      "healingBattleChestMajor",
      1,
      50,
      true
    ),
    createData(
      `Elemental HP Potion (Healing Battle Item Chest [5])`,
      "healingBattleChest",
      1,
      15,
      true
    ),
    createData(
      `Destruction Bomb (Offensive Battle Item Chest [5])`,
      "offensiveBattleChestDestruction",
      1,
      25,
      true
    ),
    createData(
      `Awakening Potion (Buff Battle Item Chest [5])`,
      "buffBattleChestAwakening",
      1,
      10,
      true
    ),
    createData(
      "Time Stop Potion (Utility Battle Item Chest [5]",
      "utilityBattleChestTimeStop",
      1,
      15,
      true
    ),
    createData(
      "Flare (Utility Battle Item Chest [5])",
      "utilityBattleChestFlare",
      1,
      25,
      true
    ),
    createData(`T2 Gem Chest (Lv. 1-2)`, "t2gem", 1, 10),
    createData(`T3 Gem Chest (Lv. 1-2)`, "t3gem", 1, 6),
  ];

  // Value per crystal (crystal price / Mari amount)
  const crystalValues = {
    destructionStoneFragment: 120 / 600,
    destructionStone: 90 / 300,
    destructionStoneCrystal: 300 / 500,
    guardianStoneFragment: 75 / 1000,
    guardianStone: 150 / 1000,
    guardianStoneCrystal: 270 / 1000,
    harmonyShardM: 141 / 15,
    lifeShardS: 75 / 20,
    honorShardS: 112 / 20,
    honorShardL: 291 / 20,
    harmonyLeapstone: 30 / 30,
    lifeLeapstone: 56 / 40,
    honorLeapstone: 40 / 20,
    greatHonorLeapstone: 50 / 5,
    starsBreath: 24 / 20,
    moonsBreath: 30 / 10,
    solarGrace: 160 / 40,
    solarBlessing: 300 / 30,
    solarProtection: 750 / 25,
    caldarrFusion: 60 / 15,
    basicOrehaFusion: 72 / 20,
    simpleOrehaFusion: 54 / 20,
    bookMending: 260 / 4,
    healingBattleChest: 25 / 15,
    healingBattleChestMajor: 25 / 50,
    offensiveBattleChestDestruction: 25 / 25,
    buffBattleChestAwakening: 25 / 10,
    utilityBattleChestTimeStop: 25 / 15,
    utilityBattleChestFlare: 25 / 25,
    t2gem: 56 / 10,
    t3gem: 69 / 6,
  };

  const tier1List = [
    "destructionStoneFragment",
    "guardianStoneFragment",
    "harmonyShardM",
    "harmonyLeapstone",
    "starsBreath",
  ];
  const tier2List = [
    "destructionStone",
    "guardianStone",
    "lifeShardS",
    "lifeLeapstone",
    "moonsBreath",
    "caldarrFusion",
    "t2gem",
  ];
  const tier3List = [
    "destructionStoneCrystal",
    "guardianStoneCrystal",
    "honorShardS",
    "honorShardL",
    "honorLeapstone",
    "greatHonorLeapstone",
    "solarGrace",
    "solarBlessing",
    "solarProtection",
    "basicOrehaFusion",
    "simpleOrehaFusion",
    "t3gem",
    "bookMending",
  ];
  const miscList = [
    "healingBattleChest",
    "healingBattleChestMajor",
    "offensiveBattleChestDestruction",
    "buffBattleChestAwakening",
    "utilityBattleChestTimeStop",
    "utilityBattleChestFlare",
  ];

  const goldPerCrystal = goldValues.crystal / 95;
  const goldPerRoyal = goldValues.royal / 238;

  function pricePerBundle(price, bundle) {
    return _.round(price * bundle, 2);
  }

  function profit(itemId) {
    // what is crystal cost of item? t3gem = (36/400) = 0.09 crystals per item
    // what is gold cost of item? goldValues = 4g per 10 so 0.4g per item
    // item is 0.4g/0.09crystals = 4.44g per crystal   aka whale
    // what is gold cost of crystal? 625/95 = 6.58g per crystal   aka f2p
    // market = pay 160g for 400 fragments = 0.4g per item
    // 6.58g x 36 = pay 236g for 400 fragments
    // this is a loss, figure it out
    // const marketCost = goldValues[item] / itemData[]
    const data = _.find(itemData, (item) => {
      return item.id === itemId;
    });
    const marketCost = (goldValues[itemId] / data.bundle) * data.mariAmount;
    const crystalCost = crystalValues[itemId];
    const f2pCost = goldPerCrystal * (crystalCost * data.mariAmount);

    const profit = ((marketCost - f2pCost) / data.mariAmount) * data.bundle;
    return _.round(profit, 2);
  }

  const secretMapStyle = (props) => css`
    display: inline-flex;
    width: 36px;
    height: 36px;
    background: ${props.quality === "legendary"
      ? "linear-gradient(to right bottom, #392509, #a16305)"
      : props.quality === "epic"
      ? "linear-gradient(to right bottom, #2e083b, #8004a9)"
      : "linear-gradient(to right bottom, #082c3b, #0479a9)"};
    box-shadow: ${props.quality === "legendary"
      ? "inset 0 0 2px rgba(243, 147, 3, .5) !important"
      : props.quality === "epic"
      ? "inset 0 0 2px rgba(191, 0, 254 , .5) !important"
      : "inset 0 0 2px rgba(0, 181, 255, .5) !important"};
  `;

  const SecretMapImage = styled.img`
    ${secretMapStyle}
  `;

  function parseTreasureMaps() {}

  const SecretMap = (props) => {
    const { image, alt, quality } = props;
    let goldValue = 0;
    switch (quality) {
      case "rare":
        goldValue = goldValues["honorShardS"] + goldValues["solarGrace"];
        break;
      case "epic":
        goldValue =
          goldValues["honorShardS"] * 2 +
          goldValues["solarGrace"] +
          goldValues["solarBlessing"];
        break;
      case "legendary":
        goldValue =
          goldValues["honorShardS"] * 6 +
          goldValues["solarGrace"] * 2 +
          goldValues["solarBlessing"] +
          goldValues["solarProtection"];
        break;
      default:
        goldValue = 0;
        break;
    }
    return (
      <ListItem>
        <ListItemIcon>
          <SecretMapImage src={image} alt={alt} quality={quality} />
        </ListItemIcon>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography color={theme.palette[quality]} sx={{ display: "inline" }}>
            Secret Map{quality === "legendary" && "(1300)"}
          </Typography>
          <Typography sx={{ display: "inline" }}>{goldValue}g</Typography>
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Mari's Shop Calculator
      </Typography>
      <Typography variant="h6" align="center">
        Last updated: 2022/4/21
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={8} sx={{ p: 2 }}>
          <Typography>
            Set Sale Price of Gold on the "Buy Crystals" tab under Currency
            Exchange (per 95 Crystals)
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <TextField
              id="crystal"
              label="Crystal Price (Gold)"
              defaultValue={goldValues.crystal}
              type="number"
              margin="normal"
              onBlur={useStore((state) => state.setPrice)}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
            />
            <Typography color="warning.light">
              Most items are Bound and cannot directly be resold on the market!
            </Typography>
            <Typography>
              Deposit fee not included in profit calculations (-5% of cost per
              bundle, minimum 1g rounded up)
            </Typography>
            <Typography>
              Negative "Profit" means Market is cheaper than Mari
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ p: 2 }}>
          <Paper sx={{ p: { xs: 1 } }} variant="outlined">
            <Typography variant="h6" align="center">
              Tier 3 Map Prices (WIP!)
            </Typography>
            <List>
              <SecretMap
                image={icon_map}
                alt="Secret Map (Legendary)"
                quality="legendary"
              />
              <SecretMap
                image={icon_map}
                alt="Secret Map (Epic)"
                quality="epic"
              />
              <SecretMap
                image={icon_map}
                alt="Secret Map (Rare)"
                quality="rare"
              />
            </List>
          </Paper>
          <Typography>
            Note: These prices are estimated by prices you set for the
            appropriate items below.
          </Typography>
          <Typography>
            The calculated items include: Honor Shard Pouch (S), Solar Grace,
            Solar Blessing, Solar Protection
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="prices" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Item Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Crystal Cost</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Gold Price per Bundle</Typography>
              </TableCell>
              {/* <TableCell align="right">Crystal Price per Bundle</TableCell>
              <TableCell align="right">Crystal Price per Item (Mari)</TableCell> */}
              <TableCell align="right">
                <Typography>Profit per Item</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Profit per Mari Purchase</Typography>
              </TableCell>
              <TableCell>Buy From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover onClick={() => toggleSiteSetting("mariTier1")}>
              <TableCell size="small" colSpan={6} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1 }}>
                    <IconButton aria-label="expand row" size="small">
                      {siteSettings.mariTier1 ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Tier 1
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {_.map(itemData, (item) => {
              if (tier1List.includes(item.id) && siteSettings.mariTier1) {
                return renderItemRow(item);
              }
            })}
            <TableRow hover onClick={() => toggleSiteSetting("mariTier2")}>
              <TableCell size="small" colSpan={6} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1 }}>
                    <IconButton aria-label="expand row" size="small">
                      {siteSettings.mariTier2 ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Tier 2
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {_.map(itemData, (item) => {
              if (tier2List.includes(item.id) && siteSettings.mariTier2) {
                return renderItemRow(item);
              }
            })}
            <TableRow hover onClick={() => toggleSiteSetting("mariTier3")}>
              <TableCell size="small" colSpan={6} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1 }}>
                    <IconButton aria-label="expand row" size="small">
                      {siteSettings.mariTier3 ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Tier 3
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {_.map(itemData, (item) => {
              if (tier3List.includes(item.id) && siteSettings.mariTier3) {
                return renderItemRow(item);
              }
            })}
            <TableRow hover onClick={() => toggleSiteSetting("mariMisc")}>
              <TableCell size="small" colSpan={6} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1 }}>
                    <IconButton aria-label="expand row" size="small">
                      {siteSettings.mariMisc ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ padding: 2, paddingLeft: 0 }}
                  >
                    Misc
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            {_.map(itemData, (item) => {
              if (miscList.includes(item.id) && siteSettings.mariMisc) {
                return renderItemRow(item);
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  function renderItemRow(item) {
    return (
      <ItemRow
        key={item.id}
        itemName={item.name}
        itemId={item.id}
        bundle={item.bundle}
        mariAmount={item.mariAmount}
        bound={item.bound}
      />
    );
  }

  function ItemRow(props) {
    const { itemName, itemId, bundle = 1, mariAmount, bound } = props;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          <Typography color={bound && "warning.light"}>{`${itemName} [${
            mariAmount !== 1 && mariAmount
          }]`}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{_.round(crystalValues[itemId] * mariAmount)}</Typography>
        </TableCell>
        <TableCell align="right">
          <TextField
            id={itemId}
            label="Market Price (Gold)"
            defaultValue={goldValues[itemId]}
            type="number"
            onBlur={useStore((state) => state.setPrice)}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </TableCell>
        {/* <TableCell align="right">
          {pricePerBundle(crystalValues[itemId], bundle)}c
        </TableCell>
        <TableCell align="right">{crystalValues[itemId]}c</TableCell> */}
        <TableCell align="right">
          <Typography color={profit(itemId) >= 0 ? "success.light" : "error"}>
            {profit(itemId) ? `${profit(itemId)}g` : "⬅️ Input Price"}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography color={profit(itemId) >= 0 ? "success.light" : "error"}>
            {profit(itemId)
              ? `${_.round(profit(itemId) * (mariAmount / bundle), 2)}g`
              : "⬅️ Input Price"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {profit(itemId)
              ? profit(itemId) >= 0
                ? "Mari"
                : "Market"
              : "⬅️ Input Price"}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}
