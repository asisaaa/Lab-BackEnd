import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret : "a123b123c123",
      global : true
}),
AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
