import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { StudentService } from './student.service';
import { IStudent } from './interfaces/student.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterQuery, QueryOptions } from 'mongoose';
import {
  buildPaginationQuery,
  buildPaginationResponse,
  Pagination,
} from '../../common/utils/pagination.util';

@ApiTags('Student')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({
    status: 201,
    description: 'Create student successfully',
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all students' })
  @ApiResponse({
    status: 200,
    description: 'The found all records',
  })
  @ApiQuery({
    name: 'filter',
    example: {
      _id: '6501c47ea8781260d1b25796',
    },
    required: false,
  })
  @ApiQuery({
    name: 'queryOptions',
    example: {
      skip: 2,
      limit: 10,
    },
    required: false,
  })
  @ApiQuery({
    name: 'totalCount',
    example: true,
    required: false,
  })
  async findAll(
    @Query('filter') filter?: FilterQuery<IStudent>,
    @Query('queryOptions') queryOptions?: QueryOptions,
    @Query('totalCount', ParseBoolPipe) totalCount?: boolean,
  ): Promise<Pagination<IStudent[]>> {
    if (filter) {
      filter = JSON.parse(filter as any);
    }
    if (queryOptions) {
      queryOptions = JSON.parse(queryOptions as any);
    }
    const query = buildPaginationQuery(filter, queryOptions);
    const classes = await this.studentService.findAll(query, totalCount);
    return buildPaginationResponse(
      classes.data,
      query.queryOptions,
      classes.totalCount,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find student by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findOne(@Param('id') id: string): Promise<IStudent> {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async updateOne(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    return this.studentService.updateById(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete student successfully',
  })
  async delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
