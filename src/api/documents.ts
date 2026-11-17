import { delay } from "./knowledgeBases";
import { mockDocuments } from "../mocks/knowledgeBases";
import type { DocumentType } from "../types/domain";


export async function listDocuments(signal: AbortSignal): Promise<DocumentType[]> {
    await delay(1000, signal);

    return mockDocuments.map(item=> ({...item}))
}