import { Component } from '@angular/core';
import { AllTasks } from "./components/all-tasks/all-tasks";
import { AddTodo } from "./components/add-todo/add-todo";

@Component({
  selector: 'app-home',
  imports: [AllTasks, AddTodo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
