// import { delay } from "./knowledgeBases";
import { mockDocuments } from "../mocks/knowledgeBases";
import type { DocumentType } from "../types/domain";

// 查询所有某知识库文档列表
export async function listDocuments(
    knowledgeBaseId: number,
    signal: AbortSignal
): Promise<DocumentType[]> {
    // await delay(1000, signal);

    return mockDocuments
        .filter(item => item.knowledgeBaseId === knowledgeBaseId)
        .map(item => ({ ...item }));
}
