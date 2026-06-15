import { Button, Table, Space, Form } from "antd";
import { useState } from "react";
import Input from "antd/es/input/Input";
import './index.css';

const columns = [
    {
        title: '知识库名称',
        dataIndex: 'knowledgeName',
        key: 'knowledgeName',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: '文档数',
        dataIndex: 'docNumber',
        key: 'docNumber',
        sorter: {
            compare: (a, b) => a.docNumber - b.docNumber,
        },
    },
    {
        title: '创建人',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        // 把一个日期转换成时间戳数字。
        sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
        title: '更新时间',
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
                <a>进入</a>
                <a>删除</a>
            </Space>
        ),
    },
];

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


function KnowledgeBaseList() {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState(data);

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

    return (
        <div className="KnowledgeBaseListPage">
            <h1 className="title">知识库</h1>
            <div className="toolbar">
                <div className="query">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Space align="start">
                            <Form.Item name="knowledgeName">
                                <Input placeholder="搜索知识库名称" />
                            </Form.Item>

                            <Form.Item >
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                    <Button htmlType="button" onClick={onReset}>
                                        重置
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Space>
                    </Form>

                </div>
                <Button type="primary">新增</Button>
            </div>

            <div>
                <Table columns={columns} dataSource={tableData} showSorterTooltip={false}
                ></Table>
            </div>
        </div>
    )
}

export default KnowledgeBaseList;