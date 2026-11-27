import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { listKnowledgeBasesQueryDto } from './dto/create-knowledge-base.dto.js';

// 告诉 Nest：这个类可以被「注入」到 Controller 里
@Injectable()
export class KnowledgeBasesService {
    // 内存数据库：先用数组顶替真正的 PostgreSQL；private 表示只有这个 Service 能直接改它
    private readonly items = [
        {
            id: 1,
            name: '2John Brown',
            description: '2New York No. 1 Lake Park',
            documentCount: 32,
            createdBy: '小王',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 2,
            name: '2Jim Green',
            description: '2New York No. 1 Lake Park',
            documentCount: 30,
            createdBy: '小红',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];

    // 查询所有
    findAll(query: listKnowledgeBasesQueryDto) {
        const { page, pageSize, q, sortBy, sortOrder } = query;
        const keyWord = q?.toLowerCase();

        // 过滤数据
        const filtered = keyWord ? 
        this.items.filter(item => {
            const name = item.name.toLowerCase();
             const description = item.description.toLowerCase();
             return name.includes(keyWord) ||  description.includes(keyWord)
        })
        : this.items;

        //排序,返回 > 0：a 排在 b 后面
        const sorted = [...filtered].sort((a, b) => {
            // 取出要比的字段
            const left = a[sortBy];
            const right = b[sortBy];

            // 升序比较结果,localeCompare 本身就会返回负数 / 0 / 正数，正好给 sort 用。
            const cmp = String(left).localeCompare(String(right))

            return sortOrder === 'asc' ? cmp : -cmp;
        })

        // 总数
        const total = sorted.length;

        // 当前页数据
        const start = (page -1) * pageSize;
        const items = sorted.slice(start, start + pageSize)
            

        // 把数组交给调用方（Controller）
        return { items, total, page, pageSize };
    }

    // 新增一条
    create(data: { name: string, description?: string }) {
        const { name, description } = data;
        const now = new Date().toISOString();
        const nextId = this.items.length === 0 ? 1 : Math.max(...this.items.map(item => item.id)) + 1;
        const nextname = name.trim() ?? '';

        const created = {
            id: nextId,
            name: nextname,
            description: description ?? '',
            documentCount: 0,
            createdBy: 'users',
            createdAt: now,
            updatedAt: now
        };

        this.items.push(created);

        return created;
    };

    // 查询一条
    findOne(id: number) {
        const found = this.items.find(item => item.id === id)
        if (!found) {
             throw new NotFoundException({
                code: 'KB_NOT_FOUND',
                message: `知识库ID${id}不存在`
            })
        }

        return found;
    }

    // 编辑
    update(id: number, data: { name?: string, description?: string }) {
        const { name, description } = data;

        // 找到该数据的位置，没找到返回-1
        const index = this.items.findIndex(item => item.id === id);

        if (index < 0) {
            throw new NotFoundException({
                code: 'KB_NOT_FOUND',
                message: `知识库ID${id}不存在`
            })
        };

        //id为0时就true了
        // if(!id) {
        //     throw new NotFoundException(`知识库ID${id}不存在`)
        // }


        const foundData = this.items[index];

        this.items[index] = {
            ...foundData,
            ...(name !== undefined ? { name } : {}),
            ...(description !== undefined ? { description } : {}),
            updatedAt: new Date().toISOString()
        };

        return this.items[index];
    }

    // 删除
    remove(id: number) {
        const index = this.items.findIndex(item => item.id === id);

        if (index < 0) {
            throw new NotFoundException({
                code: 'KB_NOT_FOUND',
                message: `知识库ID${id}不存在`
            })
        };

        // splice(index, 1) 的返回值是 「被删掉的元素组成的数组」
        // [ { id: 2, name: '...', ... } ]   // 外面还有一层 []
        const [removed] = this.items.splice(index, 1);

        return removed
    }
}
