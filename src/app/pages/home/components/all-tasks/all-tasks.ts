import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../service/todo-service';

@Component({
  selector: 'app-all-tasks',
  imports: [ReactiveFormsModule],
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
    this.todoList = this.todoService.fetchTodoList();
  }

  onCheckboxChange(item: ToDo): void {
    item.is_completed = !item.is_completed;
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }

}
