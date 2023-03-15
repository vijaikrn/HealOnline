import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { hideLoading, showLoading } from '../../redux/alertSlice'




function ApplyDoctor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { doctor } = useSelector((state) => state.doctor)

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5000/api/doctor/apply-doctor-account', { ...values }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/doctor/home')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
  }


  return (
    <div>
      <div className='doctorapplication-header'> <h1 className="doc-app-title" >Doctor Service Application</h1></div>


      <Form layout='vertical' onFinish={onFinish} style={{ paddingLeft: '20px' }}>
        <h1 className="card-title mt-3">General Info</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Name"
              name="name"

            >
              <Input placeholder={doctor?.name} disabled />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="mobile"

            >
              <Input placeholder={doctor?.mobile} disabled />
            </Form.Item>
          </Col>


        </Row>
        <hr />
        <h1 className="card-title mt-3">Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Doctor License Number"
              name="licenseNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="License Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" type="number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Fee Per Consultation"
              name="fee"
              rules={[{ required: true }]}
            >
              <Input placeholder="Fee Per Cunsultation" type="number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-center">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ApplyDoctor