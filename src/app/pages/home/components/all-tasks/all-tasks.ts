import { Component, OnInit, NgModule } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TodoService } from '../../service/todo-service';

@Component({
  selector: 'app-all-tasks',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks implements OnInit{
  todoList: ToDo[] = [];

  constructor(private todoService: TodoService){}
  ngOnInit(){
    this.setTodoList();
  }
  
  setTodoList(){
    this.todoList = this.todoService.todoList;
  }

  onCheckboxChange(item: ToDo): void {
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }

}
