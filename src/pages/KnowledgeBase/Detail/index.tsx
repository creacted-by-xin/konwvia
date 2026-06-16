import { Button, Table, Space, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import { useTabsStore } from "../../../store/useTabsStore";
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

function KnowledgeBaseDetail() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState(data);
    const addTab = useTabsStore(s => s.addTab);
    // 根据URL里的id自动补一个tab
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    
    // 刷新后，新建该路由的tab标签
    useEffect(() => {
        if (!id) return;

        // 拿到当前详情data
        const current = data.find(item => item.key === id);
        if (!current) return;

        addTab({
            key: `KnowledgeBaseDetail-${current.key}`,
            label: `${current.knowledgeName}-详情`,
            path: `/KnowledgeBaseDetail?id=${current.key}`,
            closable: true
        })
        console.log('id', `KnowledgeBaseDetail-${current.key}`)
    }, [id, addTab])

    const columns = [
        {
            title: '文档名称',
            dataIndex: 'knowledgeName',
            key: 'knowledgeName',
        },
        {
            title: '类型',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '大小',
            dataIndex: 'docNumber',
            key: 'docNumber',
            sorter: {
                compare: (a, b) => a.docNumber - b.docNumber,
            },
        },
        {
            title: '状态',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '进度',
            dataIndex: 'createTime',
            key: 'createTime',
            // 把一个日期转换成时间戳数字。
            sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
        },
        {
            title: '上传人',
            dataIndex: 'updateTime',
            key: 'updateTime',
            // 把一个日期转换成时间戳数字。
            sorter: (a, b) => new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime(),
        },
        {
            title: '上传时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            // 把一个日期转换成时间戳数字。
            sorter: (a, b) => new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime(),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="medium">
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    const onFinish = (values: any) => {
        const keyword = values.knowledgeName?.trim();

        if (!keyword) {
            setTableData(data);
            return;
        };

        setTableData(
            data.filter((item) =>
                item.knowledgeName.includes(keyword)
            )
        );
    };

    const onReset = () => {
        form.resetFields();
        setTableData(data);
    };

    function entryChat() {
        if (!id) return;

        // 拿到当前详情data
        const current = data.find(item => item.key === id);
        if (!current) return;
        const path = `/Chat?id=${id}`;

        addTab({
            key: `Chat-${id}`,
            label: `${current.knowledgeName}-对话`,
            path,
            closable: true
        });

        navigate(path);
    }


    return (<div>
        <div className="KnowledgeBaseDetailPage">
            <h1 className="title">XXX知识库</h1>
            <div className="desc">描述描述描述描述描述描述描述</div>
            <div className="toolbar">
                <Space size='medium' >
                    <Button className="upload">上传文档</Button>
                    <Button className="upload ask" onClick={entryChat}>开始问答</Button>
                </Space>
                <Form
                    className="query"
                    form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item className='formItem' name="knowledgeName">
                        <Input placeholder="搜索知识库名称" />
                    </Form.Item>

                    <Form.Item className='formItem'>
                        <Space align="center">
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <div className="countList">
                    <div className="countItem">
                        <div>总文档</div>
                        <div className="count">12</div>
                    </div>
                    <div className="countItem">
                        <div>可问答</div>
                        <div className="count">12</div>
                    </div>
                    <div className="countItem">
                        <div>解析中</div>
                        <div className="count">12</div>
                    </div>
                    <div className="countItem">
                        <div>失败</div>
                        <div className="count">12</div>
                    </div>
                </div>

            </div>

            <div>
                <Table columns={columns} dataSource={tableData} showSorterTooltip={false}
                ></Table>
            </div>
        </div>
    </div>)
};

export default KnowledgeBaseDetail;