import type { KnowledgeBaseType } from '../types/domain';
import { mockKnowledgeBases } from '../mocks/knowledgeBases';

interface CreateKnowledgeBaseInput {
    name: string,
    description: string
}

const API_BASE = 'http://localhost:3000';

export async function createKnowledgeBase(input: CreateKnowledgeBaseInput): Promise<KnowledgeBaseType> {
    const { name, description = '' } = input;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const nextName = name.trim();
    if (!nextName) throw new Error('知识库名称不能为空');

    const nextId = mockKnowledgeBases.reduce((max, item)=> Math.max(max, item.id), 0) +1;

    const nextKnowledge = {
        id: nextId,
        name: nextName,
        description: description,
        documentCount: 0,
        createdBy: 'user',
        createdAt: new Date().toISOString().slice(0,10),
        updatedAt: new Date().toISOString().slice(0,10),
    }

    mockKnowledgeBases.push(nextKnowledge)

    return {...nextKnowledge}
}

// 模拟等待，并处理取消（定义一个“可以取消的等待函数”）
// ms时间、signal用来接收取消通知、Promise等待完成后不提供数据，只通知完成
export function delay(ms: number, signal: AbortSignal): Promise<void> {
    // Promise<void>：返回一个 Promise，成功时不提供数据，只表示等待完成。
    // 时间到了 → resolve() → 等待成功
    // 被取消了 → reject(...) → 等待失败
    return new Promise<void>((resolve, reject) => {
        // 创建一个表示“取消”的错误，并让 Promise 进入失败状态。
        // "请求已取消" 是错误信息。"AbortError" 是错误名称。
        if (signal.aborted) {
            reject(new DOMException("请求已取消", "AbortError"));
            // 退出当前 Promise 的回调，不再创建计时器或注册监听。
            // 注意：reject() 本身不会停止后续代码执行，因此需要 return。
            return;
        };

        // 定义函数：监听到取消要做什么
        function onAbort() {
            // 清除ms时间的取消等待定时器
            // 清除监听取消的监听器
            clearTimeout(timer);
            signal.removeEventListener('abort', onAbort);

            reject(new DOMException("请求已取消", "AbortError"))
        };

        // once: true 表示监听最多触发一次，触发后自动移除。
        signal.addEventListener('abort', onAbort, { once: true })

        const timer = setTimeout(() => {
            // 时间到，去除监听,返回promise成功结果
            signal.removeEventListener('abort', onAbort);
            resolve()
        }, ms)
    })
}


// 查询知识库函数，返回全部知识库
export async function ListKnowledgeBases(signal: AbortSignal): Promise<KnowledgeBaseType[]> {
    // 负责可取消的等待
    await delay(1000, signal);

    // 负责提供知识库数据
    // 返回新的对象数组，避免直接返回mockKnowledgeBases导致的引用问题
    return mockKnowledgeBases.map(item => ({ ...item }))
}

// —— 单条详情，按 id 取某一个知识库
export async function getKnowledgeBase(
    id: number,
    signal: AbortSignal
): Promise<KnowledgeBaseType> {
    await delay(1000, signal);

    const found = mockKnowledgeBases.find(item => item.id === id);
    if (!found) {
        const error = new Error('知识库不存在');
        error.name = 'NotFoundError';
        throw error;
    }

    return { ...found };
}