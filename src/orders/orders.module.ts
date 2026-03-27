import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Order } from 'src/database/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), NotificationsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
