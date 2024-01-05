import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

/**
  Resolvers: Proveen las instrucciones para
  transformar las instrucciones provenientes
  del cliente en data que GraphQL puede
  utilizar. 
  Los resolvers son similares a los
  controladores tradicionales de un REST
  endpoint con Nest, pero son técnicamente
  "providers"
 */

@Resolver() // Viene de GraphQL
export class HelloWorldResolver {

  // ----------------------------------------------------------------------

  @Query(() => String, {
    name: 'hello', // Nombre que se va a mostrar en el playground
    description: 'Docu de mi primer endpoint '
  })
  helloWorld(): string {
    return `Hola mundo!!`;
  }

  // ----------------------------------------------------------------------

  @Query(() => Float, {
    name: 'randomNumber'
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  // ----------------------------------------------------------------------

  /**
   * Desglosando la línea:
   * " @Args('to', { type: () => Int, nullable: true }) "
   * Vemos que el "to" es el parámetro de entrada que espera el playground de Apollo
   * Pero si no le especificamos a GraphQL que el tipo de dato de entrada es Int,
   * puede recibir un float. Entonces debemos especificarlo tanto para GraphQL como
   * para TypeScript
   * 
   * También, la parte " nullable: true " dentro del Argumento indica que puede
   * tener un valor por defecto, y no es necesario el parámetro de entrada
   */

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Devuelve un número entero desde 0 a 10'
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) toParam: number = 6
  ): number {
    return Math.floor(Math.random() * toParam);
  }

  // ----------------------------------------------------------------------

}
