import { Field, ObjectType, ID  } from 'type-graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field(type => String)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field(type => String)
  password: string
  
  @Field(type => Date)
  created_at: Date
}