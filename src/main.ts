import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  // mongoose.connect('mongodb://localhost:27017/', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   dbName: 'posts',
  // });
  const app = await NestFactory.create(AppModule);

  // 使用管道
  app.useGlobalPipes(new ValidationPipe());
  // api 文档配置
  const config = new DocumentBuilder()
    .setTitle('NestJs blog api')
    .setDescription('我的第一个NestJs 项目')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // api 文档地址
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
