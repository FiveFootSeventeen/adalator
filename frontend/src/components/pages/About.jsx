import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';


export default function MaxWidthDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.open}
        onClose={handleClose}
>
        <DialogTitle sx={{color: 'black', fontSize: '2em'}}>About</DialogTitle>
        <DialogContent sx={{color: 'black'}}>
          <DialogContentText
            sx={{
              fontSize: '.8em',
              color: 'black'
            }}
          >
            <p>
              The ADAlator is created and maintained by Pirate stakepool, stake to&nbsp;
              <Link target="_blank" rel="noreferrer" href="https://adapools.org/pool/34bba9993b1f587884e9b27513cb3168d8b410f20935231edaf3cb62" sx={{color: 'rgba(60, 160, 100, 255)'}} underline="hover">
                {'[YARRR]'}
              </Link> if you'd like to support the development of this site.
            </p>
            <p>
              This tool is used to estimate the future value of your ADA using few inputs. Its basically a fancy compound interest calculator.
              <br/>
              <h3>All the columns on the left side are adjustable, here is an explanation of what they mean:</h3>
              <b>Starting ADA Balance: </b>The amount of ADA you have in your wallet now.
              <br/><b>Time to Grow: </b>The amount of time you plan to HODL your ADA and reinvest staking rewards.
              <br/><b>Return on Stake: </b>An estimate of the return on the ADA staked to the pool you stake to (If you look up your pool on adapools.org this is the ROA parameter).
              <br/><b>Monthly Contribution: </b>The amount of your target currency you plan to use each month to purchase ADA. (For example you may choose to invest $300 per month into ADA regardless of the price).
              <br/><b>Starting Currency per ADA: </b>The amount of your target currency it takes to buy 1 ADA. This initial value is taken from the current USD/ADA market value and it is updated on each page load via CoinGecko's free API.
              <br/><b>Yearly ADA Increase: </b>The amount you expect the value of ADA to increase on a yearly basis. For example if ADA is at $1.00 at the start of the year and it increases by 50% over that year it will then be valued at $1.50.
            </p>
            <p>
              <h3>Future features I'd like to implement:</h3>
              <ul>
                <li>Better rendering/viewing on mobile device screen sizes</li>
                <li>Machine learning to better estimate the monthly change in the price of ADA.</li>
                <li>Option to use logarithmic growth instead of a fixed percent</li>
                <li>Option to more closley match stakepool ROA to the actual rewards equation</li>
                <li>Graphs of the change in the outputs over time</li>
                <li>Downloadable excel spreadsheet with monthly data</li>
              </ul>
            </p>
            <p>
              <h3>Questions, comments, or suggestions?</h3>
              Email: operator@piratestakepool.com
            </p>
            <p>
            </p>
          </DialogContentText>
          <DialogContentText
            sx={{
              fontSize: '.8em',
              color: 'black'
            }}
          >
            <h3>Legal Disclaimer:</h3>
            <p>
            The Content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice. Nothing contained on this Site constitutes a solicitation, recommendation, endorsement, or offer to buy or sell any securities or other financial instruments in this or in in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.
           </p>
            <p>
            All Content on this Site is information of a general nature and does not address the circumstances of any particular individual or entity. Nothing in the Site constitutes professional and/or financial advice, nor does any information on the Site constitute a comprehensive or complete statement of the matters discussed or the law relating thereto. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other Content on the Site before making any decisions based on such information or other Content. In exchange for using the Site, you agree not to hold the Site owner for any possible claim for damages arising from any decision you make based on information or other Content made available to you through the Site.
           </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: "black"}}onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

