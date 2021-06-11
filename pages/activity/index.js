import React from 'react'
import 'antd/dist/antd.css';
import callService from '../function/axiosCall'
import Cookies, { get } from 'js-cookie'
import { Layout, Button, Row, Col, message, Modal, Menu, Card, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import Iconify from '@iconify/iconify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DataTable from 'react-data-table-component';

const { Content } = Layout;

export default function index() {
    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'


    const [datatable, setDatatable] = useState();
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            name: 'ลำดับที่',
            selector: 'number',
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
            selector: 'comment',
            conditionalCellStyles: [{
                when: row => row.comment == "สำเร็จ",
                style: {
                    color: '#539C40',
                }
            }, {
                when: row => row.comment == "ไม่สำเร็จ",
                style: {
                    color: '#FF0000',
                }
            }]
        },
        {
            name: 'วันที่',
            selector: 'time',
        },
    ];

    useEffect(async () => {
        const resData = await callService('POST', `${serViceUrl}allusers/getLogId`, { token: Cookies.get('cookie'), })
        console.log(resData.data.user)
        let i = 0;
        resData.data.user.forEach(element => {
            var date = new Date(resData.data.user[i].time);
            resData.data.user[i].time = date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            i++
        });
        setDatatable(resData.data.user)
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
