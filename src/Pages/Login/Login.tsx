import { Button, Checkbox, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useState } from 'react'
import axios from 'axios';
import qs from 'qs';
import './Login.css'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Login() {

  interface LoginData {
    Email: string,
    Password: string,
    token: string
  }

  interface DecodedData {
    AdminStatus: number
  }

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const userAuth = () => {

    let data = qs.stringify({
      Email: userLogin,
      Password: userPassword
    })

    const authorization = axios.post<LoginData>(process.env.REACT_APP_API_URL + '/api/v1/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })

    authorization.then((response) => {
      if (response.data.token) {

        var decoded = jwt_decode<DecodedData>(response.data.token);

        if (decoded.AdminStatus !== 0) {
          window.localStorage.setItem('token', response.data.token)
          navigate('/admin')
        } else {
          setAuthError('Error! You are not admin')
        }
      }
    }
    ).catch((error) => {
      setAuthError(error.response.data)
    })

  }

  const fieldsValidation = (): boolean => {

    let isValid = true;

    /* EMAIL VALIDATE */

    let regExpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!userLogin.match(regExpEmail)) {
      setAuthError('Error! Email is not valid')
      isValid = false
    }

    /* PASSWORD VALDATE */

    if (userPassword.length < 6) {
      setAuthError('Error! Password is too short')
      isValid = false
    }

    return isValid
  }

  return (
    <section className='loginPage'>
      <div className="loginWindow w-[90vw] md:w-full">
        <div className='inputRow'>
          <Label htmlFor="email1" value="Your email" />
          <TextInput
            placeholder="name@example.com"
            required type="email"
            onChange={e => setUserLogin(e.target.value)} />
        </div>
        <div className='inputRow'>
          <Label htmlFor="password" value="Your password" />
          <TextInput id="password" required type="password" onChange={e => setUserPassword(e.target.value)} />
        </div>
        <div className="authRememberBlock">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button color="dark" className={'bg-red duration-300'} onClick={() => fieldsValidation() && userAuth()}>Login</Button>

        {
          authError.length > 0
            ? <Alert
              color="failure"
              icon={HiInformationCircle}
            >{authError}</Alert>
            : null
        }

      </div>
    </section>
  )
}

export default Login