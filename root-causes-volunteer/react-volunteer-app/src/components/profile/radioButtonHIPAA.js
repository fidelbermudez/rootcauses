import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// radio buttons to input HIPAA training completion status on volunteer profile creation page

export default function RadioButtonsHIPAA() {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-HIPAA">Have you completed the HIPAA training?</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-HIPAA"
        name="radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}