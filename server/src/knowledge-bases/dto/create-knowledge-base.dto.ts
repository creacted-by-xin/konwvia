import { z } from 'zod';
// z.object、z.string、z.infer
// z.string()必须是字符串
// z.infer、推断「校验通过后」的数据形状

// z.object({ ... }) 表示：这个值必须是一个普通对象
export const createKnowledgeBaseSchema = z.object({
    // 对 string：min(1) = 长度至少 1（至少一个字符）。第二个参数是失败时的提示文案。
    // z.string().max(100)：最多 100 字符
    name: z.string().trim().min(1, '名称不能为空'),
    description: z.string().optional()
})


// .partial() 的含义是：可以不传 name；
// 一旦传了 name，仍要满足原来的规则（trim 后至少 1 个字符）。
export const updateKnowledgeBaseSchema = createKnowledgeBaseSchema.partial();

// typeof createKnowledgeBaseSchema：取这个 schema 值的类型
export type createKnowledgeBaseDto= z.infer<typeof createKnowledgeBaseSchema>;
export type updateKnowledgeBaseDto = z.infer<typeof updateKnowledgeBaseSchema>;

//  type 不会参与运行时校验。真正拦非法输入的是 createKnowledgeBaseSchema，且必须通过 Nest 的 @Body({ schema: ... }) 交给管道。
// schema 对象活到运行时；type 只活在编辑器和编译器里。


// 
export const listKnowledgeBasesQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
    q: z.string().trim().optional(),
    sortBy: z.enum(['updatedAt', 'createdAt', 'name']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export type listKnowledgeBasesQueryDto= z.infer<typeof listKnowledgeBasesQuerySchema>;