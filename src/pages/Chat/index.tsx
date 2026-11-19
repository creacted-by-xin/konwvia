import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Splitter } from 'antd';
import { useTabsStore } from "../../store/useTabsStore";
import { getKnowledgeBase } from "../../api/knowledgeBases";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import './index.css'


function Chat() {
    const addTab = useTabsStore(s => s.addTab);
    const { knowledgeBaseId: id } = useParams();

    // 与 Boundary / Detail 共用同一 queryKey，通常直接命中缓存
    const { data: currentKnowledgeBase } = useQuery({
        queryKey: ['knowledge-bases', id],
        queryFn: ({ signal }) => getKnowledgeBase(Number(id), signal),
        enabled: Boolean(id),
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!id) return;
        if (!currentKnowledgeBase) return;

        const path = `/knowledge-bases/${id}/chat`;
        addTab({
            key: path,
            label: `${currentKnowledgeBase.name}-对话`,
            path: path,
            closable: true
        })
    }, [id, addTab, currentKnowledgeBase])


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
