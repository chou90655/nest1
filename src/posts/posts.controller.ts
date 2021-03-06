import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'; // prettier-ignore
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PostModule } from './post.module';
class CreatePostDto {
  @ApiProperty({ description: '帖子标题' })
  title: string;
  @ApiProperty({ description: '帖子内容' })
  content: string;
}
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '帖子列表' })
  async index() {
    return await PostModule.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await PostModule.create(createPostDto);
    return createPostDto;
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    return await PostModule.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  update(@Param('id') id: string, @Body() body: CreatePostDto) {
    console.log(id, body);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  remove(@Param('id') id: string) {
    console.log(id);
    return {
      success: true,
    };
  }
}
