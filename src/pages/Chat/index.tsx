import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTabsStore } from "../../store/useTabsStore";

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


    return (<div>Chat</div>)
};

export default Chat;
