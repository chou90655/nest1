import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'; // prettier-ignore
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostShcema } from './post.module';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
  @ApiProperty({ description: '帖子内容' })
  content: string;
}
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostShcema) private readonly PostModle: ModelType<PostShcema>,
  ) {}
  @Get()
  @ApiOperation({ summary: '帖子列表' })
  async index() {
    return await this.PostModle.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.PostModle.create(createPostDto);
    return createPostDto;
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    return await this.PostModle.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(@Param('id') id: string, @Body() body: CreatePostDto) {
    await this.PostModle.findByIdAndUpdate(id, body);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.PostModle.findByIdAndRemove(id);
    return {
      success: true,
    };
  }
}
