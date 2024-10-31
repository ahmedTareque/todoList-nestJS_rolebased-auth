// src/sequence/sequence.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceService } from './sequence.service';
import { Sequence, SequenceSchema } from './schemas/sequence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sequence.name, schema: SequenceSchema }]), // Register the Sequence schema
  ],
  providers: [SequenceService], // Provide the SequenceService
  exports: [SequenceService], // Export the SequenceService for use in other modules
})
export class SequenceModule {}
