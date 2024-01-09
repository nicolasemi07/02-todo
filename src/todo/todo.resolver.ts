import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregation.type';

@Resolver(() => Todo) // "En este Resolver vamos a trabajar todo lo relacionado a Todo's"
export class TodoResolver {

  constructor(private readonly todoService: TodoService) { }

  // ----------------------------------------------------------------------

  @Query(() => [Todo], {
    name: 'findAllTodos'
  })
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  // ----------------------------------------------------------------------

  @Query(() => Todo, {
    name: 'findOneTodo'
  })
  findOne(@Args('todoId', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  // ----------------------------------------------------------------------

  @Mutation(() => Todo, {
    name: 'createTodo'
  })
  createOneTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    // console.log({ createTodoInput });
    return this.todoService.create(createTodoInput);
  }

  // ----------------------------------------------------------------------

  @Mutation(() => Todo, {
    name: 'updateTodo'
  })
  updateOneTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }

  // ----------------------------------------------------------------------

  @Mutation(() => Boolean, {
    name: 'removeTodo'
  })
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }

  // ----------------------------------------------------------------------
  // Agregations:

  // Forma 1:

  @Query(() => Int, { name: 'totalTodos', deprecationReason: 'Optimizado en Query *aggregations*' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'completedTodos', deprecationReason: 'Optimizado en Query *aggregations*' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'pendingTodos', deprecationReason: 'Optimizado en Query *aggregations*' })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  // Forma 2 (usando AggregationsType):

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos
    };
  }

  // ----------------------------------------------------------------------

}

/*
Formas de usar "fragments" (fragmentos) en Apollo Studio (sería GraphQl en realidad, no?)
Estos fragments sirven para no tener que repetir la info que quiero que me devuelva
el endpoint por cada registro. La idea es crear un fragmento de la info que quiero que
me devuelva, y así reutilizar código

{
  _todo1: todo(id: 1) {
    ...fields
  }
  _todo2: todo(id: 2) {
    ...fields
  }
  _todo3: todo(id: 3) {
    ...ids
  }
}

fragment fields on Todo { ----> "fields" es un nombre que se le puede cambiar
  id
  description
  done
}

fragment ids on Todo { ----> este es otro fragment que devuelve solo los IDs
  id
}

*/
