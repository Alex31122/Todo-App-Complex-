import { Component, OnInit } from '@angular/core';
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
  selection: string = '';
  selection2: string = '';
  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.fetchData();
    this.todoService._selectionObservable.subscribe({
      next: (data: string) => {
        if(data == 'add_tag'){
          console.log("YOU SELECTED TAG");
          this.selection = data;
        }
        else if(data == 'add_todo'){
          console.log("YOU SELECTED TODO");
          this.selection = data;
        }
      }
    });
  }

  fetchData(){
    this.todoService.fetchTagsList();
    this.todoService.fetchTodoList();
  }

  handleData(data: string): void{
    console.log("Received data on Home: ", data);
    this.selection = data;
  }
}
