import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

/**
 * Para la parte de las validaciones, ver que se usa el class-validator
 * (IMPORTANTE: ver la config del paquete entre líneas 8 y 13 del main.ts!)
 */

@InputType() // Tipo personalizado de entrada para crear un Todo
export class UpdateTodoInput {

  // ----------------------------------------------------------------------

  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  // ----------------------------------------------------------------------

  @Field(() => String, {
    description: 'Lo que queres hacer',
    nullable: true
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  // ----------------------------------------------------------------------

  @Field(() => Boolean, {
    nullable: true
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  // ----------------------------------------------------------------------

}
