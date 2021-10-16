import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { styled } from '@mui/system';
import StopSharpIcon from '@mui/icons-material/StopSharp';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import Link from '@mui/material/Link';
import About from './About';

const bckColor = "#6bc099";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor"
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: bckColor
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
//    borderBottomColor: p.focusColor,
    borderBottomColor: bckColor,
    backgroundColor: bckColor
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: bckColor,
    backgroundColor: bckColor
  },
  // Make the textfield outline transparent and set the background
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//    borderColor: "transparent",
    borderColor: bckColor,
//    borderBottomColor: bckColor,
//    backgroundColor: "rgba(107, 192, 153, 0.2)"
    backgroundColor: "transparent"
  },
  // Square textfield background
  '& fieldset': {
    borderRadius: 0,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: bckColor,
      backgroundColor: "rgba(107, 192, 153, 0.2)"
    }
  },
}));

export default function ADAlator(props) {
  const [timeToGrowUnit, setTimeToGrowUnit] = useState("years");
  const [timeToGrow, setTimeToGrow] = useState(10);
  const [startingBalance, setStartingBalance] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [returnOnStake, setReturnOnStake] = useState(4);
  const [currencyPerAda, setCurrencyPerAda] = useState(0);
  const [finalAda, setFinalAda] = useState(0);
  const [finalAdaPrice, setFinalAdaPrice] = useState(0);
  const [totalAdaPurchased, setTotalAdaPurchased] = useState(0);
  const [yearlyADAIncrease, setYearlyADAIncrease] = useState(50);
  const [totalCurrencyInvested, setTotalCurrencyInvested] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd`)
    .then(res => {
      setCurrencyPerAda(res.data.cardano.usd.toFixed(2));
    })
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleROSChange = (event) => {
    const val = event.target.value;
    if (!isNaN(val.slice(0, -1))) {
      setReturnOnStake(parseFloat(val.slice(0, -1)));
    }
  }

  const handleYearlyADAIncrChange = (event) => {
    const val = event.target.value;
    if (!isNaN(val.slice(0, -1))) {
      setYearlyADAIncrease(parseFloat(val.slice(0, -1)));
    }
  }

  const handleChange = (event) => {
    const val = event.target.value;
    const id = event.target.id;
    let finalVal = "";

    if (val !== "") {
      if (!isNaN(val)) {
        finalVal = parseFloat(val);
      }
    }

    if (id === "startingBalance") {
      setStartingBalance(finalVal);
    } else if (id === "timeToGrow") {
      setTimeToGrow(finalVal);
    } else if (id === "monthlyContributionIn") {
      setMonthlyContribution(finalVal);
    } else if (id === "currencyPerAdaIn") {
      if (val !== "") {
        if (!isNaN(val) || val === ".") {
          setCurrencyPerAda(val);
        }
      } else {
          setCurrencyPerAda("");
      }
    } else if (id === "yearlyADAIncreaseIn") {
      setYearlyADAIncrease(finalVal);
    }
  }


  function calculateInterest() {
    let years, months;
    let ADAContribMonth, monthlyADAIncrease;
    let amount = startingBalance;
    let totalADAPur = 0;
    let totalCurrInv = 0;
    let ADAPrice = parseFloat(currencyPerAda);
    const time = 1 / 12;

    if (timeToGrowUnit === "years") {
      years = timeToGrow;
      months = 0;
    } else {
      years = Math.trunc(timeToGrow / 12);
      months = timeToGrow % 12;
    }

    for (let i = 0; i < years; i++) {
      ADAPrice += ADAPrice * (yearlyADAIncrease / 100);
      ADAContribMonth = monthlyContribution / ADAPrice;

      amount += ((amount * ((1 + (returnOnStake / 100) / 12) ** 12 )) - amount);
      amount += ADAContribMonth * 12;

      totalCurrInv += monthlyContribution * 12;
      totalADAPur += ADAContribMonth * 12;
    }

    monthlyADAIncrease = (ADAPrice * (yearlyADAIncrease / 100)) / 12;
    for (let i = 0; i < months; i++) {
      ADAPrice += monthlyADAIncrease;
      ADAContribMonth = monthlyContribution / ADAPrice;

      amount += (amount * ((1 + (returnOnStake / 100) / 1) ** time)) - amount;
      amount += ADAContribMonth;

      totalCurrInv += monthlyContribution;
      totalADAPur += ADAContribMonth;
    }


    setFinalAdaPrice(ADAPrice);
    setTotalCurrencyInvested(totalCurrInv);
    setTotalAdaPurchased(totalADAPur);
    setFinalAda(amount);
  }

  const leftColumn =
    <Grid item xs={6}>
      <div>
        <CssTextField
          id="startingBalance"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          label="Starting ADA Balance"
          variant="outlined"
          value={startingBalance}
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div>
        <CssTextField
          id="timeToGrow"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          label="Time to Grow"
          variant="outlined"
          value={timeToGrow}
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
          onChange={handleChange}
          autoComplete="off"
        />
         <FormControl component="fieldset">
           <RadioGroup
               row
               aria-label="time-to-grow-unit"
               name="row-radio-buttons-group"
               value={timeToGrowUnit}
               onChange={e => setTimeToGrowUnit(e.target.value)}
             >
             <FormControlLabel
                value="years"
                label="Years"
                control={
                  <Radio
                    disableRipple={true}
                    checkedIcon=<StopSharpIcon sx={{ backgroundColor: bckColor, color: bckColor }}/>
                    icon=<CheckBoxOutlineBlankSharpIcon/>
                  />
                }
             />
             <FormControlLabel
                value="months"
                label="Months"
                control={
                  <Radio
                    disableRipple={true}
                    checkedIcon=<StopSharpIcon sx={{ backgroundColor: bckColor, color: bckColor }}/>
                    icon=<CheckBoxOutlineBlankSharpIcon/>
                  />
                }
             />
           </RadioGroup>
         </FormControl>
      </div>
      <div>
        <NumberFormat
          id="returnOnStake"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          variant="outlined"
          customInput={CssTextField}
          label="Return on Stake (ROS/ROA)"
          value={returnOnStake}
          suffix={'%'}
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
          onChange={handleROSChange}
          autoComplete="off"
        />
      </div>
      <div>
        <CssTextField
          id="monthlyContributionIn"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          label="Monthly Contribution ($,€,¥, etc.)"
          variant="outlined"
          value={monthlyContribution}
          onChange={handleChange}
          autoComplete="off"
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
        />
      </div>
      <div>
        <CssTextField
          id="currencyPerAdaIn"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          label="Starting Currency per ADA"
          variant="outlined"
          value={currencyPerAda}
          onChange={handleChange}
          autoComplete="off"
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
        />
      </div>
      <div>
        <NumberFormat
          id="yearlyADAIncreaseIn"
          sx={{
            margin: 0.5,
            minWidth: '90%'
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="Yearly ADA Increase"
          value={yearlyADAIncrease}
          onChange={handleYearlyADAIncrChange}
          autoComplete="off"
          suffix={'%'}
          variant="outlined"
          onKeyDown={e => {e.key === 'Enter' && calculateInterest()}}
        />
      </div>
    </Grid>

  const rightColumn =
    <Grid item xs={6} >
      <div>
        <NumberFormat
          id="ADAPurchasedOut"
          sx={{
            margin: 0.5,
            minWidth: "90%",
            backgroundColor: "rgba(107, 192, 153, 0.2)",
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="Total ADA Purchased"
          value={parseFloat(totalAdaPurchased).toFixed(2)}
          prefix={'₳ '}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <NumberFormat
          id="finalAdaOut"
          sx={{
            margin: 0.5,
            minWidth: "90%",
            backgroundColor: "rgba(107, 192, 153, 0.2)"
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="End Balance of ADA"
          value={parseFloat(finalAda).toFixed(2)}
          prefix={'₳ '}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <NumberFormat
          id="finalAdaPriceOut"
          sx={{
            margin: 0.5,
            minWidth: "90%",
            backgroundColor: "rgba(107, 192, 153, 0.2)"
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="Final ADA Price in Target Currency"
          value={parseFloat(finalAdaPrice).toFixed(2)}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <NumberFormat
          id="endValueOut"
          sx={{
            margin: 0.5,
            minWidth: "90%",
            backgroundColor: "rgba(107, 192, 153, 0.2)"
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="End Value of ADA in Target Currency"
          value={(parseFloat(finalAda) * parseFloat(finalAdaPrice)).toFixed(2)}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <NumberFormat
          id="currInvestedOut"
          sx={{
            margin: 0.5,
            minWidth: "90%",
            backgroundColor: "rgba(107, 192, 153, 0.2)"
          }}
          customInput={CssTextField}
          thousandSeparator={true}
          label="Total Currency Invested"
          value={parseFloat(totalCurrencyInvested)}
          variant="outlined"
          InputProps={{
            readOnly: true,
            disableUnderline: true
          }}
        />
      </div>
      <div>
        <Button
          sx={{
            color: bckColor,
            backgroundColor: 'rgba(107, 192, 153, 0.1)',
            margin: 0.5,
            borderRadius: 0,
            fontSize: '1.6em',
            minWidth: '90%'
          }}
          variant="text"
          onClick={calculateInterest}
        >
          Calculate
        </Button>
      </div>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <h5 style={{margin: ".5em", textAlign: "left"}}>Brought to you by:<br />
          <Link target="_blank" rel="noreferrer" href="https://www.piratestakepool.com" sx={{color: 'rgba(90, 200, 150, .6)'}} underline="hover">
            {'Pirate Pool [YARRR]'}
          </Link>
        </h5>
        <Grid item xs={6} >
          <Button
            variant="text"
            sx={{
              color: bckColor,
              borderRadius: 0,
              backgroundColor: 'rgba(107, 192, 153, 0.1)',
              fontSize: '1.2em',
              minWidth: '75%',
            }}
            onClick={handleClickOpen}
          >
            About
          </Button>
        </Grid>
      </Grid>
    </Grid>

  return (
    <div style={{height: "100%"}}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} >
          <h2 className="title" >The ADAlator</h2>
          <Grid
            container
            direction="row"
            justify="center"
          >
            {leftColumn}
            {rightColumn}
          </Grid>
          <About setOpen={setOpen} open={open} />
        </Grid>
      </Grid>
    </div>
  );
}

