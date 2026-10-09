import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { ActivityLogController } from './activity-log.controller';
import { ActivityLogService } from './activity-log.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLog, User, Routine])],
    controllers: [ActivityLogController],
    providers: [ActivityLogService],
    exports: [ActivityLogService],
})
export class ActivityLogModule {}
