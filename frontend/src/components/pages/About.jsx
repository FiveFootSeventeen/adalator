import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
              The ADAlator is created and maintained by Pirate stakepool, stake to [YARRR] if you'd like to support the development of this site.
            </p>
            <p>
              Future features I'd like to implement:
              <ul>
                <li>Mobile device support</li>
                <li>Machine learning to estimate the future price of ADA</li>
              </ul>
            </p>
            <p>
              Questions, comments, or suggestions? Email: operator@piratestakepool.com
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

