import type{ KnowledgeBaseType, DocumentType } from "../types/domain";

export const mockKnowledgeBases: KnowledgeBaseType[] = [
    {
        id: 1,
        name: 'John Brown',
        description: 'New York No. 1 Lake Park',
        documentCount: 32,
        createdBy: '小王',
        createdAt: '2026-01-01',
        updatedAt: '2026-02-02'
    },
    {
        id: 2,
        name: 'Jim Green',
        description: 'New York No. 1 Lake Park',
        documentCount: 30,
        createdBy: '小红',
        createdAt: '2026-01-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 3,
        name: 'Joe Black',
        description: 'New York No. 1 Lake Park',
        documentCount: 31,
        createdBy: '小盒',
        createdAt: '2026-01-03',
        updatedAt: '2026-02-02'
    },

];

export const mockDocuments: DocumentType[] = [
    {
        id: 1,
        knowledgeBaseId: 1,
        name: 'Document 1',
        fileType: 'pdf',
        fileSize: 1024,
        status: 'ready',
        progress: 100,
        uploadedBy: '小王1',
        uploadedAt: '2026-01-01'
    },
    {
        id: 2,
        knowledgeBaseId: 1,
        name: 'Document 2',
        fileType: 'doc',
        fileSize: 2048,
        status: 'processing',
        progress: 50,
        uploadedBy: '小王2',
        uploadedAt: '2026-01-02'
    },
    {
        id: 3,
        knowledgeBaseId: 2,
        name: 'Document 3',
        fileType: 'doc',
        fileSize: 2048,
        status: 'processing',
        progress: 50,
        uploadedBy: '小王3',
        uploadedAt: '2026-01-02'
    }
];
