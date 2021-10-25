import { Controller, Get } from '@nestjs/common';

@Controller('journals')
export class JournalsController {

  @Get()
  findAll() {
    return 'This is journals endpoint';
  }

}
