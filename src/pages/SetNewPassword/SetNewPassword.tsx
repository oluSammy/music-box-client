import React, {useState ,MouseEvent} from 'react';
import setPasswordStyles from './SetNewPassword.module.css';
import axios from 'axios';

const SetNewPassword = () => {
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const resetPassword = async(e:MouseEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const {data} = await axios.put(`https://music-box-b.herokuapp.com/api/v1/music-box-api/users/resetPassword`, {password}, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGM4MzFhOWY3ZTllMDAxNTRkYmZlNiIsImlhdCI6MTYyNTE3MTg4NSwiZXhwIjoxNjI1MzQ0Njg1fQ.ZbD1cQa1kwyWLXdGwvYRUllPdkUtnAWSXglttSHjrik`,
            },
        }
        // if(password !== confirmPassword){
        //     console.log('passwords do not match')
        // }
        )
        // setConfirmPassword('');
        setPassword('');
        console.log(data)
    }
    return (
        <div className={setPasswordStyles.resetBody}>
      <div className={setPasswordStyles.formCard}>
        <form onSubmit={resetPassword}>
          <div className={setPasswordStyles.header}>
              <h1>Reset Password</h1>
          </div>
          <div className={setPasswordStyles.formGroup}>
            <label>New Password</label>
            <input type='password' id='new-password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <div className={setPasswordStyles.formGroup}>
            <label>Confirm Password</label>
            <input type='password' id='confirm-password' name='password' required />
          </div>
          <div className={setPasswordStyles.formGroup}>
            <button type='submit'>confirm</button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default SetNewPassword
