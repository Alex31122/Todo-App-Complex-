import { Injectable } from '@angular/core';
import { ToDo } from '../models/todoModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Tag } from '../models/tagModel';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: ToDo[] = [];
  filteredTodoList: ToDo[] = [];
  holaList: ToDo[] = [];
  tagsList: Tag[] = [];
  date: Date = new Date();
  dateString: string = this.date.toDateString();
  _selectionObservable = new Subject<string>();
  _editIndexObservable = new Subject<number>();

  private _listaActual = new BehaviorSubject<ToDo[]>([]);
  public listaActual$: Observable<ToDo[]> = this._listaActual.asObservable();
  constructor() {
    this.addTagToList("home");
    this.addTagToList("work");
    this.fetchTagsList();
    this.fetchTodoList();
    if(!this.todoList){
      this.addTagsListToLocalStorage(this.tagsList);
    }
    this.date.setHours(0, 0 ,0, 0);
  }

  addTagToList(name: string){
    const  tag = new Tag();
    tag.name = name;
    this.tagsList.push(tag);
  }

  fetchTodoList(){
    // localStorage.removeItem('todoList');
    // localStorage.removeItem('tagsList');
    const todoListJson: string | null = localStorage.getItem('todoList');
    if(todoListJson){
      this.todoList = JSON.parse(todoListJson);
      this.todoList.map(todo => todo.due_date = new Date(todo.due_date_string));

      this.filteredTodoList = this.todoList;
      this._listaActual.next(this.filteredTodoList);

      console.log("To-Do List on local Storage fetched using a service");
      console.log(this.todoList);
    }
  }

  fetchTagsList(){
    const tagsListJson: string | null = localStorage.getItem('tagsList');
    if(tagsListJson){
      this.tagsList = JSON.parse(tagsListJson);
      console.log("Tags List on local Storage fetcher using a service");
      console.log(this.tagsList);
    }else{
      this.addTagsListToLocalStorage(this.tagsList);
    }
  }

  addTodoListToLocalStorage(todoList: ToDo[]){
    const TodoListJson: string = JSON.stringify(todoList);
    localStorage.setItem('todoList', TodoListJson);
  }

  addTagsListToLocalStorage(tagsList: Tag[]){
    const tagsListJson = JSON.stringify(tagsList);
    localStorage.setItem('tagsList', tagsListJson);
    this.tagsList = tagsList;
  }

  actualizarMensaje(nuevoMensaje: string): void {
    if(nuevoMensaje == 'all-tasks-view'){
      this.filteredTodoList = this.todoList;
    }
    if(nuevoMensaje == 'important-view'){
      this.filteredTodoList = this.todoList.filter(s => s.is_important == true);
    }
    if(nuevoMensaje == 'over_due'){
      console.log("YOU SELECTED OVER DUE");
      this.holaList = [];
      for (const element of this.todoList) {
        console.log(element.due_date);
        console.log(this.date);
        element.due_date.setHours(0, 0, 0, 0);
        if(element.due_date.getTime() < this.date.getTime()){
          this.holaList.push(element);
        }
      }
      // this.filteredTodoList = this.todoList.filter(s => s.due_date.getTime < this.date.getTime);
      this.filteredTodoList = this.holaList;
    }
    if(nuevoMensaje == 'this_week'){
      console.log("YOU SELECTED THIS WEEK");
      const today = new Date();
      const dayOfWeek = today.getDay();
      let firstDayOfWeek = today;
      firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
      let lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
      this.holaList = [];
      for (const element of this.todoList) {
        if(element.due_date.getDate() >= firstDayOfWeek.getDate() && element.due_date.getDate() < lastDayOfWeek.getDate()){
          this.holaList.push(element);
        }
      }
      this.filteredTodoList = this.holaList;
      // this.todoList = this.todoList.filter(s => s.due_date.getDate >= firstDayOfWeek.getDate && s.due_date.getDate <= lastDayOfWeek.getDate);
    }
    this._listaActual.next(this.filteredTodoList);
    console.log(`[DataService] Mensaje actualizado a: "${nuevoMensaje}"`);
  }

}
