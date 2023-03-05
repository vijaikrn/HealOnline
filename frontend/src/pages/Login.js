import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/alertSlice'



function Login() {
  const { loading } = useSelector(state => state.alerts)
  const dispatch = useDispatch()
  console.log(loading);
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("http://localhost:5000/api/user/login", values)
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirecting to home page")
        localStorage.setItem("token", response.data.data)
        navigate("/")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }

  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-2'>
        <h1 className='card-title'>HEAL-ONLINE</h1>
        <Form layout='vertical' onFinish={onFinish}>


          <Form.Item  label="Email" name="email">
            <Input className='login-input' placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input className='login-input' placeholder='Password' type='password' />
          </Form.Item>
          <Button className='primary-button mt-3 mb-3' htmlType='submit'>LOG-IN</Button>
          <Link to='/register' className='anchor'>Click here to Register</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login