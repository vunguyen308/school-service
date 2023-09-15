import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, HydratedDocument, Model, QueryOptions } from 'mongoose';
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

  async findAll(
    query?: {
      filter: FilterQuery<IStudent>;
      queryOptions: QueryOptions;
    },
    count?: boolean,
  ): Promise<{
    data: Array<HydratedDocument<IStudent>>;
    totalCount: number;
  }> {
    let totalCount: number;
    const filter = query.filter ?? {};
    const queryOption = query.queryOptions ?? {};
    const data = await this.studentModel
      .find(filter)
      .limit(queryOption.limit)
      .skip(queryOption.skip)
      .sort(queryOption.sort)
      .exec();
    if (count) {
      totalCount = await this.studentModel.count(filter).exec();
    }
    return { data, totalCount };
  }

  async findOne(id: string): Promise<IStudent> {
    return this.studentModel.findOne({ _id: id }).exec();
  }

  async updateById(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    return this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    const deletedStudent = await this.studentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedStudent;
  }
}
