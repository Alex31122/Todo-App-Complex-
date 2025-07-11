import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  standalone: true,
})
export class TodoForm implements OnInit{
  todoList: ToDo[] = [];
  tagsList: string[] = [];
  tagDefaultOption: string = 'home';

  constructor(private todoService: TodoService){}

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    tag: new FormControl('', Validators.required),
  });

  ngOnInit(){
    this.setTagsAndTodosList();
    this.tagDefaultOption = this.tagsList[0];
    this.todoForm.controls.tag.setValue('home');
  }

  onSubmit() {
    const newTodoData = {
      name: this.todoForm.value.name || '',
      description: this.todoForm.value.description || '',
      tag: this.todoForm.value.tag || '',
      is_completed: false
    };
    const newTodo = new ToDo(newTodoData);
    console.log('Form Control Value:', this.todoForm.value);

    this.todoList.push(newTodo);
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }

  setTagsAndTodosList(){
    this.tagsList = this.todoService.tagsList;
    this.todoList = this.todoService.todoList;
  }
}
