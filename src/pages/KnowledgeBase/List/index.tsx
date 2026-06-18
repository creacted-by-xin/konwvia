import { Button, Table, Space, Form, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Input from "antd/es/input/Input";
import './index.css';
import { useTabsStore } from "../../../store/useTabsStore";
import {AddModal} from "../../../components/Modal";

interface KnowledgeItem {
  key: string;
  knowledgeName: string;
  desc: string;
  docNumber: number;
  userName: string;
  createTime: string;
  updateTime: string;
}

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
    const [tableData, setTableData] = useState(data);
    const addTab = useTabsStore(s => s.addTab);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const columns: ColumnsType<KnowledgeItem>  = [
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
                    <a onClick={()=>onClickEntry(record)}>进入</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    function onClickEntry(record: any) {
        const path = `KnowledgeBaseDetail?id=${record.key}`;
        console.log('path', path)
        addTab({
            key: `KnowledgeBaseDetail-${record.key}`,
            label: `${record.knowledgeName}-详情`,
            path,
            closable: true
        });
        console.log('key', `KnowledgeBaseDetail-${record.key}`)
        navigate(path);
    }

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