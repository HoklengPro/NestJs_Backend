import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly notifications: NotificationsService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      item: dto.item,
      quantity: dto.quantity ?? 1,
      price: dto.price,
    });

    const saved = await this.orderRepo.save(order);

    this.notifications.notify('order_created', {
      orderId: saved.orderId,
      item: saved.item,
      price: saved.price,
    });

    return saved;
  }

  async findAll() {
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }
}
