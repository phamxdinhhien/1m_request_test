import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  stock: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price: number;
}
