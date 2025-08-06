import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Component, HostAttributeToken, inject, input, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { TodoService } from '../../service/todo-service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Tag } from '../../models/tagModel';
import { NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DatePipe2 } from '../../../../shared/pipes/date-pipe';

@Component({
  selector: 'app-todo-form',
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    MatDatepicker, 
    MatInputModule, 
    MatNativeDateModule, 
    MatDatepickerModule, 
    NgStyle,
    DatePipe,
    DatePipe2
  ],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
  standalone: true,
})
export class TodoForm implements OnInit{
  todoService = inject(TodoService);
  todoList: ToDo[] = [];
  tagsList: Tag[] = [];
  dateString: string = '';
  color: string = '';
  todoIndex = input<number>(-1);
  todoInfo: ToDo  = new ToDo();
  is_editing: Boolean = false;
  display_selector = false;
  tag_selector = false;

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    tag: new FormControl('', Validators.required),
    is_important: new FormControl(false),
    due_date: new FormControl(new Date()),
  });

  ngOnInit(){
    this.todoForm.controls.tag.setValue(this.todoService.tagsList[0].name ?? 'home');
    if(this.todoIndex() >= 0){
      this.todoInfo = this.todoService.todoList.at(this.todoIndex()) ?? this.todoInfo;
      this.todoForm.setValue(this.transformTodoToFormValues(this.todoInfo));
      this.is_editing = true;
    }
    this.todoService._editIndexObservable.subscribe({
      next: (data) => {      
        this.todoInfo = this.todoService.todoList.at(data) ?? this.todoInfo;
        this.todoForm.setValue(this.transformTodoToFormValues(this.todoInfo));
        this.is_editing = true;
      }
    });

    this.setTagsAndTodosList();
    this.color = this.todoService.tagsList.find(s => s.name == "Work")?.color ?? "blue";
    this.dateString = this.todoService.dateString;
  }

  transformTodoToFormValues(todo: ToDo){
    const todoFormValue = {
      name: todo.name,
      description: todo.description,
      tag: todo.tag.name,
      is_important: todo.is_important,
      due_date: todo.due_date,
    };
    return todoFormValue;
  }

  changeValue(option: number){
    if(option == 1){
      this.display_selector = !this.display_selector;
    }
    else{
      this.tag_selector = !this.tag_selector;
    }
  }
  setColor(s?: string){
    if(s){
      const tag = this.tagsList.filter(t => t.name == s);
      this.color = tag.at(0)?.color ?? '';
    }
    console.log(s);
  }

  onSubmit() {
    const newTag = new Tag();
    if(this.todoForm.value.tag){
      newTag.name = this.todoForm.value.tag;
      const findTag = this.tagsList.find(tag => tag.name == newTag.name);
      newTag.color = findTag?.color ?? '';
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

    if(!this.todoForm.dirty){
      this.todoForm.reset();
      this.todoForm.controls.tag.setValue(this.todoService.tagsList[0].name);
      this.todoForm.controls.due_date.setValue(this.todoService.date);
      this.is_editing = false;
      console.log("YOU DIDN'T CHANGE THE TODO");
      return;
    }
    if(this.todoIndex() >= 0 && this.is_editing){
      newTodo.due_date = this.todoForm.value?.due_date ?? this.todoInfo.due_date;
      newTodo.is_completed = this.todoInfo.is_completed;
      this.todoService.todoList[this.todoIndex()] = newTodo;
    }else{
      this.todoList.push(newTodo);
    }
    this.todoService.addTodoListToLocalStorage(this.todoService.todoList);
    this.todoForm.reset();
    this.todoForm.controls.tag.setValue(this.todoService.tagsList[0].name);
    this.todoForm.controls.due_date.setValue(this.todoService.date);
    this.is_editing = false;
  }

  deleteTodo(){
    this.todoService.todoList.splice(this.todoIndex(), 1);
    this.todoService.addTodoListToLocalStorage(this.todoService.todoList);
    this.todoForm.reset();
    this.todoForm.controls.due_date.setValue(this.todoService.date);
    this.todoForm.controls.tag.setValue(this.todoService.tagsList[0].name);
    this.is_editing = false;
  }

  setTagsAndTodosList(){
    this.tagsList = this.todoService.tagsList;
    this.todoList = this.todoService.todoList;
  }
}
