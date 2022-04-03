import React, { useEffect } from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
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

export default function Arbitrage(props) {
  const { siteStore, useStore } = props;
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
      150,
      true
    ),
    createData(`Destruction Stone (Bound)`, "destructionStone", 10, 150, true),
    createData(
      `Destruction Stone Crystal (Bound)`,
      "destructionStoneCrystal",
      10,
      300,
      true
    ),
    createData(
      `Guardian Stone Fragment (Bound)`,
      "guardianStoneFragment",
      10,
      400,
      true
    ),
    createData(`Guardian Stone (Bound)`, "guardianStone", 10, 400, true),
    createData(
      `Guardian Stone Crystal (Bound)`,
      "guardianStoneCrystal",
      10,
      800,
      true
    ),
    createData(`Harmony Shard Pouch (M)`, "harmonyShardM", 1, 5, true),
    createData(`Life Shard Pouch (S)`, "lifeShardS", 1, 10, true),
    createData(`Honor Shard Pouch (S)`, "honorShardS", 1, 10, true),
    createData(`Harmony Leapstone (Bound)`, "harmonyLeapstone", 1, 15, true),
    createData(`Life Leapstone (Bound)`, "lifeLeapstone", 1, 40, true),
    createData(`Honor Leapstone (Bound)`, "honorLeapstone", 1, 5, true),
    createData(
      `Great Honor Leapstone (Bound)`,
      "greatHonorLeapstone",
      1,
      5,
      true
    ),
    createData(`Star's Breath (Bound)`, "starsBreath", 1, 10, true),
    createData(`Moon's Breath (Bound)`, "moonsBreath", 1, 5, true),
    createData(`Solar Grace (Bound)`, "solarGrace", 1, 20, true),
    createData(`Solar Blessing (Bound)`, "solarBlessing", 1, 15, true),
    createData(`Solar Protection (Bound)`, "solarProtection", 1, 3, true),
    createData(`Caldarr Fusion Material (Bound)`, "caldarrFusion", 1, 10, true),
    createData(
      `Basic Oreha Fusion Material (Bound)`,
      "basicOrehaFusion",
      1,
      10,
      true
    ),
    createData(
      `Simple Oreha Fusion Material (Bound)`,
      "simpleOrehaFusion",
      1,
      10,
      true
    ),
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
    createData(`T3 Gem Chest (Lv. 1-2)`, "t3gem", 1, 20),
  ];

  // Value per crystal (crystal price / Mari amount)
  const crystalValues = {
    destructionStoneFragment: 60 / 150,
    destructionStone: 167 / 300,
    destructionStoneCrystal: 240 / 300,
    guardianStoneFragment: 36 / 400,
    guardianStone: 80 / 400,
    guardianStoneCrystal: 240 / 800,
    harmonyShardM: 47 / 5,
    lifeShardS: 38 / 10,
    honorShardS: 56 / 10,
    harmonyLeapstone: 30 / 30,
    lifeLeapstone: 56 / 40,
    honorLeapstone: 10 / 5,
    greatHonorLeapstone: 50 / 5,
    starsBreath: 30 / 10,
    moonsBreath: 30 / 5,
    solarGrace: 80 / 20,
    solarBlessing: 150 / 15,
    solarProtection: 150 / 3,
    caldarrFusion: 70 / 10,
    basicOrehaFusion: 40 / 10,
    simpleOrehaFusion: 30 / 10,
    healingBattleChest: 25 / 15,
    healingBattleChestMajor: 25 / 50,
    offensiveBattleChestDestruction: 25 / 25,
    buffBattleChestAwakening: 25 / 10,
    utilityBattleChestTimeStop: 25 / 15,
    utilityBattleChestFlare: 25 / 25,
    t2gem: 56 / 10,
    t3gem: 73 / 20,
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
    "greatHonorLeapstone",
    "moonsBreath",
    "caldarrFusion",
    "t2gem",
  ];
  const tier3List = [
    "destructionStoneCrystal",
    "guardianStoneCrystal",
    "honorShardS",
    "honorLeapstone",
    "greatHonorLeapstone",
    "solarGrace",
    "solarBlessing",
    "solarProtection",
    "basicOrehaFusion",
    "simpleOrehaFusion",
    "t3gem",
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

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Mari's Shop Calculator
      </Typography>
      <Box sx={{ m: 2 }}>
        <Typography>
          Set Sale Price of Gold on the "Buy Crystals" tab under Currency
          Exchange (per 95 Crystals)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        </Box>
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
            {profit(itemId)}g
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography color={profit(itemId) >= 0 ? "success.light" : "error"}>
            {_.round(profit(itemId) * (mariAmount / bundle), 2)}g
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{profit(itemId) >= 0 ? "Mari" : "Market"}</Typography>
        </TableCell>
      </TableRow>
    );
  }
}
