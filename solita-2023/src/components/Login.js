import React, { useState } from 'react'
import { authentication } from '../controllers/Data';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  textField: {
    margin: theme.spacing(1),
    width: '300px',
  },
  loginButton: {
    margin: theme.spacing(2),
    width: '300px',
    backgroundColor: '#9c27b0',
    color: '#fff',
  },
}));

function Login() {
  const classes = useStyles();
  const [user, setUser] = useState()
  const [password, setPassword] = useState()

  async function login() {
    await authentication(user, password)
    .catch(console.error)
    .then(response=>{
      console.log(response)
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <TextField
          className={classes.textField}
          label="Username"
          variant="outlined"
          type="text"
          onChange={(event) => setUser(event.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button className={classes.loginButton} variant="contained" onClick={()=>{login()}} >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;