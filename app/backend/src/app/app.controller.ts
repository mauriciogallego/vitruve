import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  @ApiOperation({ summary: 'Root endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    content: {
      'application/json': {
        schema: { type: 'string' },
        example: 'Api',
      },
    },
  })
  @Public()
  @Get('/')
  getRoot(): string {
    return 'Api';
  }
}
