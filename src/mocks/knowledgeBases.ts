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
  },
  {
    id: 4,
    knowledgeBaseId: 1,
    name: 'Document 4',
    fileType: 'pdf',
    fileSize: 4096,
    status: 'pending',
    progress: 0,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-03'
  },
  {
    id: 5,
    knowledgeBaseId: 2,
    name: 'Document 5',
    fileType: 'docx',
    fileSize: 3072,
    status: 'failed',
    progress: 30,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-03'
  },
  {
    id: 6,
    knowledgeBaseId: 3,
    name: 'Document 6',
    fileType: 'pdf',
    fileSize: 8192,
    status: 'ready',
    progress: 100,
    uploadedBy: '小王3',
    uploadedAt: '2026-01-04'
  },
  {
    id: 7,
    knowledgeBaseId: 3,
    name: 'Document 7',
    fileType: 'doc',
    fileSize: 1024,
    status: 'pending',
    progress: 0,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-04'
  },
  {
    id: 8,
    knowledgeBaseId: 1,
    name: 'Document 8',
    fileType: 'docx',
    fileSize: 5120,
    status: 'failed',
    progress: 70,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-05'
  },
  {
    id: 9,
    knowledgeBaseId: 2,
    name: 'Document 9',
    fileType: 'pdf',
    fileSize: 6144,
    status: 'ready',
    progress: 100,
    uploadedBy: '小王3',
    uploadedAt: '2026-01-05'
  },
  {
    id: 10,
    knowledgeBaseId: 3,
    name: 'Document 10',
    fileType: 'doc',
    fileSize: 2048,
    status: 'processing',
    progress: 80,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-06'
  },
  {
    id: 11,
    knowledgeBaseId: 1,
    name: 'Document 11',
    fileType: 'pdf',
    fileSize: 7168,
    status: 'pending',
    progress: 0,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-06'
  },
  {
    id: 12,
    knowledgeBaseId: 2,
    name: 'Document 12',
    fileType: 'docx',
    fileSize: 1024,
    status: 'ready',
    progress: 100,
    uploadedBy: '小王3',
    uploadedAt: '2026-01-07'
  },
  {
    id: 13,
    knowledgeBaseId: 3,
    name: 'Document 13',
    fileType: 'pdf',
    fileSize: 3072,
    status: 'failed',
    progress: 10,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-07'
  },
  {
    id: 14,
    knowledgeBaseId: 1,
    name: 'Document 14',
    fileType: 'doc',
    fileSize: 4096,
    status: 'processing',
    progress: 25,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-08'
  },
  {
    id: 15,
    knowledgeBaseId: 2,
    name: 'Document 15',
    fileType: 'pdf',
    fileSize: 5120,
    status: 'pending',
    progress: 0,
    uploadedBy: '小王3',
    uploadedAt: '2026-01-08'
  },
  {
    id: 16,
    knowledgeBaseId: 3,
    name: 'Document 16',
    fileType: 'docx',
    fileSize: 6144,
    status: 'ready',
    progress: 100,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-09'
  },
  {
    id: 17,
    knowledgeBaseId: 1,
    name: 'Document 17',
    fileType: 'doc',
    fileSize: 8192,
    status: 'failed',
    progress: 45,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-09'
  },
  {
    id: 18,
    knowledgeBaseId: 2,
    name: 'Document 18',
    fileType: 'pdf',
    fileSize: 2048,
    status: 'processing',
    progress: 65,
    uploadedBy: '小王3',
    uploadedAt: '2026-01-10'
  },
  {
    id: 19,
    knowledgeBaseId: 3,
    name: 'Document 19',
    fileType: 'pdf',
    fileSize: 1024,
    status: 'pending',
    progress: 0,
    uploadedBy: '小王1',
    uploadedAt: '2026-01-10'
  },
  {
    id: 20,
    knowledgeBaseId: 2,
    name: 'Document 20',
    fileType: 'doc',
    fileSize: 3072,
    status: 'ready',
    progress: 100,
    uploadedBy: '小王2',
    uploadedAt: '2026-01-11'
  }
];

