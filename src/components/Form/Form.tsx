import { Grid, TextField, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { allCountries, countryToFlag } from '../../utils/country';
import { months } from '../../utils/validateDate';
import axios from 'axios';

interface UserProfile {
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    dayOfBirth: string,
    monthOfBirth: string,
    yearOfBirth: string,
    country: string,
}

const Form: React.FC = () => {
  // State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    country: '',
  });
  const [users, setUsers] = useState({});

  // Event Handlers
  const handleChange = (event: { target: Record<string, any> }) => {
    const { name, value } = event.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      setUsers(userProfile);
      const userToken = localStorage.getItem('Token');
      const userId = localStorage.getItem('userId');
      const { 
        dayOfBirth, 
        monthOfBirth, 
    	yearOfBirth, 
        email, 
        firstName, 
        lastName, 
        gender 
      } = users as Record<string, any>;
      let date = new Date(yearOfBirth,monthOfBirth,dayOfBirth).toLocaleDateString();
	  date = date.split('/').reverse().join('/');
      console.log(typeof date);
      const newUser = { email, firstName, lastName, gender, date };

      await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/users/profile/${userId}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log('User profile modified');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onBlur={handleUpdate}>
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
            <MenuItem value={'M'}>Male</MenuItem>
            <MenuItem value={'F'}>Female</MenuItem>
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
            SelectProps={{
              multiple: true,
              value: []
            }}
          >
            {allCountries.map((country, idx) => (
              <MenuItem value={country.name} key={idx}>
                {countryToFlag(country.abbr)} {country.name} - <span>{country.code}</span>
              </MenuItem>
            ))}

          </TextField>
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            onChange={handleChange}
            className='text-field'
            value={userProfile.dayOfBirth}
            label='Day of Birth'
            id='date'
            select
            fullWidth
            name='dayOfBirth'
          >
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
            name='monthOfBirth'
          >
              {months.map((month, idx) => <MenuItem value='nigeria' key={idx}>{month}</MenuItem>)}
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
            name='yearOfBirth'
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
