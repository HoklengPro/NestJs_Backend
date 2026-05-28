import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  price: number;

  /** GraphQL ID arrives as a string; coerce before @IsNumber() runs. */
  @Field(() => ID)
  @Type(() => Number)
  @IsNumber()
  categoryId: number;
}
