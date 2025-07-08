import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  // standalone: false,
})
export class TodoForm implements OnInit{
  todoList: ToDo[] = [];
  tagsList: string[] = [];
  name = new FormControl('');

  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.tagsList = this.todoService.fetchTagsList();
    this.todoList = this.todoService.fetchTodoList();
  }

  onSubmit(formData: NgForm) {
    const newTodo: ToDo = new ToDo();
    newTodo.name = formData.value.name;
    newTodo.description = formData.value.description;
    newTodo.type = formData.value.tag;

    this.todoList.push(newTodo);
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }
}
