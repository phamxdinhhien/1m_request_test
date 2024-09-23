import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { Order } from 'src/shared/entities/order.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RMQ_EXCHANGE } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: RMQ_EXCHANGE,
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672',
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
