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
import { CreateClassDto, UpdateClassDto } from './dto';
import { ClassService } from './class.service';
import { IClass } from './interfaces/class.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  buildPaginationQuery,
  buildPaginationResponse,
  Pagination,
} from '../../common/utils/pagination.util';
import { FilterQuery, QueryOptions } from 'mongoose';

@ApiTags('Class')
@ApiBearerAuth()
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create class' })
  @ApiResponse({
    status: 201,
    description: 'Create class successfully',
  })
  @ApiBody({
    type: CreateClassDto,
    description: 'Create Class',
  })
  async create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all classes' })
  @ApiResponse({
    status: 200,
    description: 'The found all records',
  })
  @ApiQuery({
    name: 'filter',
    example: {
      _id: '65016188e3b6b5fb96694764',
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
    @Query('filter') filter?: FilterQuery<IClass>,
    @Query('queryOptions') queryOptions?: QueryOptions,
    @Query('totalCount', ParseBoolPipe) totalCount?: boolean,
  ): Promise<Pagination<IClass[]>> {
    if (filter) {
      filter = JSON.parse(filter as any);
    }
    if (queryOptions) {
      queryOptions = JSON.parse(queryOptions as any);
    }
    const query = buildPaginationQuery(filter, queryOptions);
    const classes = await this.classService.findAll(query, totalCount);
    return buildPaginationResponse(
      classes.data,
      query.queryOptions,
      classes.totalCount,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find class by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findOne(@Param('id') id: string): Promise<IClass> {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update class by id' })
  @ApiResponse({
    status: 200,
    description: 'Update record',
  })
  async updateOne(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<IClass> {
    return this.classService.updateById(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete class by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete class successfully',
  })
  async delete(@Param('id') id: string) {
    return this.classService.delete(id);
  }
}
