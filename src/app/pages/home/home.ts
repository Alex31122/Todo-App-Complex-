import { Component } from '@angular/core';
import { AllTasks } from "./components/all-tasks/all-tasks";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { TagForm } from "./components/tag-form/tag-form";
import { TodoForm } from "./components/todo-form/todo-form";

@Component({
  selector: 'app-home',
  imports: [AllTasks, Sidebar, TagForm, TodoForm],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
