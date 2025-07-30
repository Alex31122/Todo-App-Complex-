import { Component, output } from '@angular/core';
import { ToDo } from '../../models/todoModel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks {
  todoList: ToDo[] = [];
  selection = output<string>();
  constructor(){
    this.setTodoList();
  }

  setTodoList(){
    const todoListJson = localStorage.getItem('todoList');
    this.todoList = todoListJson ? JSON.parse(todoListJson) : null;
  }

  onCheckboxChange(item: ToDo): void {
    item.is_completed = !item.is_completed;
    this.updateProgress();
  }

  updateProgress(){
    const TodoList = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', TodoList);
  }

  sendSelectionToHome(){
    this.selection.emit("add_todo");
  }
}
