// import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { Home } from "./pages/home/home";

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'todo-app';
}
