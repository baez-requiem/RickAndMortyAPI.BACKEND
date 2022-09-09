import { Field, ObjectType, ID  } from 'type-graphql'

@ObjectType()
export class FavoriteCharacters {
  @Field(type => ID)
  id: string
  
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

  @Field(type => [String])
  episode: string[]

  @Field(type => Date)
  created_at: Date
  
  @Field(type => Date)
  created: Date
}