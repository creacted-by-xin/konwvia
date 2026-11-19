import { Alert, Button, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { getKnowledgeBase } from "../api/knowledgeBases";
import NotFound from "../pages/NotFound";

function KnowledgeBaseBoundary() {
    // 第一关：检查 ID 格式。
    const { knowledgeBaseId } = useParams<{ knowledgeBaseId: string }>();

    // 判断ID是否有效，确保它是一个正整数，返回一个Boolean
    const isValidId =
        knowledgeBaseId !== undefined &&
        /^[1-9]\d*$/.test(knowledgeBaseId) &&
        Number.isSafeInteger(Number(knowledgeBaseId));

    // 第二关：通过 typed API 异步确认知识库是否存在。
    const { data, isPending, isFetching, error, refetch } = useQuery({
        queryKey: ['knowledge-bases', knowledgeBaseId],
        queryFn: ({ signal }) => getKnowledgeBase(Number(knowledgeBaseId), signal),
        enabled: isValidId,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (!isValidId) {
        return (
            <NotFound title="知识库ID格式有误" description="无效的知识库ID，请检查知识库ID格式。" />
        )
    }

    if (isPending) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
                <Spin />
            </div>
        );
    }

    if (error?.name === 'NotFoundError') {
        return (
            <NotFound title="知识库不存在" description="该知识库可能已被删除，或知识库ID有误。" />
        )
    }

    if (error !== null) {
        return (
            <div style={{ padding: 24 }}>
                <Alert
                    type="error"
                    title={error.message}
                    showIcon
                    action={
                        <Button
                            size="small"
                            onClick={() => {
                                void refetch();
                            }}
                            loading={isFetching}
                        >
                            重试
                        </Button>
                    }
                />
            </div>
        );
    }

    if (!data) {
        return (
            <NotFound title="知识库不存在" description="该知识库可能已被删除，或知识库ID有误。" />
        )
    }

    // 如果通过了两关检查，渲染子路由。
    return (
        <Outlet />
    )
}

export default KnowledgeBaseBoundary;
