import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'datetime' })
  issuedAt: Date;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
