import { Body, Controller, Get, Post, Param, Patch, Delete, Query } from '@nestjs/common';
import { KnowledgeBasesService } from './knowledge-bases.service.js';
import { z } from 'zod';
import { createKnowledgeBaseSchema, updateKnowledgeBaseSchema, listKnowledgeBasesQuerySchema } from './dto/create-knowledge-base.dto.js';
import type { createKnowledgeBaseDto, updateKnowledgeBaseDto, listKnowledgeBasesQueryDto } from './dto/create-knowledge-base.dto.js';

@Controller('knowledge-bases')
export class KnowledgeBasesController {
    constructor(private readonly knowledgeBasesService: KnowledgeBasesService) {}

    @Get()
    findAll(@Query({schema: listKnowledgeBasesQuerySchema}) query: listKnowledgeBasesQueryDto) {
        return this.knowledgeBasesService.findAll(query)
    }

    @Post()
    create(@Body({schema: createKnowledgeBaseSchema}) body: createKnowledgeBaseDto) {
        return this.knowledgeBasesService.create(body) ;
    }

    @Get(':id')
    // schema 通过后 id 已经是 number，类型可写成 id: number，并去掉 Number(id)
    findOne(@Param('id', {schema: z.coerce.number().int().positive()}) id: number ) {
        return this.knowledgeBasesService.findOne(id) ;
    }

    @Patch(':id')
    update(
        @Param('id', {schema: z.coerce.number().int().positive()}) id: number,
        @Body({schema: updateKnowledgeBaseSchema}) body: updateKnowledgeBaseDto
    ) {
        return this.knowledgeBasesService.update(id, body) ;
    };


    @Delete(':id')
    remove(@Param('id', {schema: z.coerce.number().int().positive()}) id: number) {
        return this.knowledgeBasesService.remove(id) ;
    }
}
