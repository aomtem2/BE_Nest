import React from 'react'
import 'antd/dist/antd.css';
import callService from '../../function/axiosCall'
import Cookies from 'js-cookie'
import Sidebar from '../../component/SidebarAdmin'
// import toggle from '../../component/sidebar'
import { Form, Input, InputNumber, Checkbox, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Layout, Button, Row, Col, message, Modal, Menu, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import {
    LockOutlined, MailOutlined, IdcardOutlined,
    UserOutlined, PhoneOutlined, EyeInvisibleOutlined,
    EyeTwoTone
} from '@ant-design/icons';
import Iconify from '@iconify/iconify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component';

const { Header, Sider, Content } = Layout;
export default function index() {
    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'


    const [collapsed, toggleCollapsed] = useState(false);
    const [datatable, setDatatable] = useState();
    const [loading, setLoading] = useState(true);
    const [listDepartment, setDepartment] = useState([]);

    const columns = [
        {
            name: 'เลขคำร้อง',
            selector: 'leaveId',
            sortable: true,
        },
        {
            name: 'ชื่อ-สกุล',
            selector: 'name',
            sortable: true,
        },

        {
            name: 'ฝ่าย',
            selector: 'department',
            sortable: true,
        },
        {
            name: 'แผนก',
            selector: 'position',
            sortable: true,
        },
        {
            name: 'สถานะคำร้อง',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'วันที่ปรับปรุงล่าสุด',
            selector: 'date',
            sortable: true,
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: '50px',
            sortable: false,
            cell: (record) => {
                return (
                    <a onClick={
                        () => { }
                    }
                    >
                        <span
                            className="iconify"
                            style={{ color: '#FF7A00' }}
                            data-icon="akar-icons:edit"
                            data-inline="false"
                            data-width="24" data-height="24">
                        </span>
                    </a >
                );
            },
        },
    ]




    useEffect(async () => {
        const resData = await callService('GET', `${serViceUrl}admin/getUserLeave`)
        const res = await callService('GET', `${serViceUrl}admin/lookup`)
        setDepartment(res.data.Department)
        let i = 0;
        console.log(resData.data.message)
        resData.data.message.forEach(element => {
            var date = new Date(resData.data.message[i].date);
            resData.data.message[i].date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes()
            i++
        });
        initialValue.firstName = "aom"
        console.log(resData.data.message)
        setDatatable(resData.data.message)
        setLoading(false)

    }, [])

    const initialValue = {
        firstName: '', age: '', newsletter: false, date: '', selectP: ''
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        age: Yup.number().required('Required'),
        newsletter: Yup.boolean().required('Required'),
        date: Yup.date().required('Required'),
        selectP: Yup.string().required('Required')
    });

    return (
        <Content
            className="sectionLayout"
        >
            <Skeleton loading={loading} active>
                <DataTable
                    className='dataTables_wrapper'
                    columns={columns}
                    data={datatable}
                    Clicked
                    pagination
                    responsive
                    sortIcon={<span className="iconify" data-icon="akar-icons:arrow-up-down" data-inline="false"></span>}
                    // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    noHeader={true}
                    persistTableHead
                // Selected={handleChange}
                />
                {/* <Formik
                    initialValues={initialValue}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        resetForm();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Input name='firstName' placeholder='First Name' />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}
                            <InputNumber name='age' min={0} />
                            {errors.age && touched.age ? (
                                <div>{errors.age}</div>
                            ) : null}
                            <Checkbox name='newsletter'>Newsletter</Checkbox>
                            {errors.newsletter && touched.newsletter ? <div>{errors.newsletter}</div> : null}
                            <DatePicker name='date' />
                            {errors.date && touched.date ? <div>{errors.date}</div> : null}
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                name='selectP'
                            >
                                {listDepartment.map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)}
                            </Select>
                            {errors.selectP && touched.selectP ? <div>{errors.selectP}</div> : null}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik> */}
            </Skeleton>
        </Content >
    )
}
