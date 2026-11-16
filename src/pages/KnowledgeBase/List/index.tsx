import { Button, Table, Space, Form, Tabs, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import './index.css';
import { useTabsStore } from "../../../store/useTabsStore";
import { AddModal } from "../../../components/Modal";
import type { KnowledgeBaseType } from "../../../types/domain";
import { ListKnowledgeBases } from "../../../api/knowledgeBases";

const items = [
    {
        key: '1',
        label: '公共知识库',
    },
    {
        key: '2',
        label: '个人知识库'
    }
];


function KnowledgeBaseList() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const addTab = useTabsStore(s => s.addTab);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedName = useTabsStore(state => state.querys.home?.name ?? '');
    const setDetailQuery = useTabsStore(state => state.setDetailQuery);
    // 保存是否正在加载。初始是 true，所以页面首次显示时可以展示加载动画。
    const [loading, setLoading] = useState<boolean>(true);
    // 成功
    const [tableData, setTableData] = useState<KnowledgeBaseType[]>([]);
    // 失败
    const [error, setError] = useState<string | null>(null);

    const filteredData = tableData.filter(item =>
        item.name.includes(savedName)
    );


    // 进入列表页后异步获取知识库，等待时显示加载状态，
    // 成功后显示数据，失败时保存错误信息；离开页面后忽略旧结果。
    useEffect(() => {
        //防止已经过期的请求结果更新页面
        // Effect 清理时会把它改成 true，表示结果已经过期。
        let ignore = false;

        async function loadData() {
            try {
                const data = await ListKnowledgeBases();
                if (!ignore) return setTableData(data);

            } catch (error: unknown) {
                if (!ignore) return setError(
                    error instanceof Error ? error.message : '获取知识库列表失败'
                );
            }
            finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        void loadData();

        return () => {
            // Effect 清理时会把它改成 true，表示结果已经过期。
            ignore = true;
        };
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            name: savedName,
        })
    }, [savedName, form])

    const columns: ColumnsType<KnowledgeBaseType> = [
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
                    <a onClick={() => onClickEntry(record)}>进入</a>
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

    async function onFinish(values: { name?: string }) {
        const keyword = values.name?.trim();

        form.setFieldsValue({
            name: keyword,
        });
        setLoading(true);
        const data = await ListKnowledgeBases();
        setTableData(data);
        setDetailQuery('home', { name: keyword })
        setLoading(false);
    };

    const onReset = () => {
        form.resetFields();
        setDetailQuery('home', {});
    };

    function changeIsOpen(isOpen: boolean) {
        setIsOpen(isOpen)
    }

    return (
        <div className="KnowledgeBaseListPage">
            <h1 className="title">
                <Tabs defaultActiveKey="1" items={items} />
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
                <Button type="primary" onClick={() => setIsOpen(true)}>新增</Button>
                <AddModal isOpen={isOpen} changeIsOpen={changeIsOpen} />
            </div>

            <div>
                {error !== null && (
                    <Alert
                        type="error"
                        title={error}
                        showIcon
                    />
                )}
                <Table loading={loading} columns={columns} dataSource={filteredData} showSorterTooltip={false}
                ></Table >
            </div>
        </div>
    )
}

export default KnowledgeBaseList;