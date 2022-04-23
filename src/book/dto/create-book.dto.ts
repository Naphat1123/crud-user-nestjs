import { Exclude, Expose } from '@nestjs/class-transformer';

export class CreateBookDto {
  @Exclude()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  price: number;
}
