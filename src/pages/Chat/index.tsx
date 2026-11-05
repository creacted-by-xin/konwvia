import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTabsStore } from "../../store/useTabsStore";
import { Splitter } from 'antd';
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import { mockKnowledgeBases } from "../../mocks/knowledgeBases";
import './index.css'


function Chat() {
    const addTab = useTabsStore(s => s.addTab);
    const { knowledgeBaseId: id } = useParams();

    useEffect(() => {
        if (!id) return;

        // 拿到当前详情data
        const currentKnowledgeBase = mockKnowledgeBases.find(item => String(item.id) === id);

        if (!currentKnowledgeBase) return;
        const path = `/knowledge-bases/${id}/chat`;
        addTab({
            key: path,
            label: `${currentKnowledgeBase.name}-对话`,
            path: path,
            closable: true
        })

    }, [id, addTab])


    return (<div className="chat-page">
        <Splitter style={{ height: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Splitter.Panel collapsible defaultSize="16%" >
                <ChatList />
            </Splitter.Panel>
            <Splitter.Panel>
                <ChatInput />
            </Splitter.Panel>
            <Splitter.Panel defaultSize="16%" collapsible >
                引用来源
            </Splitter.Panel>
        </Splitter>
    </div>)
};

export default Chat;
