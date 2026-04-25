import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => ID)
  @IsNumber()
  categoryId: number;
}
