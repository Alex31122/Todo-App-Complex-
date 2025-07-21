import { Component, OnInit, NgModule, output, input } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TodoService } from '../../service/todo-service';
import { count, Subscription } from 'rxjs';

@Component({
  selector: 'app-all-tasks',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks implements OnInit{
  todoList: ToDo[] = [];
  selection = output<string>();
  dateString: string = '';
  private mensajeSubscription: Subscription | undefined;
  lista: ToDo[] =[];
  countCompleted = 0;
  progressPercentage: number = 0;
  constructor(private todoService: TodoService){}
  ngOnInit(){
    this.dateString = this.todoService.dateString;
    console.log("ACTUALL VIEW");
    this.todoService._selectionObservable.subscribe({
      next: (data) => {
        console.log("SELECTION OBSERVABLE DATA");
        console.log(data);
      }
    });
    console.log("Today is: ");
    console.log(this.dateString);

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
    this.todoService.addTodoListToLocalStorage(this.todoList);
  }
  sendSelectionToService(){
    this.todoService._selectionObservable.next("add_todo");
  }
  
}
