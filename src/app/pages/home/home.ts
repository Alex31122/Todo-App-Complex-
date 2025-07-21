import { Component, inject, OnInit } from '@angular/core';
import { AllTasks } from "./components/all-tasks/all-tasks";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { TagForm } from "./components/tag-form/tag-form";
import { TodoForm } from "./components/todo-form/todo-form";
import { TodoService } from './service/todo-service';

@Component({
  selector: 'app-home',
  imports: [AllTasks, Sidebar, TagForm, TodoForm],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  add_selection: string = '';
  todoService = inject(TodoService);

  ngOnInit(){
    this.todoService._selectionObservable.subscribe({
      next: (data: string) => {
        if(data.substring(0, 3) == "add"){
          this.add_selection = data;
        }
      }
    });
  }
  
}
