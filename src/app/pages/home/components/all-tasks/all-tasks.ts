import { Component, OnInit, NgModule, output, input, inject } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TodoService } from '../../service/todo-service';
import { count, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DatePipe2 } from '../../../../shared/pipes/date-pipe';

@Component({
  selector: 'app-all-tasks',
  imports: [ReactiveFormsModule, FormsModule, DatePipe, DatePipe2],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks implements OnInit{
  todoList: ToDo[] = [];
  date: Date = new Date();
  dateString: string = '';
  private mensajeSubscription: Subscription | undefined;
  countCompleted = 0;
  progressPercentage = 0;
  private todoService = inject(TodoService);
  ngOnInit(){
    this.dateString = this.todoService.dateString;
    console.log("ACTUALL VIEW");
    this.todoService._selectionObservable.subscribe({
      next: (data) => {
        console.log("SELECTION OBSERVABLE DATA");
        console.log(data);
      }
    });
    this.mensajeSubscription = this.todoService.listaActual$.subscribe(mensaje => {
      console.log("Message", mensaje);
      this.todoList = mensaje;
      this.countCompleted = 0;
      this.todoList.forEach(el => (el.is_completed ? this.countCompleted++ : this.countCompleted += 0))
      this.progressPercentage = Math.round(this.countCompleted * 100 / this.todoList.length);
    });
  }


  onCheckboxChange(item: ToDo): void {
    item.is_completed? this.countCompleted++ : this.countCompleted--;
    this.progressPercentage = Math.round(this.countCompleted * 100 / this.todoList.length);
    this.todoService.addTodoListToLocalStorage(this.todoService.todoList);
  }
  sendSelectionToService(message: string, todo?: ToDo){
    this.todoService._selectionObservable.next(message);
    if(message == "edit" && todo){
      const index = this.todoService.todoList.findIndex(todo2 => todo2.name == todo.name);
      this.todoService._editIndexObservable.next(index);
    }
  }

}
