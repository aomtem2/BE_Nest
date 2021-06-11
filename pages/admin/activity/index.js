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
            name: 'ตำแหน่ง',
            selector: 'position',
            sortable: true,
        },
        {
            name: 'ประเภท',
            selector: 'category',
        },
        {
            name: 'เลขที่คำร้อง',
            selector: 'leaveId',
        },
        {
            name: 'สถานะ',
            selector: 'status',
            conditionalCellStyles: [{
                when: row => row.status == "สำเร็จ",
                style: {
                    color: '#539C40',
                }
            }, {
                when: row => row.status == "ไม่สำเร็จ",
                style: {
                    color: '#FF0000',
                }
            }]
        },
        {
            name: 'วันที่',
            selector: 'date',
        },

    ];

    useEffect(async () => {
        const resData = await callService('POST', `${serViceUrl}admin/getLogAll`, { token: Cookies.get('cookie'), })
        console.log(resData.data.Arr)
        let i = 0;
        resData.data.Arr.forEach(element => {
            var date = new Date(resData.data.Arr[i].date);
            resData.data.Arr[i].date = date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            i++
        });
        setDatatable(resData.data.Arr)
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
                    noHeader={true}
                    persistTableHead
                // Selected={handleChange}
                />
            </Skeleton>
        </Content>
    )
}
