import { useNavigate } from "react-router-dom";
import loginBackground from '../../assets/login-bg.png';
import { Form, Input, Checkbox, Button } from 'antd';
import './index.css';

interface FieldType {
    username?: string;
    password?: string;
    remember?: boolean;
}

function Login() {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        navigate("/", { replace: true });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            className="login-page"
            style={{backgroundImage: `url(${loginBackground})` }}
        >
            <div className="login-panel">
                <div className="login-header">
                    <h1>欢迎回来</h1>
                    <p>登录 Knowvia，继续管理你的知识库</p>
                </div>

                <Form
                    className="login-form"
                    name="login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button className="login-submit" type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;
