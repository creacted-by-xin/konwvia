import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTabsStore } from "../../store/useTabsStore";
import { Splitter } from 'antd';
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import './index.css'

const data = [
    {
        key: '1',
        knowledgeName: 'John Brown',
        desc: 'New York No. 1 Lake Park',
        docNumber: 32,
        userName: '小王',
        createTime: '2026-01-01',
        updateTime: '2026-02-02'
    },
    {
        key: '2',
        knowledgeName: 'Jim Green',
        desc: 'New York No. 1 Lake Park',
        docNumber: 30,
        userName: '小红',
        createTime: '2026-01-02',
        updateTime: '2026-02-02'
    },
    {
        key: '3',
        knowledgeName: 'Joe Black',
        desc: 'New York No. 1 Lake Park',
        docNumber: 31,
        userName: '小盒',
        createTime: '2026-01-03',
        updateTime: '2026-02-02'
    },

];

function Chat() {
    const addTab = useTabsStore(s => s.addTab);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) return;

        // 拿到当前详情data
        const current = data.find(item => item.key === id);
        if (!current) return;

        addTab({
            key: `Chat-${current.key}`,
            label: `${current.knowledgeName}-对话`,
            path: `/Chat?id=${current.key}`,
            closable: true
        })

        console.log('id2', `Chat-${current.key}`)
    }, [id, addTab])


    return (<div className="chat-page">
        <Splitter style={{ height: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Splitter.Panel collapsible defaultSize="16%" >
                <ChatList />
            </Splitter.Panel>
            <Splitter.Panel>
                <ChatInput />
            </Splitter.Panel>
            <Splitter.Panel defaultSize="16%"  collapsible >
                引用来源
            </Splitter.Panel>
        </Splitter>
    </div>)
};

export default Chat;
