import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

/**
 * Para la parte de las validaciones, ver que se usa el class-validator
 * (IMPORTANTE: ver la config del paquete entre líneas 8 y 13 del main.ts!)
 */

@InputType() // Tipo personalizado de entrada para crear un Todo
export class CreateTodoInput {

  @Field(() => String, {
    description: 'Lo que queres hacer'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description: string;

}
