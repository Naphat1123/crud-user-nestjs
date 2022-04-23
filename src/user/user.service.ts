import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    createUserDto.uuid = uuid();
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new BadRequestException('user id is not exist');
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new BadRequestException('user id is not exist');
      }

      this.userRepository.delete(id);
      return {
        message: `user id ${id} has been deleted`,
      };
    } catch (error) {
      return new BadRequestException(`can't delete user id ${id}`)
    }
  }
}
