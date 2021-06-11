import React from 'react'
import 'antd/dist/antd.css';
import callService from '../../pages/function/axiosCall'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, } from 'formik-antd'
import { Layout, Button, Row, Col, Image, message } from 'antd';
import { useState, useEffect } from 'react';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Content } = Layout;

export default function index() {

    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'

    const router = useRouter()

    const initialValueLogin = {
        email: '',
        password: ''
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('* email is required'),
        password: Yup.string().required('* password is required')
    });
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <Content >
            <Row className='page' >
                <Col className="loginLeft" span={12}>
                    <Image className='logoSize' src="/sinwattana-crowdfunding-logo.png" alt="Logo" />
                    <h1 className="systemName">On leave System
                        for Sinwattana
                        Crowdfunding</h1>
                </Col>
                <Col className="loginRight" span={12}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValueLogin}
                        validationSchema={loginSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            // console.log(values);
                            const res = await callService('POST', `${serViceUrl}allusers/login`, {
                                email: values.email,
                                password: values.password,
                            })
                            console.log(res)
                            if (res.data.message == "Login Success") {
                                message.success('Login success!!');
                                Cookies.set('cookie', res.data.token, { expires: 7, path: '' });
                                Cookies.set('pinStatus', res.data.pinStatus, { expires: 7, path: '' });
                                Cookies.set('role', res.data.role, { expires: 7, path: '' });
                                if (Cookies.get('pinStatus') == "False") {
                                    router.push('/setPin')
                                }
                                else {
                                    if (res.data.role == 'Administrator')
                                        router.push('/admin/home')
                                    else
                                        router.push('/home')

                                }

                            }
                            else {
                                message.error('User or password is wrong');
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form >
                                <h1 className='loginText center'>Login</h1>

                                <Input
                                    className='inputForm fontConcert'
                                    id="email"
                                    name="email"
                                    type="email"
                                    prefix={<MailOutlined className="site-form-item-icon"
                                        style={{ fontSize: '16px', color: '#c1c1c1' }} />}
                                    placeholder="Email"
                                />
                                {touched.email && errors.email ? (
                                    <div className="errorMsg">{errors.email}</div>
                                ) : null}

                                <Input.Password
                                    className='inputForm fontConcert'
                                    id="password"
                                    name="password"
                                    type="password"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    prefix={<LockOutlined className="site-form-item-icon"
                                        style={{ fontSize: '16px', color: '#c1c1c1' }} />}
                                    placeholder="Password"
                                    autoComplete="on"
                                />
                                {touched.password && errors.password ? (
                                    <div className="errorMsg">{errors.password}</div>
                                ) : null}

                                <Button type="primary" htmlType="submit" className="login-form-button loginBtn" style={{ background: 'rgba(0, 161, 155, 0.8)', borderColor: 'rgba(0, 161, 155, 0.8)' }} block>
                                    Log in
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Content >
    )
}
