import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/pizza')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/bestellungen')
  getBestellungen(): string {
    return 'Bestellungen';
  }

  @Get('/bestellung')
  getBestellung(): string {
    return 'Bestellung kommt hier an';
  }
}
