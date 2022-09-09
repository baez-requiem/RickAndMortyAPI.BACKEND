import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Context } from '../context'
import { User } from '../models/User'

import { compare, hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

@InputType()
class UserInputData {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  name: string
}

@InputType()
class UserLoginInputData {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
class UserWithToken {
  @Field()
  user_id: string

  @Field()
  token: string
}

@ObjectType()
class SignUpResponse {
  @Field()
  status: boolean

  @Field()
  message: string
}

@Resolver()
export class UserResolver {
  @Query(returns => User, { nullable: true })
  async privateInfo(
    @Arg('token') token: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!dbToken) return null

    const { user } = dbToken

    return user
  }


  @Mutation(returns => SignUpResponse)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<SignUpResponse> {

    const userExist = await ctx.prisma.users.findUnique({
      where: { email: data.email }
    })

    if (userExist) {
      return {
        status: false,
        message: 'Email is already in use'
      }
    }

    const hashedPassword = await hash(data.password, 10)
    const hasCreateNewUser = await ctx.prisma.users.create({ data: {... data, password: hashedPassword} })

    if (hasCreateNewUser) {
      return {
        status: true,
        message: 'Success'
      }
    }

    return {
      status: false,
      message: 'An unknown error has occurred'
    }
  }

  @Mutation(returns => UserWithToken, { nullable: true })
  async login(
    @Arg('data') data: UserLoginInputData,
    @Ctx() ctx: Context
  ): Promise<{user_id: string, token: string}|null> {
    const user = await ctx.prisma.users.findUnique({
      where: { email: data.email }
    })

    if (!user) { return null }

    const validation = await compare(data.password, user.password)

    if (!validation) { return null }

    const tokenCode = uuid()

    const token = await ctx.prisma.tokens.create({
      data: {
        token: tokenCode,
        user: {
          connect: { id: user.id }
        }
      }
    })

    return { user_id: user.id, token: token.token }
  }
}