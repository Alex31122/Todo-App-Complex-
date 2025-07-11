import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, FormsModule, MatDatepicker, MatInputModule, MatNativeDateModule, MatDatepickerModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  standalone: true,
})
export class TodoForm implements OnInit{
  todoList: ToDo[] = [];
  tagsList: string[] = [];
  tagDefaultOption: string = 'home';
  dateString: string = '';

  constructor(private todoService: TodoService){}

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    tag: new FormControl('', Validators.required),
    is_important: new FormControl(false),
    due_date: new FormControl(),
  });

  ngOnInit(){
    this.setTagsAndTodosList();
    this.tagDefaultOption = this.tagsList[0];
    this.todoForm.controls.tag.setValue('home');
    this.dateString = this.todoService.dateString;
  }

  onSubmit() {
    const newTodoData = {
      name: this.todoForm.value.name || '',
      description: this.todoForm.value.description || '',
      tag: this.todoForm.value.tag || '',
      is_important: this.todoForm.value.is_important || false,
      is_completed: false,
      due_date: this.todoForm.value.due_date || null,
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
