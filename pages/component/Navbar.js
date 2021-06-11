import { Layout } from 'antd';
const { Header } = Layout;
const Navbar = () => {
    return (
        <Header className="headerColor" >
            <a onClick={() => {
                toggleCollapsed(true)
            }}><span className="iconify collapseIcon" data-icon="bytesize:menu" data-inline="false"></span></a>
        </Header>
    )
}

export default Navbar;