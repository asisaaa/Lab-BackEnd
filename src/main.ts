import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin :"*"
  })

  app.use(cookieParser())

  const config = new DocumentBuilder ()
  .setTitle('Latihan Nest JS kelas - B')
  .setDescription(`Mar'atul Azizah-105841105222`)
  .setVersion('0.1')
  .addTag('Latihan 1')
  .addBearerAuth()
  .build();


  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs',app,documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
