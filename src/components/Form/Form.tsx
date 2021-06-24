import { Grid, TextField, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { allCountries, countryToFlag } from '../../utils/country';

const Form: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    country: '',
  });

  const handleChange = (event: { target: Record<string, any> }) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  return (
    <form>
      <Grid container justify='space-between' alignItems='center' spacing={5}>
        <Grid item md={6} xs={12}>
          <TextField
            onChange={handleChange}
            value={userProfile.firstName}
            label='First Name'
            name='firstName'
            fullWidth
            type='text'
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            onChange={handleChange}
            value={userProfile.lastName}
            label='Last Name'
            fullWidth
            type='text'
            name='lastName'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            onChange={handleChange}
            value={userProfile.email}
            type='email'
            name='email'
            fullWidth
            label='Email'
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            value={userProfile.gender}
            label='Gender'
            name='gender'
            id='gender'
            select
            fullWidth
          >
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            label='Country'
            value={userProfile.country}
            id='country'
            select
            fullWidth
            name='country'
          >
            {allCountries.map((country) => (
              <MenuItem value={country.name}>
                {countryToFlag(country.abbr)} {country.name} - <span>{country.code}</span>
              </MenuItem>
            ))}

            {/* <MenuItem value='mozambique'>Mozambique</MenuItem> */}
          </TextField>
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            value={userProfile.dayOfBirth}
            label='Date of Birth'
            id='date'
            select
            fullWidth
            name='dob'
          >
            <MenuItem value='nigeria'>Nigeria</MenuItem>
            <MenuItem value='mozambique'>Mozambique</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            value={userProfile.monthOfBirth}
            label='Month'
            id='month'
            select
            fullWidth
            name='mob'
          >
            <MenuItem value='nigeria'>Nigeria</MenuItem>
            <MenuItem value='mozambique'>Mozambique</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            value={userProfile.yearOfBirth}
            label='Year'
            id='year'
            select
            fullWidth
            name='yob'
          >
            <MenuItem value='nigeria'>Nigeria</MenuItem>
            <MenuItem value='mozambique'>Mozambique</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
