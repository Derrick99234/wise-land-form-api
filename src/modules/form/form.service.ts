import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from 'src/schema/form.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class FormService {
    constructor(
        @InjectModel(Form.name) private formModal: Model<Form>,
        private mailerService: MailerService,
    ) {}

    async createForm(createFormDto: CreateFormDto) {
        try {
            const form = new this.formModal(createFormDto);
            await this.mailerService.sendWelcomeMessage({email: createFormDto.email, fullNames: createFormDto.fullNames, phone: createFormDto.phone});
            return form.save();
        } catch (error) {
            throw new InternalServerErrorException(`Error while saving form data: ${error}`);
        }
    }
}
