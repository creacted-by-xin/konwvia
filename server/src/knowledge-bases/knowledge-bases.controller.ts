import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { KnowledgeBasesService } from './knowledge-bases.service.js';

@Controller('knowledge-bases')
export class KnowledgeBasesController {
    constructor(private readonly knowledgeBasesService: KnowledgeBasesService) {}

    @Get()
    findAll() {
        return this.knowledgeBasesService.findAll()
    }

    @Post()
    create(@Body() body: {name: string, description: string}) {
        return this.knowledgeBasesService.create(body) ;
    }

    @Get(':id')
    findOne(@Param('id') id: string ) {
        return this.knowledgeBasesService.findOne(Number(id)) ;
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: {name?: string, description?: string}
    ) {
        return this.knowledgeBasesService.update(Number(id), body) ;
    };


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.knowledgeBasesService.remove(Number(id)) ;
    }
}
