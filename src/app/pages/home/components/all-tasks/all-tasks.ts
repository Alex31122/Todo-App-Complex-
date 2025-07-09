import { Component, OnInit, NgModule, output } from '@angular/core';
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
  selection = output<string>();
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

  sendSelectionToHome(){
    this.selection.emit("add_todo");
  }

}
