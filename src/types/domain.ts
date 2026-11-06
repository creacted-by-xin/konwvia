export interface UserType {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface KnowledgeBaseType {
    id: number;
    name: string;
    description: string;
    documentCount: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface DocumentType {
    id: number
    knowledgeBaseId: number
    name: string
    fileType: string
    fileSize: number
    status: 'pending' | 'processing' | 'ready' | 'failed'
    progress: number
    uploadedBy: string
    uploadedAt: string
}


export interface ChatMessageType {
    id: number;
    knowledgeBaseId: number;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
}

export interface ChatSessionType {
    id: number;
    knowledgeBaseId: number;
    messages: ChatMessageType[];
    createdAt: string;
}   