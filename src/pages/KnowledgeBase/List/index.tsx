import { Button, Table, Space, Form, Tabs, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "antd/es/input/Input";
import { useQuery } from "@tanstack/react-query";
import { useTabsStore } from "../../../store/useTabsStore";
import { AddModal } from "../../../components/Modal";
import type { KnowledgeBaseType } from "../../../types/domain";
import { ListKnowledgeBases } from "../../../api/knowledgeBases";
import './index.css';

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
    // const [loading, setLoading] = useState<boolean>(true);
    // // 成功
    // const [tableData, setTableData] = useState<KnowledgeBaseType[]>([]);
    // // 失败
    // const [error, setError] = useState<string | null>(null);




    // 进入列表页后异步获取知识库，等待时显示加载状态，
    // 成功后显示数据，失败时保存错误信息；离开页面后忽略旧结果。
    // useEffect(() => {
    //     //防止已经过期的请求结果更新页面
    //     // Effect 清理时会把它改成 true，表示结果已经过期。
    //     let ignore = false;

    //     async function loadData() {
    //         try {
    //             const data = await ListKnowledgeBases();
    //             if (!ignore) return setTableData(data);

    //         } catch (error: unknown) {
    //             if (!ignore) return setError(
    //                 error instanceof Error ? error.message : '获取知识库列表失败'
    //             );
    //         }
    //         finally {
    //             if (!ignore) {
    //                 setLoading(false);
    //             }
    //         }
    //     }

    //     void loadData();

    //     return () => {
    //         // Effect 清理时会把它改成 true，表示结果已经过期。
    //         ignore = true;
    //     };
    // }, [])


    // 	isFetching当前是否正在请求，包括重新获取
    // refetch	主动重新获取当前查询
    const { data: tableData = [], isFetching, error, refetch } = useQuery({
        // 数据的缓存标识
        queryKey: ['knowledge-bases', 'list'],
        // TanStack Query 调用 queryFn 时，传入的是一个包含多项信息的对象，`signal` 只是其中一个属性。
        queryFn: ({signal}) => ListKnowledgeBases(signal),
        retry: false,
        refetchOnWindowFocus: false
    });

    const filteredData = tableData.filter(item =>
        item.name.includes(savedName)
    );

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
                    <a>编辑</a>
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
        const keyword = values.name?.trim() ?? '';
        setDetailQuery('home', { name: keyword })

        await refetch();
    };

    async function onReset() {
        form.resetFields();
        setDetailQuery("home", {});

        await refetch();
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
                                    <Button type="primary" htmlType="submit" loading={isFetching}>
                                        查询
                                    </Button>
                                    <Button htmlType="button" onClick={onReset} loading={isFetching}>
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
                        title={error.message}
                        showIcon
                        action = {
                            // React 点击按钮时，会把点击事件对象传给处理函数。
                            // 如果不用箭头函数的话，普通函数会把点击事件传给refetch函数
                                // onClick={refetch}          // 点击时调用，React 会传入事件
                                // onClick={() => refetch()}  // 点击时调用，由你决定传什么参数
                                // onClick={refetch()}        // ❌ 渲染时就执行，不是等点击
                            <Button size="small" onClick={()=> {
                                refetch();
                            }} loading={isFetching}>重试</Button>
                        }
                    />
                )}
                <Table rowKey="id" loading={isFetching} columns={columns} dataSource={filteredData} showSorterTooltip={false}
                ></Table >
            </div>
        </div>
    )
}

export default KnowledgeBaseList;