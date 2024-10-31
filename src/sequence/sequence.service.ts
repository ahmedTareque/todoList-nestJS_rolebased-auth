import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sequence } from './schemas/sequence.schema';

@Injectable()
export class SequenceService {
  constructor(@InjectModel(Sequence.name) private sequenceModel: Model<Sequence>) {}

  async getNextSequence(sequenceName: string): Promise<number> {
    const sequence = await this.sequenceModel.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return sequence.value;
  }
}
