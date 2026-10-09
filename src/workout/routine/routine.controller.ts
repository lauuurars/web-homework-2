import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Permissions } from '../../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../../auth/guards/permissions/permissions.guard';
import { PositiveIntPipe } from '../../common/pipes/positive-int-pipe';

import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineService } from './routine.service';

@Controller('routines')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineController {
    constructor(private readonly routineService: RoutineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_routine')
    create(@Body() createRoutineDto: CreateRoutineDto) {
        return this.routineService.create(createRoutineDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions('read_routine')
    findAll() {
        return this.routineService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('read_routine')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.routineService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('update_routine')
    update(@Param('id', PositiveIntPipe) id: number, @Body() updateRoutineDto: UpdateRoutineDto) {
        return this.routineService.update(id, updateRoutineDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('delete_routine')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.routineService.remove(id);
    }
}
