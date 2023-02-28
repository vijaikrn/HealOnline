import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Button, Form,Input } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'


function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async(values) => {
   try{
    dispatch(showLoading())
const response = await axios.post('http://localhost:5000/api/user/register', values)
dispatch(hideLoading())
if(response.data.success){
toast.success(response.data.message)
toast("Redirecting to login page")
navigate("/login")
}else{
toast.error(response.data.message)
}
   }catch(error){
toast.error("something went wrong")
   }
  };
  return (
    <div className='authentication'>
<div className='authentication-form card p-2'>
<h1 className='card-title'>HEAL-ONLINE</h1>
<Form layout='vertical'onFinish={onFinish}>

<Form.Item label="Name" name="name">
  <Input className='login-input'  placeholder='Name'/>
  </Form.Item>
  <Form.Item label="Email" name="email">
  <Input className='login-input' placeholder='Email'/>
  </Form.Item>
  <Form.Item label="Password" name="password">
  <Input className='login-input' placeholder='Password' type='password'/>
  </Form.Item>
<Button className='primary-button mt-3 mb-3' htmlType='submit'>REGISTER</Button>
<Link to='/login' className='anchor'>Click here to Login</Link>
</Form>
</div>
    </div>
  )
}

export default Register