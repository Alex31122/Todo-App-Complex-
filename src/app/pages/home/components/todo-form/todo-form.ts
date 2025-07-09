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
  tagDefaultOption: string = '';

  nameControl = new FormControl('Initial Name', Validators.required);
  control = new FormControl('', { updateOn: 'submit' });
  constructor(private todoService: TodoService){}

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl(''),
  });

  ngOnInit(){
    this.setTagsAndTodosList();
    this.tagDefaultOption = this.tagsList[0];
  }

  onSubmit(formData: NgForm) {
    if(formData.valid){
      console.log('Form Control Value:', this.nameControl.value);
      const newTodo: ToDo = new ToDo(formData.value); 
      this.todoList.push(newTodo);
      this.todoService.addTodoListToLocalStorage(this.todoList);
      formData.resetForm();
    }
    else{
      console.log("El Formulario no es valido");
    }
  }

  onSubmit2() {
    console.log('Form Control Value:', this.todoForm.value);
  }

  setTagsAndTodosList(){
    this.tagsList = this.todoService.tagsList;
    this.todoList = this.todoService.todoList;
  }
}
