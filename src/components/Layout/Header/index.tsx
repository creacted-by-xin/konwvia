import logo from '../../../assets/logo.png'
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from "../../../store/useTabsStore";
import {  Popover, Space, } from 'antd';
import HeaderUserMenu from './HeaderUserMenu';
import './index.css';

function Header() {
    const navigate = useNavigate();
    const setActive = useTabsStore((state) => state.setActive);

    const goHome = () => {
        setActive("home");
        navigate("/");
    };

    return <div className='header'>
        <a onClick={goHome}>
            <img className='logo' src={logo}></img>
        </a>
        <div className='header-right'>
            <Space>
                <div>时间</div>
            <Popover content={<HeaderUserMenu/>}>
                <Space className="user">
                    <UserOutlined />
                    <div>用户名</div>
                </Space>
            </Popover>
            </Space>
        </div>
    </div>
};

export default Header;