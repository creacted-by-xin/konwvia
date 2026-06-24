import './index.css';
import { Button } from 'antd';

const data = [
    '对话1',
    '对话2',
    '对话3',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
    '对话4',
]

const ChatList = () => {
    return (
        <div className="chatList">
            <h1 className='chatListHeader'>会话列表</h1>
            <Button type="primary" className="chatListAddBtn">新建会话</Button>
            <div className='chatItemList'>
                {
                    data.map((item, index) => {
                        return <div className='chatItem' key={`${item}-${index}`}>{item}</div>
                    })
                }
            </div>

        </div>
    )
}
export default ChatList;
