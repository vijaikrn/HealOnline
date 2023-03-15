import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { authentication } from '../../Firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


function Register() {
  const countryCode = "+91"
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(countryCode)
  const [OTP, setOTP] = useState("")
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(OTP);
  }, [OTP])

  
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [countdown]);

  const onFinish = async (values) => {
    try {

      if (password !== confirmPassword) {
        toast("passwords do not match")
        console.log(confirmPassword);
        return
      }
      else {
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(OTP).then(async(result) => {
          const user = result.user
          dispatch(showLoading())
          const response =await axios.post('http://localhost:5000/api/user/register', values)
          dispatch(hideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to login page")
            navigate("/login")
          } else {
            toast.error(response.data.message)
          }
        }).catch((error) => {
          toast("error in otp")
        })

      }
    }
    catch (error) {
      toast.error("something went wrong")
    }


  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    console.log(confirmPassword);
    if (password !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const phonenumChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const generaterecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('re-container', {
      'size': 'invisible',
      'callback': (response) => {

      }
    }, authentication);
  }

  const requestOTP = (e) => {
    e.preventDefault()
    setCountdown(30);
   
    if (phoneNumber.length >= 12) {

      generaterecaptcha()
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error.message);
        });
    }
  }



  return (
    <div className='authentication'>

      <div className='authentication-form card p-2'>
        <h1 className='card-title'>HEAL-ONLINE</h1>

        <Form layout='vertical' onFinish={onFinish} >

          <Form.Item label="Name" name="name">
            <Input className='login-input' placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email">

            <Input className='login-input ' placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input className='login-input' placeholder='Password' value={password} onChange={handlePasswordChange} type='password' />
          </Form.Item>
          <Form.Item label="Confirm Password" name="cpassword">
            <Input className='login-input' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} type='password' />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form.Item>
          <Form.Item label="Mobile Number" name="mobile" >


            <Input className='login-input ' placeholder='Enter Mobile Number' value={phoneNumber} onChange={phonenumChange} />

          </Form.Item>
          {countdown===0 ?
          (<Button className='otp-button mt-2 '  onClick={requestOTP} size='middle'>Get OTP</Button>)
          :


          (<Button className='otp-button mt-2 '  disabled size='middle'>`Wait for {countdown} sec```</Button>)}
        
          <input type="text" style={{ marginLeft: "1rem" }} placeholder='Enter OTP' value={OTP} onChange={(e) => setOTP(e.target.value)} />

          <div id='re-container'></div>




          <Button className='primary-button mt-3 mb-3' htmlType='submit'>REGISTER</Button>
          <Link to='/login' style={{ marginLeft: '1rem' }} className='anchor'>Click here to Login</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register