import logo from '../../assets/logo.png';
import {UserOutlined } from '@ant-design/icons';
import './index.css'

function Header() {
    return <div className='header'>
        <a>
            <img className='logo' src={logo}></img>
        </a>
        <div className='header-right'>
            <div>时间</div>
            <div className="user">
                <UserOutlined />
                用户名
            </div>
        </div>
    </div>
};

export default Header;