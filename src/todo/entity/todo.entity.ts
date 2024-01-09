// "entity" es como un "model"

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType() // Objeto personalizado que va a reconocer GraphQL
export class Todo {

  @Field(() => Int, {})
  id: number;

  @Field(() => String, {})
  description: string;

  @Field(() => Boolean, {})
  done: boolean = false;

}
