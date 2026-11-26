import type { KnowledgeBaseType } from '../types/domain';
// import { mockKnowledgeBases } from '../mocks/knowledgeBases';

interface CreateKnowledgeBaseInput {
    name: string,
    description: string
}

interface knowledgeBaseListResult {
    items: KnowledgeBaseType[],
    total: number,
    page: number,
    pageSize: number
}

const API_BASE = 'http://localhost:3000';

// 创建一个异步请求
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    //若断网/CORS，这里直接抛，后面都不跑
    const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init.headers,
        },
    });

    //response.ok 是浏览器 Fetch API 里 Response 对象上的一个布尔值。
    // 含义：这次 HTTP 响应的状态码是否在 200–299（成功）之间。
    if (!response.ok) {
        // response.json()把响应体当 JSON 解析，返回 Promise
        // .catch(() => null)解析失败时不要让整段 request 崩掉，改成得到 null
        const body = await response.json().catch(() => null);

        // 校验管道默认（未写 exceptionFactory 时）message 可能是数组（校验多个字段时）。
        // 1）文案：数组就拼起来；否则用字符串 message；再没有就兜底
        const message = Array.isArray(body?.message)
            ? body.message.join(';')
            : body?.message ?? '知识库服务请求失败';

        // 2）稳定 code：必须是 string 才认
        const code = typeof body?.code === 'string' ? body.code : undefined;

        // 3）Error 上挂 code（TS 用交叉类型允许这个字段）
        // 创建一个标准的 Error 实例,告诉 TS——变量 error 既是 Error，又可以有 error.code
        // 合在一起的效果
        // message = '知识库ID99999不存在'
        // code = 'KB_NOT_FOUND'
        const error = new Error(message) as Error & { code?: string };
        if (code) {
            error.code = code;
        }

        // 4）NotFound：HTTP 404 或业务 code 都算
        // 改错误类别标记，给现有 Boundary 用。
        if (response.status === 404 || code === 'KB_NOT_FOUND') {
            error.name = 'NotFoundError';
        }

        throw error;
    }

    //   把成功响应体解析成对象/数组。
    return response.json() as Promise<T>;
};


export async function createKnowledgeBase(input: CreateKnowledgeBaseInput): Promise<KnowledgeBaseType> {
    return request('/knowledge-bases', {
        method: 'POST',
        body: JSON.stringify(input),
    })
}

// 更新
export async function updateKnowledgeBase(id: string, input: { name?: string, description?: string }): Promise<KnowledgeBaseType> {
    return request(`/knowledge-bases/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
    })
};

// 删除
export async function removeKnowledgeBase(id: string): Promise<KnowledgeBaseType> {
    return request(`/knowledge-bases/${id}`, {
        method: 'DELETE',
    })
}

// // 模拟等待，并处理取消（定义一个“可以取消的等待函数”）
// // ms时间、signal用来接收取消通知、Promise等待完成后不提供数据，只通知完成
// export function delay(ms: number, signal: AbortSignal): Promise<void> {
//     // Promise<void>：返回一个 Promise，成功时不提供数据，只表示等待完成。
//     // 时间到了 → resolve() → 等待成功
//     // 被取消了 → reject(...) → 等待失败
//     return new Promise<void>((resolve, reject) => {
//         // 创建一个表示“取消”的错误，并让 Promise 进入失败状态。
//         // "请求已取消" 是错误信息。"AbortError" 是错误名称。
//         if (signal.aborted) {
//             reject(new DOMException("请求已取消", "AbortError"));
//             // 退出当前 Promise 的回调，不再创建计时器或注册监听。
//             // 注意：reject() 本身不会停止后续代码执行，因此需要 return。
//             return;
//         };

//         // 定义函数：监听到取消要做什么
//         function onAbort() {
//             // 清除ms时间的取消等待定时器
//             // 清除监听取消的监听器
//             clearTimeout(timer);
//             signal.removeEventListener('abort', onAbort);

//             reject(new DOMException("请求已取消", "AbortError"))
//         };

//         // once: true 表示监听最多触发一次，触发后自动移除。
//         signal.addEventListener('abort', onAbort, { once: true })

//         const timer = setTimeout(() => {
//             // 时间到，去除监听,返回promise成功结果
//             signal.removeEventListener('abort', onAbort);
//             resolve()
//         }, ms)
//     })
// }


// 查询知识库函数，返回全部知识库
export async function ListKnowledgeBases(signal: AbortSignal, query: { page: number, pageSize: number, q?: string }): Promise<knowledgeBaseListResult> {
    const params = new URLSearchParams({
        page: String(query.page),
        pageSize: String(query.pageSize),
    })
    if(query.q) params.set('q', query.q);

    return request(`/knowledge-bases?${params.toString()}`, { signal });
}

// —— 单条详情，按 id 取某一个知识库
export async function getKnowledgeBase(
    id: number,
    signal: AbortSignal
): Promise<KnowledgeBaseType> {
    return request(`/knowledge-bases/${id}`, { signal })
}

