// 引入项目 logo 图片，用作左上角品牌入口。
import logo from '../../../assets/logo.png'
import { ClockCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from "../../../store/useTabsStore";
import { Popover, Space, } from 'antd';
import HeaderUserMenu from './HeaderUserMenu';
import './index.css';
import { useEffect, useState } from 'react';

// 格式化顶部时间：统一把 Date 转成“2026年6月25日 星期四 09:24:22”这种中文显示格式。
const formatCurrentTime = (date: Date) => {
    // 星期映射表：Date.getDay() 返回 0-6，对应周日到周六。
    const weekMap = ['日', '一', '二', '三', '四', '五', '六'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = weekMap[date.getDay()];
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}年${month}月${day}日 星期${week} ${hour}:${minute}:${second}`;
};

function Header() {
    const navigate = useNavigate();
    const setActive = useTabsStore((state) => state.setActive);
    const [currentTime, setCurrentTime] = useState(formatCurrentTime(new Date()));

    // 顶部时间每秒刷新一次，给后台系统一个明确的实时状态感。
    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentTime(formatCurrentTime(new Date()));
        }, 1000);

        // 组件卸载时清理定时器，避免页面切换后仍然后台运行造成内存泄漏。
        return () => window.clearInterval(timer);
    }, []);

    // 点击 logo 或首页按钮时同步更新标签激活态和路由，避免 URL 与 tab 状态不同步。
    const goHome = () => {
        setActive("home");
        navigate("/");
    };

    return <div className='header'>
        <a className="brand" onClick={goHome}>
            {/* logo 图片增加 alt，提升可访问性，也避免控制台提示。 */}
            <img className='logo' src={logo} alt="Knowvia" />
            <span className="brand-title">Knowvia</span>
        </a>

        <div className='header-right'>
            <Space size={12}>
                <button className="header-icon-btn" type="button" onClick={goHome}>
                    <HomeOutlined />
                    首页
                </button>

                <div className="header-time">
                    <ClockCircleOutlined />
                    <span>{currentTime}</span>
                </div>

                {/* 用户信息弹层：点击用户区域时显示退出登录等操作。 */}
                <Popover content={<HeaderUserMenu />} trigger="hover" placement="bottomRight">
                    <Space className="user">
                        <span className="user-avatar">
                            <UserOutlined />
                        </span>
                        {/* 用户文字信息：后续接真实接口时可以替换用户名和角色。 */}
                        <div className="user-meta">
                            <span className="user-name">用户名</span>
                            <span className="user-role">知识库管理员</span>
                        </div>
                    </Space>
                </Popover>
            </Space>
        </div>
    </div>
};

export default Header;
