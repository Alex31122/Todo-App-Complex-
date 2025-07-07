import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  // standalone: false,
})
export class TodoForm {
  todoList: ToDo[] = [];
  tagsList: string[] = [];
  
  listOptions = ["work", "home", "study"];

  name = new FormControl('');
  description = new FormControl('');
  tag = new FormControl<string | null>("home");

  constructor(private todoService: TodoService){
    this.todoList = this.todoService.fetchTodoList();
    this.tagsList = this.todoService.fetchTagsList();
  }

  addTodoToTodoList(name: string, description: string, type: string): ToDo {
    const newTodo: ToDo = new ToDo();
    newTodo.name = name;
    newTodo.description = description;
    newTodo.type = type;

    this.todoList.push(newTodo);
    this.todoService.addTodoListToLocalStorage(this.todoList);
    return newTodo;
  }

  onSubmit(f: NgForm) {
    this.addTodoToTodoList(f.value.name, f.value.description, "l");
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }
}
