import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { IStudent } from './interfaces/student.interface';
import { STUDENT_PROVIDER_KEY } from './keys';

@Injectable()
export class StudentService {
  constructor(
    @Inject(STUDENT_PROVIDER_KEY)
    private readonly studentModel: Model<IStudent>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<IStudent> {
    return this.studentModel.create(createStudentDto);
  }

  async findAll(): Promise<IStudent[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<IStudent> {
    return this.studentModel.findOne({ _id: id }).exec();
  }

  async updateById(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto).exec();
  }

  async delete(id: string) {
    const deletedStudent = await this.studentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedStudent;
  }
}
