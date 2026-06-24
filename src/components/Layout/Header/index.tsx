// 引入项目 logo 图片，用作左上角品牌入口。
import logo from '../../../assets/logo.png'
import { ClockCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useTabsStore } from "../../../store/useTabsStore";
// Button 是首页快捷按钮，Popover 是用户菜单弹层，Space 用来控制元素间距。
import { Button, Popover, Space, } from 'antd';
import HeaderUserMenu from './HeaderUserMenu';
import './index.css';
import { useEffect, useState } from 'react';

// 格式化顶部时间：统一把 Date 转成“月/日 时:分:秒”的中文显示格式。
const formatCurrentTime = (date: Date) => {
    // Intl.DateTimeFormat 是浏览器内置格式化工具，比手动拼字符串更稳定。
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit', // 月份固定两位，例如 06。
        day: '2-digit', // 日期固定两位，例如 24。
        hour: '2-digit', // 小时固定两位。
        minute: '2-digit', // 分钟固定两位。
        second: '2-digit', // 秒固定两位，让顶部时间有实时变化。
        hour12: false, // 使用 24 小时制，后台系统更常用。
    }).format(date); // 返回最终格式化后的字符串。
};

function Header() {
    // 获取路由跳转函数，用于点击 logo/首页按钮时回到默认首页。
    const navigate = useNavigate();
    // 只取 store 里的 setActive 方法，点击首页时把 tab 激活态重置为 home。
    const setActive = useTabsStore((state) => state.setActive);
    // 保存顶部当前时间；初始值用当前时间，避免页面初次渲染时出现空白。
    const [currentTime, setCurrentTime] = useState(formatCurrentTime(new Date()));

    // 顶部时间每秒刷新一次，给后台系统一个明确的实时状态感。
    useEffect(() => {
        // setInterval 每 1000ms 更新一次 currentTime。
        const timer = window.setInterval(() => {
            // 每次定时器触发时重新取当前时间并格式化。
            setCurrentTime(formatCurrentTime(new Date()));
        }, 1000);

        // 组件卸载时清理定时器，避免页面切换后仍然后台运行造成内存泄漏。
        return () => window.clearInterval(timer);
    }, []);

    // 点击 logo 或首页按钮时同步更新标签激活态和路由，避免 URL 与 tab 状态不同步。
    const goHome = () => {
        setActive("home"); // 激活首页 tab。
        navigate("/"); // 跳转到根路由，也就是默认首页。
    };

    return <div className='header'>
        {/* 左侧品牌入口：点击后回首页，符合后台系统常见交互习惯。 */}
        <a className="brand" onClick={goHome}>
            {/* logo 图片增加 alt，提升可访问性，也避免控制台提示。 */}
            <img className='logo' src={logo} alt="Knowvia" />
            {/* 文字品牌名用于补充识别，避免 logo 图片尺寸过小时看不清。 */}
            <span className="brand-title">Knowvia</span>
        </a>

        {/* 右侧工具区：放首页按钮、实时时间、用户入口。 */}
        <div className='header-right'>
            {/* Space 统一控制右侧工具之间的间距。 */}
            <Space size={12}>
                {/* 首页快捷按钮：给用户一个明确可点击的“回到默认首页”入口。 */}
                <Button className="header-icon-btn" icon={<HomeOutlined />} onClick={goHome}>
                    首页
                </Button>

                {/* 实时时间展示：后台系统常用状态信息，增强系统感。 */}
                <div className="header-time">
                    <ClockCircleOutlined />
                    <span>{currentTime}</span>
                </div>

                {/* 用户信息弹层：点击用户区域时显示退出登录等操作。 */}
                <Popover content={<HeaderUserMenu />} trigger="click" placement="bottomRight">
                    {/* 用户入口整体做成可点击区域，而不是只点击图标。 */}
                    <Space className="user">
                        {/* 圆形头像区域：用图标代替真实头像，视觉上更完整。 */}
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
