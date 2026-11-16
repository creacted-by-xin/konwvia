import type{ KnowledgeBaseType } from '../types/domain';
import { mockKnowledgeBases } from '../mocks/knowledgeBases';


export async function ListKnowledgeBases(): Promise<KnowledgeBaseType[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 返回新的对象数组，避免直接返回mockKnowledgeBases导致的引用问题
    return mockKnowledgeBases.map(item => ({...item}) )
}