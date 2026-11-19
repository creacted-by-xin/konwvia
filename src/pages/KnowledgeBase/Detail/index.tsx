import { Alert, Button, Form, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Input from "antd/es/input/Input";
import { UploadModal } from "../../../components/Modal";
import { useTabsStore } from "../../../store/useTabsStore";
import type { DocumentType } from "../../../types/domain";
import { getKnowledgeBase } from "../../../api/knowledgeBases";
import { listDocuments } from "../../../api/documents";
import './index.css'

const statusLabels: Record<DocumentType["status"], string> = {
    pending: '待处理',
    processing: '解析中',
    ready: '已完成',
    failed: '失败',
};

interface DetailQueryForm {
    name?: string;
    docStatus?: DocumentType["status"];
};

function KnowledgeBaseDetail() {
    const navigate = useNavigate();
    const [form] = Form.useForm<DetailQueryForm>();

    const addTab = useTabsStore(s => s.addTab);
    // 根据URL里的id自动补一个tab
    const { knowledgeBaseId: id } = useParams();
    const tabKey = `/knowledge-bases/${id}`
    const savedName = useTabsStore(state => state.querys[tabKey]?.name ?? '');
    const savedStatus = useTabsStore(state => state.querys[tabKey]?.docStatus);
    const setDetailQuery = useTabsStore(state => state.setDetailQuery);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    // 当前知识库元数据（与 Boundary 共用 queryKey，通常直接命中缓存）
    const { data: currentKnowledgeBase } = useQuery({
        queryKey: ['knowledge-bases', id],
        queryFn: ({ signal }) => getKnowledgeBase(Number(id), signal),
        enabled: Boolean(id),
        retry: false,
        refetchOnWindowFocus: false,
    });

    // 当前知识库下的文档列表
    const {
        data: documents = [],
        isFetching,
        error,
        refetch: documentsRefetch,
    } = useQuery({
        queryKey: ['knowledge-bases', id, 'documents'],
        queryFn: ({ signal }) => listDocuments(Number(id), signal),
        enabled: Boolean(id),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const readyCount = documents.filter(item => item.status === 'ready').length;
    const processingCount = documents.filter(item => item.status === 'processing').length;
    const failedCount = documents.filter(item => item.status === 'failed').length;

    // 查询条件筛选过的文档
    const tableDatas = documents.filter((item: DocumentType) =>
        item.name.includes(savedName) &&
        (savedStatus === undefined || item.status === savedStatus)
    );

    // 刷新后，新建该路由的tab标签
    useEffect(() => {
        if (!id) return;
        if (!currentKnowledgeBase) return;
        const path = `/knowledge-bases/${id}`;

        addTab({
            key: path,
            label: `${currentKnowledgeBase.name}-详情`,
            path: path,
            closable: true
        })
    }, [id, addTab, currentKnowledgeBase])

    useEffect(() => {
        form.setFieldsValue({
            name: savedName,
            docStatus: savedStatus,
        })
    }, [tabKey, savedName, savedStatus, form])

    const columns: ColumnsType<DocumentType> = [
        {
            title: '文档名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'fileType',
            key: 'fileType',
        },
        {
            title: '大小',
            dataIndex: 'fileSize',
            key: 'fileSize',
            sorter: {
                compare: (a, b) => a.fileSize - b.fileSize,
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: DocumentType["status"]) => statusLabels[status] ?? status
        },
        {
            title: '进度(%)',
            dataIndex: 'progress',
            key: 'progress',
            sorter: (a, b) => a.progress - b.progress,
        },
        {
            title: '上传人',
            dataIndex: 'uploadedBy',
            key: 'uploadedBy',
        },
        {
            title: '上传时间',
            dataIndex: 'uploadedAt',
            key: 'uploadedAt',
            sorter: (a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="medium">
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    async function onFinish(values: DetailQueryForm) {
        setDetailQuery(tabKey, {
            name: values.name?.trim() ?? "",
            docStatus: values.docStatus,
        });

        await documentsRefetch();
    };

    async function onReset() {
        if (!id) return;
        form.resetFields();
        setDetailQuery(tabKey, {});
        await documentsRefetch();
    };

    function entryChat() {
        if (!id) return;

        if (!currentKnowledgeBase) return;
        const path = `/knowledge-bases/${id}/chat`;

        addTab({
            key: path,
            label: `${currentKnowledgeBase.name}-对话`,
            path,
            closable: true
        });
        navigate(path);
    }

    function changeIsOpen(isOpen: boolean) {
        setIsOpen(isOpen)
    }

    return (<div>
        <div className="KnowledgeBaseDetailPage">
            <h1 className="title">{currentKnowledgeBase?.name || '未知'}知识库</h1>
            <div className="desc">{currentKnowledgeBase?.description || ''}</div>
            <div className="toolbar">
                <Space size='medium' >
                    <Button className="upload" onClick={() => setIsOpen(true)}>上传文档</Button>
                    <UploadModal isOpen={isOpen} changeIsOpen={changeIsOpen} />
                    <Button className="upload ask" onClick={entryChat}>开始问答</Button>
                </Space>
                <Form
                    className="query"
                    form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item className='formItem' name="name">
                        <Input placeholder="文档名称" />
                    </Form.Item>
                    <Form.Item className='formItem' name="docStatus">
                        <Select placeholder="状态"
                            style={{ width: 140 }}
                            options={[
                                { label: '待处理', value: 'pending' },
                                { label: '解析中', value: 'processing' },
                                { label: '已完成', value: 'ready' },
                                { label: '失败', value: 'failed' },
                            ]} />
                    </Form.Item>

                    <Form.Item className='formItem'>
                        <Space align="center">
                            <Button type="primary" htmlType="submit" loading={isFetching}>
                                查询
                            </Button>
                            <Button htmlType="button" onClick={onReset} loading={isFetching}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <div className="countList">
                    <div className="countItem">
                        <div>总文档</div>
                        <div className="count">{documents.length}</div>
                    </div>
                    <div className="countItem">
                        <div>可问答</div>
                        <div className="count" style={{ color: readyCount > 0 ? 'green' : undefined }}>
                            {readyCount}
                        </div>
                    </div>
                    <div className="countItem">
                        <div>解析中</div>
                        <div className="count" style={{ color: processingCount > 0 ? 'orange' : undefined }}>
                            {processingCount}
                        </div>
                    </div>
                    <div className="countItem">
                        <div>失败</div>
                        <div className="count" style={{ color: failedCount > 0 ? 'red' : undefined }}>
                            {failedCount}
                        </div>
                    </div>
                </div>

            </div>

            <div>
                {error !== null && (
                    <Alert
                        type="error"
                        title={error.message}
                        showIcon
                        action={
                            <Button
                                size="small"
                                onClick={() => {
                                    void documentsRefetch();
                                }}
                                loading={isFetching}
                            >
                                重试
                            </Button>
                        }
                    />
                )}
                <Table
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={tableDatas}
                    showSorterTooltip={false}
                />
            </div>
        </div>
    </div>)
};

export default KnowledgeBaseDetail;
