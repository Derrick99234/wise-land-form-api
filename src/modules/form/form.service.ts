import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from 'src/schema/form.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FormService {
    constructor(
        @InjectModel(Form.name) private formModal: Model<Form>
    ) {}

    createForm(createFormDto: CreateFormDto) {
        try {
            const { comment, fullNames, phone, pickUpPoint } = createFormDto;
            const form = new this.formModal({ comment, fullNames, phone, pickUpPoint });
            return form.save();
        } catch (error) {
            throw new InternalServerErrorException(`Error while saving form data: ${error}`);
        }
    }
}
