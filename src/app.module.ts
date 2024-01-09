import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      /**
       * Si quiero que el resto de las personas NO vean la docu del endpoint /graphql,
       * la línea de abajo se debe descomentar (por seguridad)
       * (esto puede ir en una variable de entorno)
       * 
       * Por otro lado, se tiene que desactivar para poder usar Apollo Studio!
       */
      playground: false,
      autoSchemaFile: join((process.cwd(), 'src/schema-gql')),
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    HelloWorldModule,
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
