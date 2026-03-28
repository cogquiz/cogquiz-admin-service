import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { WinstonLoggerService } from '../common/logger.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly logger: WinstonLoggerService,
  ) {}

  @Get('fetchAllUser')
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Res() response: Response,
  ) {
    try {
      const fetchAllUser = await this.adminService.findAll(
        page || 1,
        pageSize || 10,
      );
      if (fetchAllUser) {
        this.logger.info('Fetch users successfully');
        return response.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Fetch users successfully',
          data: fetchAllUser,
        });
      } else {
        this.logger.info('User not found');
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
    } catch (error) {
      this.logger.error(error.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  @Get('fetchContactUs')
  async findContactUs(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Res() response: Response,
  ) {
    try {
      const fetchContactUs = await this.adminService.findContactUs(
        page || 1,
        pageSize || 10,
      );
      if (fetchContactUs) {
        this.logger.info('Fetch contact-us successfully');
        return response.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Fetch contact-us successfully',
          data: fetchContactUs,
        });
      } else {
        this.logger.info('User not found');
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
    } catch (error) {
      this.logger.error(error.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
