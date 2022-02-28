import * as React from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
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

export default function Checklist(props) {
  const { useStore } = props;
  const goldValues = useStore((state) => state.goldValues);

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
      50,
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
      200,
      true
    ),
    createData(`Harmony Leapstone (Bound)`, "harmonyLeapstone", 1, 15, true),
    createData(`Life Leapstone (Bound)`, "lifeLeapstone", 1, 10, true),
    createData(`Honor Leapstone (Bound)`, "honorLeapstone", 1, 5, true),
    createData(`Star's Breath (Bound)`, "starsBreath", 1, 10, true),
    createData(`Moon's Breath (Bound)`, "moonsBreath", 1, 5, true),
    createData(`Solar Grace (Bound)`, "solarGrace", 1, 20, true),
    createData(`Solar Blessing (Bound)`, "solarBlessing", 1, 15, true),
    createData(`Solar Protection (Bound)`, "solarProtection", 1, 3, true),
    createData(
      `Elemental HP Potion (Healing Battle Item Chest [5])`,
      "healingBattleChest",
      1,
      15,
      true
    ),
    createData(
      `Awakening Potion (Buff Battle Item Chest [5])`,
      "buffBattleChestAwakening",
      1,
      10,
      true
    ),
    createData(`T2 Gem Chest (Lv. 1-2)`, "t2gem", 1, 10),
    createData(`T3 Gem Chest (Lv. 1-2)`, "t3gem", 1, 20),
  ];

  // Value per crystal (crystal price / Mari amount)
  const crystalValues = {
    destructionStoneFragment: 60 / 150,
    destructionStone: 84 / 150,
    destructionStoneCrystal: 40 / 50,
    guardianStoneFragment: 36 / 400,
    guardianStone: 80 / 400,
    guardianStoneCrystal: 60 / 200,
    harmonyLeapstone: 15 / 15,
    lifeLeapstone: 14 / 10,
    honorLeapstone: 10 / 5,
    starsBreath: 30 / 10,
    moonsBreath: 30 / 5,
    solarGrace: 80 / 20,
    solarBlessing: 150 / 15,
    solarProtection: 150 / 3,
    healingBattleChest: 25 / 15,
    buffBattleChestAwakening: 25 / 10,
    t2gem: 56 / 10,
    t3gem: 73 / 20,
  };

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
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Crystal Cost</TableCell>
              <TableCell align="right">Gold Price per Bundle</TableCell>
              {/* <TableCell align="right">Crystal Price per Bundle</TableCell>
              <TableCell align="right">Crystal Price per Item (Mari)</TableCell> */}
              <TableCell align="right">Profit per Item</TableCell>
              <TableCell align="right">Profit per Mari Purchase</TableCell>
              <TableCell>Buy From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(itemData, (item) => (
              <ItemRow
                key={item.id}
                itemName={item.name}
                itemId={item.id}
                bundle={item.bundle}
                mariAmount={item.mariAmount}
                bound={item.bound}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

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
