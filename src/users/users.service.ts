import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { catchError } from 'src/util/error';
import { successRes } from 'src/util/success';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existEmail = await this.userRepo.findOne({
        where: { email: createUserDto.email },
      });

      if (existEmail) {
        throw new ConflictException('Email already exists');
      }

      const existUsername = await this.userRepo.findOne({
        where: { username: createUserDto.username },
      });

      if (existUsername) {
        throw new ConflictException('Username already exists');
      }

      const existPhoneNumber = await this.userRepo.findOne({
        where: { phone_number: createUserDto.phone_number },
      });

      if (existPhoneNumber) {
        throw new ConflictException('PhoneNumber already exists');
      }

      if (createUserDto.password !== createUserDto.confirm_pass) {
        throw new BadRequestException('Passwords do not match');
      }

      const user = this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
      return successRes(user, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.find();
      return successRes(users);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User id not found');
      }
      return successRes(user);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: number, updateUserdto: UpdateUserDto) {
    try {
      if (updateUserdto.username) {
        const existUsername = await this.userRepo.findOne({
          where: { username: updateUserdto.username },
        });

        if (existUsername) {
          throw new ConflictException('Username already exists');
        }
      }

      if (updateUserdto.email) {
        const existEmail = await this.userRepo.findOne({
          where: { email: updateUserdto.email },
        });

        if (existEmail) {
          throw new ConflictException('Email already exists');
        }
      }

      if (updateUserdto.phone_number) {
        const existPhoneNumber = await this.userRepo.findOne({
          where: { phone_number: updateUserdto.phone_number },
        });

        if (existPhoneNumber) {
          throw new ConflictException('PhoneNumber already exists');
        }
      }

      if (updateUserdto.password !== updateUserdto.confirm_pass) {
        throw new BadRequestException('Passwords do not match');
      }

      const exists = await this.userRepo.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('User not found');
      }

      const old = await this.userRepo.update(id, updateUserdto);
      const updateUser = await this.userRepo.findOne({ where: { id } });
      return successRes(updateUser);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: number) {
    try {
      const existsUser = await this.userRepo.findOne({ where: { id } });

      if (!existsUser) {
        throw new NotFoundException('User not found');
      }
      await this.userRepo.delete(id);
      return successRes();
    } catch (error) {
      return catchError(error);
    }
  }
}
