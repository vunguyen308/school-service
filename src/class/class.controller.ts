import { Controller, Get, Post, Body, Param, Delete, Patch} from '@nestjs/common';
import { CreateClassDto, UpdateClassDto } from './dto';
import { ClassService } from './class.service';
import { IClass } from './interfaces/class.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create class' })
  @ApiResponse({
    status: 201,
    description: 'Create class successfully',
  })
  async create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all classes' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findAll(): Promise<IClass[]> {
    return this.classService.findAll();
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
    description: 'The found record',
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
