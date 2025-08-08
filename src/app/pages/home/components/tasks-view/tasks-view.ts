import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TodoService } from '../../service/todo-service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DatePipe2 } from '../../../../shared/pipes/date-pipe';

@Component({
  selector: 'app-tasks-view',
  imports: [ReactiveFormsModule, FormsModule, DatePipe, DatePipe2],
  templateUrl: './tasks-view.html',
  styleUrl: './tasks-view.css'
})
export class TasksView implements OnInit, OnDestroy{
  todoList: ToDo[] = [];
  date: Date = new Date();
  dateString: string = '';
  countCompleted = 0;
  progressPercentage = 0;
  private currentListSubscription: Subscription | undefined;
  private todoService = inject(TodoService);

  ngOnInit(){
    this.dateString = this.todoService.dateString;
    this.currentListSubscription = this.todoService.currentList$.subscribe(data => {
      console.log("Current List: ", data);
      this.todoList = data;
      this.countCompleted = 0;
      this.todoList.forEach(el => (el.is_completed ? this.countCompleted++ : this.countCompleted += 0))
      this.progressPercentage = Math.round(this.countCompleted * 100 / this.todoList.length);
    });
  }

  ngOnDestroy(): void {
    this.currentListSubscription?.unsubscribe();
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
