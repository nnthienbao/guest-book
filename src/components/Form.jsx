import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import SingleMessage from './SingleMessage';

const premiumTypeLists = [
  {
    label: 'Default',
    value: 0,
  },
  {
    label: 'Theme 1',
    value: 1,
  },
  {
    label: 'Theme 2',
    value: 2,
  },
  {
    label: 'Theme 3',
    value: 3
  }
];

export default function Form({ contract, onSubmit, currentUser }) {
  const [isSign, setIsSign] = useState(true);
  const [message, setMessage] = useState('');
  const [donation, setDonation] = useState(0);
  const [premiumType, setPremiumType] = useState(0);
  useEffect(() => {
    // TODO: don't just fetch once: isSign
    contract.checkIsSign({accountId: currentUser.accountId}).then(setIsSign);
  }, []);
  return (
    <Container>
    {
      !isSign ?
      <Container sx={{ width: 600 }}>
        <Typography variant="h6" gutterBottom component="div">
          <span style={{color: "red"}}>{currentUser.accountId}</span> - <strong>Sign the guest book</strong>
        </Typography>
        <TextField
          style={{marginTop: 12}}
          fullWidth
          required
          id="message"
          label="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <TextField
          style={{marginTop: 12}}
          fullWidth
          id="donation"
          label="Donation Ⓝ (optional)"
          type="number"
          value={donation}
          onChange={e => setDonation(e.target.value)}
        />
        {donation > 0 ?
        <TextField
          style={{marginTop: 12}}
          fullWidth
          id="premiumType"
          select
          label="Theme (Premium only)"
          helperText="Please choose your theme"
          value={premiumType}
          onChange={e => setPremiumType(e.target.value)}
        >
          {premiumTypeLists.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
              <SingleMessage
                accountId='demo.testnet'
                amount={1000000000000000000000000}
                isPremium={true}
                premiumType={option.value}
                message='This is demo message'
                timestamp={1637575141912023976}  />
            </MenuItem>
          ))}
        </TextField> : null
        }
        <Button style={{marginTop: 12}} onClick={() => onSubmit({message, donation, premiumType}, setIsSign)} variant="contained">Sign</Button>
      </Container>
      :<Container sx={{ width: 600 }}><Typography variant="h6" gutterBottom>
      <span style={{color: "red"}}>{currentUser.accountId}</span> - <strong>You cannot sign more than once</strong>
    </Typography></Container>
    }
    </Container>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
