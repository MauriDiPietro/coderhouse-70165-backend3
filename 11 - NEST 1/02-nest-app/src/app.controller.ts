import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/saludo')
  getHello(): string {
    return this.appService.getHello();
  }
}
