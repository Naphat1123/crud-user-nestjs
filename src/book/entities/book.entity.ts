import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('book', { schema: 'public' })
export class Book {
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  price: number;
}
