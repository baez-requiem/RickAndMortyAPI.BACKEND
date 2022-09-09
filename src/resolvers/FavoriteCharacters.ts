import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Context } from '../context'
import { FavoriteCharacters } from '../models/FavoriteCharacters'

@InputType()
class FavoriteCharacterInputData {  
  @Field(type => String)
  id_api: string

  @Field(type => String)
  name: string

  @Field(type => String)
  status: string

  @Field(type => String)
  species: string
  
  @Field(type => String)
  gender: string
  
  @Field(type => String)
  origin_name: string
  
  @Field(type => String)
  location_name: string

  @Field(type => String)
  image: string

  @Field(type => Date)
  created: Date

  @Field(type => [String])
  episode: string[]
}

@ObjectType()
class DefaultResponse {
  @Field()
  status: boolean

  @Field()
  message: string
}

@Resolver()
export class FavoriteCharactersResolver {

  @Query(returns => [FavoriteCharacters], { nullable: true })
  async favorites(
    @Arg('token') token: string,
    @Ctx() ctx: Context
  ): Promise<FavoriteCharacters[]|null> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!dbToken) {
      return null
    }

    const { user } = dbToken

    const response = await ctx.prisma.favoriteCharacters.findMany({
      where: { users_id: user.id }
    })

    return response
  }

  @Mutation(returns => DefaultResponse)
  async addFavoriteCharacter(
    @Arg('token') token: string,
    @Arg('data') data: FavoriteCharacterInputData,
    @Ctx() ctx: Context
  ): Promise<DefaultResponse> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!dbToken) {
      return {
        status: false,
        message: 'Invalid token'
      }
    }

    const { user } = dbToken
    
    const userFavoriteCharacters = await ctx.prisma.favoriteCharacters.findMany({
      where: {
        users_id: user.id
      }
    })

    const hasSaved = userFavoriteCharacters.filter(e => e.id_api === data.id_api).length

    if (hasSaved) {
      return {
        status: false,
        message: 'Character has already been saved'
      }
    }

    await ctx.prisma.favoriteCharacters.create({
      data: {
        ...data,
        user: {
          connect: { id: user.id }
        }
      }
    })

    return {
      status: true,
      message: 'Success'
    }
  }

  @Mutation(returns => DefaultResponse)
  async removeFavoriteCharacter(
    @Arg('token') token: string,
    @Arg('id_api') id_api: string,
    @Ctx() ctx: Context
  ): Promise<DefaultResponse> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!dbToken) {
      return {
        status: false,
        message: 'Invalid token'
      }
    }

    const { user } = dbToken
    
    await ctx.prisma.favoriteCharacters.deleteMany({
      where: {
        id_api,
        users_id: user.id
      }
    })

    return {
      status: true,
      message: 'Success'
    }
  }
}