import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateClassDto, UpdateClassDto } from './dto';
import { IClass } from './interfaces/class.interface';
import { CLASS_PROVIDER_KEY } from './keys';

@Injectable()
export class ClassService {
  constructor(
    @Inject(CLASS_PROVIDER_KEY) private readonly classModel: Model<IClass>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<IClass> {
    return this.classModel.create(createClassDto);
  }

  async findAll(): Promise<IClass[]> {
    return this.classModel.find().exec();
  }

  async findOne(id: string): Promise<IClass> {
    return this.classModel.findOne({ _id: id }).exec();
  }

  async updateById(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<IClass> {
    return this.classModel.findByIdAndUpdate(id, updateClassDto).exec();
  }

  async delete(id: string) {
    const deletedClass = await this.classModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedClass;
  }
}
