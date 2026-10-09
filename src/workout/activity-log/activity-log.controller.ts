import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Permissions } from '../../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../../auth/guards/permissions/permissions.guard';
import { PositiveIntPipe } from '../../common/pipes/positive-int-pipe';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-logs')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_activity')
    create(@Body() createActivityLogDto: CreateActivityLogDto) {
        return this.activityLogService.create(createActivityLogDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions('read_activity')
    findAll() {
        return this.activityLogService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('read_activity')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.activityLogService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('update_activity')
    update(@Param('id', PositiveIntPipe) id: number, @Body() updateActivityLogDto: UpdateActivityLogDto) {
        return this.activityLogService.update(id, updateActivityLogDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('delete_activity')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.activityLogService.remove(id);
    }
}
