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
    this.setTagsAndTodosList();
  }

  onSubmit(formData: NgForm) {
    const newTodo: ToDo = new ToDo(formData.value);
    this.todoList.push(newTodo);
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }

  setTagsAndTodosList(){
    this.tagsList = this.todoService.fetchTagsList();
    this.todoList = this.todoService.fetchTodoList();
  }
}
