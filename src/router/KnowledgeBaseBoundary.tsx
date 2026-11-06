import { Outlet, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { mockKnowledgeBases } from "../mocks/knowledgeBases";

function KnowledgeBaseBoundary() {
    // 第一关：检查 ID 格式。
    const {knowledgeBaseId} = useParams<{knowledgeBaseId: string}>();

    // 判断ID是否有效，确保它是一个正整数，返回一个Boolean
    const isValidId =
        knowledgeBaseId !== undefined &&
        /^[1-9]\d*$/.test(knowledgeBaseId) &&
        Number.isSafeInteger(Number(knowledgeBaseId));

    if(!isValidId) {
        return (
        <NotFound title="知识库ID格式有误" description="无效的知识库ID，请检查知识库ID格式。" />
        )
    }


    // 第二关：检查知识库是否存在。
    const isknowledgeBaseId = mockKnowledgeBases.find(item => item.id === Number(knowledgeBaseId));

    if(!isknowledgeBaseId) {
        return (
        <NotFound title="知识库不存在" description="该知识库可能已被删除，或知识库ID有误。" />
        )
    }

    // 如果通过了两关检查，渲染子路由。
    return (
        <Outlet/>
    )
}

export default KnowledgeBaseBoundary;