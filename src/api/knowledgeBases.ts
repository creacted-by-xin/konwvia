import type { KnowledgeBaseType } from '../types/domain';
// import { mockKnowledgeBases } from '../mocks/knowledgeBases';

interface CreateKnowledgeBaseInput {
    name: string,
    description: string
}

const API_BASE = 'http://localhost:3000';

// 创建一个异步请求
async function request<T>(path:string, init: RequestInit={}) :Promise<T>{
    //若断网/CORS，这里直接抛，后面都不跑
 const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

//只有请求已经到达服务器、且状态码不是 2xx 时，你才手动 throw
  if (!response.ok) {
    // Nest 出错时常返回 { message: '...' } 或 { message: [...] }
    const body = await response.json().catch(() => null);
    // body?.message。body 可能是 null，Nest 有时 message 是字符串，有时是字符串数组（校验多个字段时）。
    // 只有 message 是 null/undefined 时才用兜底文案。
    const message = Array.isArray(body?.message)
      ? body.message.join('；')
      : body?.message ?? '知识库服务请求失败';
    //   变成前端能 catch 的错误
    const error = new Error(message);
    if (response.status === 404) error.name = 'NotFoundError'; // Boundary 靠这个识别
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
export async function updateKnowledgeBase(id: string, input: {name?: string, description?: string}): Promise<KnowledgeBaseType> {
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
export async function ListKnowledgeBases(signal: AbortSignal): Promise<KnowledgeBaseType[]> {
    return request('/knowledge-bases', { signal });
}

// —— 单条详情，按 id 取某一个知识库
export async function getKnowledgeBase(
    id: number,
    signal: AbortSignal
): Promise<KnowledgeBaseType> {
    return request(`/knowledge-bases/${id}`, {signal})
}

