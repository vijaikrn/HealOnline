import { Col, Form, Input, Row, TimePicker } from 'antd'

import React from 'react'
import Layout from '../components/Layout'


function ApplyDoctor() {
    return (
        <Layout>
            <h1 className='page-title'>Apply for providing service as Doctor</h1>
            <hr />
            <Form layout='vertical' style={{ paddingLeft: '20px' }}>
                <h4>General Info</h4>
                <Row gutter={20} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <Col style={{ display: 'inline-block' }} span={24} xs={24} sm={24} lg={8} >
                        <Form.Item style={{ display: 'inline-block' }} label='First Name' name='firstName' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Last Name' name='lastName' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Last Name' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Phone' name='phoneNumber' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Mobile Number' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='E-mail' name='email' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Email address' />
                        </Form.Item>
                    </Col>


                </Row>
                <hr />
                <h4>Professional Info</h4>
                <Row gutter={20} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <Col style={{ display: 'inline-block' }} span={24} xs={24} sm={24} lg={8} >
                        <Form.Item style={{ display: 'inline-block' }} label='Doctor License Number' name='licenseNumber' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Enter your doctor license number' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Specialization' name='specialization' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Specialization' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Experience' name='experience' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Enter your experience details' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Fee Per Consultation' name='fee' rules={[{ required: true }]}>
                            <Input type="text" style={{ width: '300px' }} placeholder='Enter the fee per consultation' />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'inline-block' }} span={8} xs={24} sm={24} lg={8}>
                        <Form.Item style={{ display: 'inline-block' }} label='Timings' name='fee' rules={[{ required: true }]}>
                        <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>
                    
                   
                  
                  

                </Row>
               
            </Form>
        </Layout>
    )
}

export default ApplyDoctor