import { prop, getModelForClass } from '@typegoose/typegoose';
class Post {
  @prop()
  public title?: string;
  @prop()
  public content?: string;
}

export const PostModule = getModelForClass(Post); // UserModel is a regular Mongoose Model with correct types
