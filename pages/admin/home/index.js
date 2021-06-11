import React from 'react'
import 'antd/dist/antd.css';
import callService from '../../function/axiosCall'
import Cookies from 'js-cookie'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Layout, Input, Button, Row, Col, message, Form, Modal, DatePicker, Select, Menu, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import {
    LockOutlined, MailOutlined, IdcardOutlined,
    UserOutlined, PhoneOutlined, EyeInvisibleOutlined,
    EyeTwoTone
} from '@ant-design/icons';
import Iconify from '@iconify/iconify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DataTable from 'react-data-table-component';

const { Header, Sider, Content } = Layout;

export default function index() {
    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'


    const [datatable, setDatatable] = useState();
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            name: 'เลขที่คำร้อง',
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
            name: 'สถานะคำร้อง',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'วันที่ปรับปรุงล่าสุด',
            selector: 'date',
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: '100px',
            sortable: false,
            cell: (record) => {
                return (
                    <a onClick={
                        () => { }
                    }
                    >
                        <span
                            className="iconify"
                            data-icon="ion:search-circle"
                            data-inline="false"
                            data-width="30" data-height="30">
                        </span>
                    </a >
                );
            },
        },
    ];

    useEffect(async () => {
        const resData = await callService('GET', `${serViceUrl}admin/getUserLeave`)
        // console.log(resData.data.message)
        let i = 0;
        resData.data.message.forEach(element => {
            var date = new Date(resData.data.message[i].date);
            resData.data.message[i].date = date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            i++
        });
        setDatatable(resData.data.message)
        setLoading(false)

    }, [])

    return (
        <Content
            className="sectionLayout"
        >
            <Skeleton loading={loading} active>
                {/* <br /><br /><br /> */}
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
            </Skeleton>
        </Content>
    )
}
