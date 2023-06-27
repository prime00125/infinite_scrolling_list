import React,{useState} from 'react'
import '../Component/LoginPageCs.css'
import {useNavigate} from 'react-router-dom'
import Home from '../Component/Home'


function LoginPage() {
 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const nav=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
  
    try {
      if (username === 'foo' && password === 'bar'){
        setIsLoggedIn(true);
        console.log(username);
         console.log(password);
         nav('/Home');
      } else {
        setIsLoggedIn(false);
        console.log("login error");
        throw new Error('Invalid username or password');
       
        
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  



  return(
    <div id="LoginPageBody">
        <h3 id="heading">Welcome back !</h3>
        <form onSubmit={handleLogin}>
            <div id="backGround1"></div>
            <div id="backGround2"></div>
            <label class="LOGLABEL">USERNAME
                <input class="LOGINPUT"type="text" value={username} placeholder='username'  onChange={e => setUsername(e.target.value)}/>
            </label>
            <label class="LOGLABEL">PASSWORD
                <input class="LOGINPUT"type="password" value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="submit" id="LoginBtn" >Login</button>
         {loginError && <p>{loginError}</p>}

        </form>
    </div>
  )
}

export default React.memo(LoginPage)