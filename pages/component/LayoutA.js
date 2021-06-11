import { Layout, Spin } from 'antd';
import Navbar from './Navbar';
import { useRouter } from 'next/router'
import SidebarA from './SidebarAdmin';
import SidebarSt from './SidebarStaff';
import SidebarHr from './SidebarHr';
import SidebarSu from './SidebarSupervisor';
import Cookies from 'js-cookie'
const { Header, Sider, Content } = Layout;
const LayoutA = ({ children }) => {
    let i = 0
    const router = useRouter()
    const noSide = ["/login", "/setPin"]
    const list = ["/admin/home", "/admin/leaveManagement", "/admin/userManagement", "/admin/addOldRecord", "/admin/activity", "sendLeave", "/home", "/login", "/setPin", "/sendLeave","/activity"]

    return (
        <Layout className="fontConcert">
            <link href="http://fonts.cdnfonts.com/css/concert-one" rel="stylesheet" />
            {!noSide.includes(router.pathname) && list.includes(router.pathname) && Cookies.get('role') == 'Administrator' ? <SidebarA></SidebarA> : ''}
            {!noSide.includes(router.pathname) && list.includes(router.pathname) && Cookies.get('role') == 'Staff' ? <SidebarSt></SidebarSt> : ''}
            {!noSide.includes(router.pathname) && list.includes(router.pathname) && Cookies.get('role') == 'HrAdministrator' ? <SidebarHr></SidebarHr> : ''}
            {!noSide.includes(router.pathname) && list.includes(router.pathname) && Cookies.get('role') == 'Supervisor' ? <SidebarSu></SidebarSu> : ''}
            <Layout>
                {!noSide.includes(router.pathname) && list.indexOf(router.pathname) > -1 ? <Navbar></Navbar> : ''}
                {children}
            </Layout>
        </Layout>
    )
}

export default LayoutA;