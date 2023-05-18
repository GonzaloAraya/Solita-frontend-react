import React, { useEffect, useState } from 'react'
import { authentication } from '../controllers/Data';

const Login = () => {
  
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
    <div className="Login">
        <h1>Login</h1>
        <div>
          <input type="text" onChange={(event) => setUser(event.target.value)} /> <br></br>
          <input type="password" onChange={(event) => setPassword(event.target.value)} /> <br></br>
          <button onClick={()=>{login()}}>Login</button>
        </div>
    </div>
  );
}

export default Login;
