import { Module } from '@nestjs/common';
import { HasuraProxyController } from './hasura-proxy.controller';

@Module({
  controllers: [HasuraProxyController],
})
export class HasuraProxyModule {}
