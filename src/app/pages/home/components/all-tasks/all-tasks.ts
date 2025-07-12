import { Component, OnInit, NgModule, output, input } from '@angular/core';
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
  todoCompletedList: ToDo[] = [];
  selection = output<string>();
  filter = input<string>();
  dateString: string = '';

  constructor(private todoService: TodoService){}
  ngOnInit(){
    this.setTodoList();
    this.setTodoCompletedList();
    this.dateString = this.todoService.dateString;
    console.log("Today is: ");
    console.log(this.dateString);
  }

  setTodoList(){
    this.todoList = this.todoService.todoList;
    if(this.filter()){
      if(this.filter() == 'is_important'){
        this.todoList = this.todoService.todoList.filter(s => s.is_important == true)
      }
      if(this.filter() == 'over_due'){
        this.todoList = this.todoService.todoList.filter(s => s.due_date.getDate() < 11);
        console.log("Today is: lo:");
        console.log(this.todoService.date.getDate());
        console.log(this.todoService.date.getFullYear())
        console.log("TODO LIST");
        console.log(this.todoList);
      }
    }
  }

  setTodoCompletedList(){
    console.log("TODO COMPLETED LIST:");
    for (const element of this.todoList) {
      if(element.is_completed == true){
        this.todoCompletedList.push(element);
      }
    }
  }


  onCheckboxChange(item: ToDo): void {
    this.todoService.addTodoListToLocalStorage(this.todoList);
    this.todoCompletedList = [];
    this.setTodoCompletedList();
  }

  sendSelectionToHome(){
    this.selection.emit("add_todo");
  }

}
