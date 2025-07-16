import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Tag } from '../../models/tagModel';
@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, FormsModule, MatDatepicker, MatInputModule, MatNativeDateModule, MatDatepickerModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  standalone: true,
})
export class TodoForm implements OnInit{
  todoList: ToDo[] = [];
  tagsList: Tag[] = [];
  dateString: string = '';

  constructor(private todoService: TodoService){}

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    tag: new FormControl('', Validators.required),
    is_important: new FormControl(false),
    due_date: new FormControl(new Date()),
  });

  ngOnInit(){
    this.setTagsAndTodosList();
    this.todoForm.controls.tag.setValue('home');
    this.dateString = this.todoService.dateString;
  }

  onSubmit() {
    const newTag = new Tag();
    if(this.todoForm.value.tag){
      newTag.name = this.todoForm.value.tag;
      const findTag = this.tagsList.filter(s => s.name = newTag.name);
      newTag.color = findTag[0].color;
    }
    const newTodoData = {
      name: this.todoForm.value.name || '',
      description: this.todoForm.value.description || '',
      tag: newTag,
      is_important: this.todoForm.value.is_important || false,
      is_completed: false,
      due_date_string: this.todoForm.value.due_date?.toISOString() || ''
    };
    const newTodo = new ToDo(newTodoData);
    console.log('Form Control Value:', this.todoForm.value);

    this.todoList.push(newTodo);
    this.todoService.addTodoListToLocalStorage(this.todoList);
    this.todoForm.reset();
    this.todoForm.controls.tag.setValue('home');
  }

  setTagsAndTodosList(){
    this.tagsList = this.todoService.tagsList;
    this.todoList = this.todoService.todoList;
  }
}
