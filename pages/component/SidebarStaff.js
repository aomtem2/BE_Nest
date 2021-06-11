import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router'
import collapse from '../class/collapse'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Cookies from 'js-cookie'
import callService from '../function/axiosCall'

const { Sider } = Layout;

const SidebarStaff = () => {
    const serViceUrl = 'http://fc2924cd051c.ngrok.io/'
    const router = useRouter()
    const Swal = require('sweetalert2')

    const logout = async () => {
        const result = await Swal.fire({
            title: 'Do you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        })
        if (result.isConfirmed) {
            const res = await callService('POST', `${serViceUrl}allusers/logout`, { 'token': Cookies.get('cookie') }, {})
            Cookies.remove('cookie')
            Cookies.remove('role')
            Cookies.remove('pinStatus')
            console.log(res)
            router.push('/login')
        }

    }
    // collapse col = new collapse()
    // console.log(collapse.getCollapse)
    return (
        <Sider trigger={null} collapsible collapsed={collapse.getCollapse} className="sidebarLayout" width={250} >
            <div className="logo" />
            <div className="borT" />
            <Menu className='menuSidebar' mode="inline" defaultSelectedKeys={[router.pathname]}>
                <Menu.Item className='subMenuSidebar' key="/home" icon={<span className="iconify svgIcon" data-icon="fa-solid:home" data-inline="false"></span>} onClick={() => {
                    router.push('/home')
                }}>
                    <span className="textMenu">Home</span>
                </Menu.Item>
                <Menu.Item className='subMenuSidebar' key="/sendLeave" icon={<span className="iconify svgIcon" data-icon="mdi:email-newsletter" data-inline="false"></span>} onClick={() => {
                    router.push('/sendLeave')
                }}>
                    <span className="textMenu">Sendleave</span>
                </Menu.Item>
                <Menu.Item className='subMenuSidebar' key="/activity" icon={<span className="iconify svgIcon" data-icon="tabler:report" data-inline="false"></span>} onClick={() => {
                    router.push('/activity')
                }}>
                    <span className="textMenu">Activity</span>
                </Menu.Item>
                <Menu.Item className='subMenuSidebar' key="/profile" icon={<span className="iconify svgIcon" data-icon="carbon:user-avatar-filled" data-inline="false"></span>} onClick={() => {
                    router.push('/profile')
                }}>
                    <span className="textMenu">Profile</span>
                </Menu.Item>
                <Menu.Item className='subMenuSidebar' key="" icon={<span className="iconify svgIcon" data-icon="ls:logout" data-inline="false"></span>} onClick={() => {
                    logout()
                }}>
                    <span className="textMenu">Logout</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SidebarStaff;