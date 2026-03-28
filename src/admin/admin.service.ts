import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from './entities/user.entity';
import { Contactus } from './entities/contactus.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userTable: Repository<User>,
    @InjectRepository(Contactus)
    private readonly contactusTable: Repository<Contactus>,
  ) {}

  async findAll(page: number, pageSize: number) {
    const [data, totalCount] = await this.userTable.findAndCount({
      where: { role: Not('Admin') },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { lastModified: 'DESC' },
    });

    return {
      data,
      page: Number(page),
      pageSize: Number(pageSize),
      totalCount,
    };
  }

  async findContactUs(page: number, pageSize: number) {
    const [data, totalCount] = await this.contactusTable.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { timestamp: 'DESC' },
    });

    return {
      data,
      page: Number(page),
      pageSize: Number(pageSize),
      totalCount,
    };
  }
}
