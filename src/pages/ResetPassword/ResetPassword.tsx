import React, {useState, MouseEvent} from 'react';
import resetPasswordStyles from './ResetPassword.module.css';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const requestReset = async(e:MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data} = await axios.post(`https://music-box-b.herokuapp.com/api/v1/music-box-api/users/requestPasswordReset`, {email}, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGM4MzFhOWY3ZTllMDAxNTRkYmZlNiIsImlhdCI6MTYyNTA2NDIxOSwiZXhwIjoxNjI1MjM3MDE5fQ.eO7ceQIMMQWkT35dGk5WZl2evwdl5h57G3Hi4jVmkvE`,
            },
        }
        )
        setEmail('');
        console.log(data.status)
        if(data.status === "successful"){
            console.log("successful! check your email for reset password link")
        }else{
            console.log("error o")
        }
    }
  return (
    <div className={resetPasswordStyles.resetBody}>
      <div className={resetPasswordStyles.formCard}>
        <form onSubmit={requestReset}>
          <div className={resetPasswordStyles.header}>
              <h1>Forgot Password</h1>
          </div>
          <div className={resetPasswordStyles.formGroup}>
            <label>Email</label>
            <input type='email' id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className={resetPasswordStyles.formGroup}>
            <button type='submit' >reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
