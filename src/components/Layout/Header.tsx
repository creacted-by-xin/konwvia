import logo from '../../assets/logo.png';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from "../../store/useTabsStore";

import './index.css'

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
            <div>时间</div>
            <div className="user">
                <UserOutlined />
                用户名
            </div>
        </div>
    </div>
};

export default Header;