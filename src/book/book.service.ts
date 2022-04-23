import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    return await this.bookRepository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return await this.bookRepository.delete(id);
  }

  async getBookByPrice(price: number): Promise<CreateBookDto[]> {
    const builder = this.bookRepository.createQueryBuilder('book');

    if (price) {
      builder.andWhere('"price" >= :price', { price });
    }

    const entities = await builder.getMany();

    return plainToClass(CreateBookDto, entities);
  }
}
