import React, { useState } from 'react'
import { loginAPI } from '../apis'


function Login() {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPass, setIsShowPass] = useState(false)

  const handleLogin = async () => {
    if(!id || !password) return

    let res = await loginAPI(id, password)

    alert(JSON.stringify(res.data))

  }

  return (
    <div className='login-container col-10 col-sm-4'>
      <div className="title">Log in</div>
        <div className="text">Student ID</div>
        <input
          value={id}
          onChange={(event) => setId(event.target.value)} 
          type="text" 
          placeholder='Student ID...'
        />
        <div className='password-input'>
          <input 
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
            type={isShowPass ? "text" : "password"} 
            placeholder='Password...' 
          />
          <i 
            className= {isShowPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setIsShowPass(!isShowPass)}
          ></i>
        </div>
        <button 
          disabled={id && password ? false : true} 
          className={id && password ? "active" : ""}
          onClick={() => handleLogin()}
        >
          Login
        </button>

    </div>
  )
}

export default Login