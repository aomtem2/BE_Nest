import React from 'react'
import 'antd/dist/antd.css';
import callService from '../../function/axiosCall'
import Sidebar from '../../component/SidebarAdmin'
import Cookies from 'js-cookie'
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, InputNumber, Checkbox, DatePicker, Select, Radio } from 'formik-antd'
import { Layout, Button, Row, Col, message, Modal, Menu } from 'antd';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Iconify from '@iconify/iconify';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

export default function index() {
    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'
    const phone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [listUser, setUser] = useState([{}]);
    const [totalDay, setTotalDay] = useState('0');
    const [list, setList] = useState([]);

    useEffect(async () => {
        const res = await callService('GET', `${serViceUrl}admin/getAllUserProfile`)
        // res

        console.log(res.data.message)
        setList(res.data.message)
    }, [])

    const handleChange = (key, e) => {
        console.log(list[key])
        setUser({
            name: list[key].name,
            staffId: list[key].staffId,
            position: list[key].position,
            department: list[key].department,
            phone: list[key].phone
        })
        // console.log(listUser)
        // console.log('test')
        // console.log(initialValueAddLeave)
    }

    const setTotal = (hours) => {
        if (hours >= 4 && hours < 8) {
            console.log('1')
            // setTotalDay('1')
            // setTotalDay('1 วัน')
        }
        else if (hours > 8) {
            console.log(hours / 8)
            // setTotalDay('ครึ่งวัน')
        }
    }



    const initialValueAddLeave = {
        name: listUser.name,
        staffId: listUser.staffId,
        position: listUser.position,
        department: listUser.department,
        location: 'สินวัฒนา คราวด์ฟันดิง',
        phone: listUser.phone,
        typeLeave: '',
        dateLeave: '',
        total: totalDay,
        reason: '',
        date: '',
        status: '',
        reasonAdmin: '',
        dateApproved: '',
        record: '',
        comment: '',
        pin: ''
    }

    const addLeaveSchema = Yup.object().shape({
        name: Yup.string().required('* Name is required'),
        staffId: Yup.string().required('* StaffId is required'),
        position: Yup.string().required('* Position is required'),
        department: Yup.string().required('* Department is required'),
        location: Yup.string().required('* Location is required'),
        phone: Yup.string().length(10, '* Must be exactly 10 digits').matches(phone, 'Phone number is not valid').required('* phonenumber is required'),
        // typeLeave: Yup.string().required('* Type of Leave is required'),
        dateLeave: Yup.date().required('* Date is required'),
        reason: Yup.string().required('* Reason is required'),
        date: Yup.date().required('* Date is required'),
        status: Yup.string().required('* Response is required'),
        reasonAdmin: Yup.string().required('* Reason is required'),
        dateApproved: Yup.date().required('* Date is required'),
        record: Yup.string().required('* Record is required'),
        comment: Yup.string().required('* Comment is required'),
        pin: Yup.string().required('* Pin is required'),
    });

    return (

        <Content className="sectionLayout fontPromt">
            {/* <span>{JSON.stringify(listUser[0].profileId)}</span> */}
            <Formik
                enableReinitialize
                initialValues={initialValueAddLeave}
                validationSchema={addLeaveSchema}
                onSubmit={async (values, { resetForm }) => {
                    console.log(values);
                    // values.startingDate = values.startingDate.toString()
                    // const res = await callService('POST', `${serViceUrl}admin/addLeave`, {
                    //     name: values.name,
                    //     staffId: values.staffId,
                    //     position: values.position,
                    //     department: values.department,
                    //     location: values.location,
                    //     phone: values.phone,
                    //     typeLeave: values.typeLeave[0],
                    //     dateLeave: values.dateLeave.toString(),
                    //     reason: values.reason,
                    //     date: values.date.toString(),
                    //     status: values.status[0],
                    //     reasonAdmin: values.reasonAdmin,
                    //     dateApproved: values.dateApproved.toString(),
                    //     record: values.record,
                    //     comment: values.comment,
                    //     pin: values.pin
                    // }, {})
                    // console.log(res);
                    // resetForm();
                    // if (res.data.message == "Add User Success") {
                    //     await Swal.fire({
                    //         icon: 'success',
                    //         title: 'Add User Success',
                    //         timer: 1500
                    //     })
                    //     resetForm();
                    //     setStatusReload(!statusReload)
                    //     console.log(statusReload);
                    //     handleAddUserCancel()
                    // }
                    // else {
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: res.data.message,
                    //         timer: 1500
                    //     })
                    // }
                    // console.log(res.data.message);
                }}
            >
                {({ errors, touched }) => (
                    <Form>

                        <Row>
                            <Col span={12}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label>ชื่อ/Name</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <Select
                                            showSearch
                                            className='inputBox'
                                            id="name"
                                            name="name"
                                            type="text"
                                            onSelect={(key, event) => handleChange(key, event)}
                                            style={{ fontSize: '16px' }}
                                            placeholder="Select Name">
                                            {list.map(value => <Select.Option key={value.number} value={value.number}>{value.name}</Select.Option>)}
                                        </Select>
                                        {touched.name && errors.name ? (
                                            <div className="errorMsg">{errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label>รหัสประจำตัว/StaffId</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <Input
                                            className='inputBox'
                                            id="staffId"
                                            name="staffId"
                                            type="text"
                                            disabled />
                                        {touched.staffId && errors.staffId ? (
                                            <div className="errorMsg">{errors.staffId}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label >ตำแหน่ง/Position</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <Input
                                            className='inputBox'
                                            id="position"
                                            name="position"
                                            type="text"
                                            disabled />
                                        {touched.position && errors.position ? (
                                            <div className="errorMsg">{errors.position}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label >ฝ่าย/Department</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <Input
                                            className='inputBox'
                                            id="department"
                                            name="department"
                                            type="text"
                                            disabled />
                                        {touched.department && errors.department ? (
                                            <div className="errorMsg">{errors.department}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >หน่วยงาน/Location</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="location"
                                    type="text"
                                    disabled />
                                {touched.location && errors.location ? (
                                    <div className="errorMsg">{errors.location}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >หมายเลขติดต่อระหว่างการลา/Contact number during leave</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="phone"
                                    type="text"
                                    disabled
                                />
                                {touched.phone && errors.phone ? (
                                    <div className="errorMsg">{errors.phone}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >ประเภทการลา/Type of leave</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                {/* <Checkbox.Group
                                    options={plainOptions}
                                    name="typeLeave"
                                /> */}
                                <Radio.Group name='typeLeave'>
                                    <Radio name='typeLeave' value='ลาป่วย'>ลาป่วย/Sick leave</Radio>
                                    <Radio name='typeLeave' value='ลาพักร้อน'>ลาพักร้อน/Annual leave</Radio>
                                    <Radio name='typeLeave' value='ลากิจ'>ลากิจ/Business leave</Radio>
                                    <Radio name='typeLeave' value='ลาโดยไม่รับค่าจ้าง'>ลาโดยไม่รับค่าจ้าง/Leave without pay</Radio>
                                    <Radio name='typeLeave' value='ลาหยุดทดแทน'>ลาหยุดทดแทน/Off in lieu</Radio>
                                </Radio.Group>
                                {touched.typeLeave && errors.typeLeave ? (
                                    <div className="errorMsg">{errors.typeLeave}</div>
                                ) : null}
                            </div>
                        </div>

                        <Row>
                            <Col span={15}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label >วันที่/Date</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <RangePicker
                                            showTime
                                            name="dateLeave"
                                            format="YYYY-MM-DD HH:mm"
                                            onChange={(val, date) => {
                                                var a = new Date(date[0]);
                                                var b = new Date(date[1]);
                                                var total = (b.getTime() - a.getTime()) / 3.6e+6
                                                setTotal(total)
                                            }}
                                        />
                                        {touched.dateLeave && errors.dateLeave ? (
                                            <div className="errorMsg">{errors.dateLeave}</div>
                                        ) : null}
                                    </div>
                                </div>

                            </Col>
                            <Col span={9}>
                                <div className='ant-row ant-form-item formCustom row0' >
                                    <div className="ant-col ant-form-item-label">
                                        <label >รวม/Total</label>
                                    </div>
                                    <div className="ant-col ant-form-item-control">
                                        <Input className='inputBox' name="total" disabled />

                                        {/* {touched.dateLeave && errors.dateLeave ? (
                                            <div className="errorMsg">{errors.dateLeave}</div>
                                        ) : null} */}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >เหตุผล Reason</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="reason"
                                    type="text"
                                />
                                {touched.reason && errors.reason ? (
                                    <div className="errorMsg">{errors.reason}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >วันที่/Date</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <DatePicker
                                    className='inputBox'
                                    id='date'
                                    name='date'
                                />
                                {touched.date && errors.date ? (
                                    <div className="errorMsg">{errors.date}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >การตอบรับ/response</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                {/* <Checkbox.Group
                                    options={approve}
                                    name="status"
                                /> */}
                                <Radio.Group name='status'>
                                    <Radio name='status' value='อนุมัติ'>อนุมัติ/Approved</Radio>
                                    <Radio name='status' value='ไม่อนุมัติ'>ไม่อนุมัติ/Not approved</Radio>
                                </Radio.Group>
                                {touched.status && errors.status ? (
                                    <div className="errorMsg">{errors.status}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >เหตุผล/Reason</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="reasonAdmin"
                                    type="text"
                                />
                                {touched.reasonAdmin && errors.reasonAdmin ? (
                                    <div className="errorMsg">{errors.reasonAdmin}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >วันที่/Date</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <DatePicker
                                    className='inputBox'
                                    name='dateApproved'
                                />
                                {touched.dateApproved && errors.dateApproved ? (
                                    <div className="errorMsg">{errors.dateApproved}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >บันทึกการลา/Record</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="record"
                                    type="text"
                                />
                                {touched.record && errors.record ? (
                                    <div className="errorMsg">{errors.record}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >ข้อคิดเห็น/Comment</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='longInputBox'
                                    name="comment"
                                    type="text"
                                />
                                {touched.comment && errors.comment ? (
                                    <div className="errorMsg">{errors.comment}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='ant-row ant-form-item formCustom row0' >
                            <div className="ant-col ant-form-item-label">
                                <label >รหัสลับ/PIN</label>
                            </div>
                            <div className="ant-col ant-form-item-control">
                                <Input
                                    className='inputBox'
                                    name="pin"
                                    type="text"
                                />
                                {touched.pin && errors.pin ? (
                                    <div className="errorMsg">{errors.pin}</div>
                                ) : null}
                            </div>
                        </div>

                        <Button htmlType="submit" className='submitBtn' type="primary" block>Submit</Button>
                    </Form>
                )}
            </Formik>
        </Content>
    )
}
