import { Body, Controller, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('create')
  createFormDto(@Body() createForm: CreateFormDto) {
    return this.formService.createForm(createForm);
  }
}
