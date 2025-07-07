import { Component } from '@angular/core';
import { AllTasks } from "./components/all-tasks/all-tasks";
import { AddTodo } from "./components/add-todo/add-todo";
import { AddList } from "./components/add-list/add-list";
import { LeftSection } from "./components/left-section/left-section";

@Component({
  selector: 'app-home',
  imports: [AllTasks, AddTodo, AddList, LeftSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
