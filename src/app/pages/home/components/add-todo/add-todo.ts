import { Component } from '@angular/core';
import { ToDo } from '../../models/todoModel';

@Component({
  selector: 'app-add-todo',
  imports: [],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css'
})
export class AddTodo {
  todo = new ToDo();
  constructor(){
    this.todo = this.addTodo("Make a commit", "Do a github commit to work remotely", "work");
    console.log(this.todo);
  }
  
  addTodo(name: string, description: string, type: string): ToDo {
    const newTodo: ToDo = new ToDo( {name, description, type} );
    // const id = crypto.randomUUID(); // Generar un ID único
    // this.allTodos.push(newTodo);
    // this.filteredTodos.push(newTodo);

    // this.todoMap.set(id, newTodo); // Añadir al mapa para acceso rápid
    return newTodo;
  }

}
