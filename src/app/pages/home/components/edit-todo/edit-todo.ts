import { Component, inject, input, Input } from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { ToDo } from '../../models/todoModel';

@Component({
  selector: 'app-edit-todo',
  imports: [],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css'
})
export class EditTodo {
  todoService = inject(TodoService);
  todo: ToDo = this.todoService.actuallTodo;
  constructor(){
    this.todoService._actualTodoItem.subscribe({
      next: (data) => {
        console.log("Data Fetched From Edit Component");
        console.log(data);
      }
    });
  }


}
