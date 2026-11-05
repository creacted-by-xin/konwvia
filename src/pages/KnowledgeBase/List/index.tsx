import { Button, Table, Space, Form, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Input from "antd/es/input/Input";
import './index.css';
import { useTabsStore } from "../../../store/useTabsStore";
import {AddModal} from "../../../components/Modal";
import type{ KnowledgeBaseType } from "../../../types/domain";
import { mockKnowledgeBases } from "../../../mocks/knowledgeBases";

const onChange = (key: string) => {
    console.log(key);
  };
  
  const items = [
    {
      key: '1',
      label: '公共知识库',
    },
    {
      key: '2',
      label: '个人知识库' }
  ];


function KnowledgeBaseList() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState(mockKnowledgeBases);
    const addTab = useTabsStore(s => s.addTab);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const columns: ColumnsType<KnowledgeBaseType>  = [
        {
            title: '知识库名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '文档数',
            dataIndex: 'documentCount',
            key: 'documentCount',
            sorter: {
                compare: (a, b) => a.documentCount - b.documentCount,
            },
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // 把一个日期转换成时间戳数字。
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            // 把一个日期转换成时间戳数字。
            sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="medium">
                    <a onClick={()=>onClickEntry(record)}>进入</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    function onClickEntry(record: KnowledgeBaseType) {
        const path = `/knowledge-bases/${record.id}`;
        addTab({
            key: path,
            label: `${record.name}-详情`,
            path,
            closable: true
        });
        navigate(path);
    }

    const onFinish = (values: { name?: string }) => {
        const keyword = values.name?.trim();

        if (!keyword) {
            setTableData(mockKnowledgeBases);
            return;
        };

        setTableData(
            mockKnowledgeBases.filter((item) =>
                item.name.includes(keyword)
            )
        );
    };

    const onReset = () => {
        form.resetFields();
        setTableData(mockKnowledgeBases);
    };

    function changeIsOpen(isOpen: boolean){
        setIsOpen(isOpen)
    }

    return (
        <div className="KnowledgeBaseListPage">
            <h1 className="title">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </h1>
            <div className="toolbar">
                <div className="query">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Space align="start">
                            <Form.Item name="name">
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
                <Button type="primary" onClick={()=>setIsOpen(true)}>新增</Button>
                <AddModal isOpen={isOpen} changeIsOpen={changeIsOpen}/>
            </div>

            <div>
                <Table columns={columns} dataSource={tableData} showSorterTooltip={false}
                ></Table >
            </div>
        </div>
    )
}

export default KnowledgeBaseList;