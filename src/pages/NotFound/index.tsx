import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
    title?: string;
    description?: string;
}

function NotFound({ title = "页面不存在", description = "地址有误，或页面已被移除。" }: NotFoundProps) {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title={title}
            subTitle={description}
            extra= {
                <Button type='primary' 
                onClick={() => {navigate('/', { replace: true });}}
                >返回首页</Button>
            }
        />
    );
}

export default NotFound;