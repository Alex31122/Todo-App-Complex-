import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';import { Component } from '@angular/core';
import { ToDo } from '../../models/todoModel';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css'
})
export class AddTodo {
  todo = new ToDo();
  todoListJson = localStorage.getItem('todoList');
  todoList: ToDo[] = [];
  listOptions = ["work", "home", "study"];
  tagsListJson = localStorage.getItem('tagsList');
  tagsList: string[] = [];

  name = new FormControl('');
  description = new FormControl('');
  tag = new FormControl<string | null>("home");

  constructor(){
    // localStorage.removeItem('todoList');
    // localStorage.removeItem('tagsList');
    if(this.todoListJson){
      this.todoList = JSON.parse(this.todoListJson);
      console.log("To-Do List on local Storage");
      console.log(this.todoList);
    }

    if(this.tagsListJson){
      this.tagsList = JSON.parse(this.tagsListJson);
      console.log("Tags List on local Storage");
      console.log(this.tagsList);
    }
  }

  addTodoToTodoList(name: string, description: string, type: string): ToDo {
    const newTodo: ToDo = new ToDo();
    newTodo.name = name;
    newTodo.description = description;
    newTodo.type = type;

    this.todoList.push(newTodo);

    this.addTodoListToLocalStorage();
    return newTodo;
  }

  addTodoListToLocalStorage(){
    const TodoList = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', TodoList);
  }
}
