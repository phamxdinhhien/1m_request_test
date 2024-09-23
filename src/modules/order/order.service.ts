import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from './dto/create_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/shared/entities/order.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RMQ_EXCHANGE } from 'src/constants';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class OrderService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly amqpConnection: AmqpConnection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createOrder(orderInfo: CreateOrderDto) {
    try {
      const { customerId, quantity } = orderInfo;
      await this.productRepository.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          quantity VARCHAR(255) NOT NULL,
          customerId VARCHAR(255) NOT NULL
        )
      `);
      const order = this.orderRepository.create({
        customerId,
        quantity,
      });
      await this.orderRepository.save(order);
      await this.amqpConnection.publish(RMQ_EXCHANGE, 'order', {
        orderId: order.id,
        customerId,
        quantity,
      });

      return {
        message: 'Order received and queued',
      };
    } catch (error) {
      throw error;
    }
  }
}
