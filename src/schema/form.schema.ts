import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  fullNames: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  pickUpPoint: string;

  @Prop()
  comment: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);