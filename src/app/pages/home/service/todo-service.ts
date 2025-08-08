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
  tagsList: Tag[] = [
    new Tag({name: "Work", color: "#b1dbfe"}),
    new Tag({name: "Personal", color: "#fdb1ba"}),
    new Tag({name: "HouseHold", color: "#bbaeff"}),
    new Tag({name: "Business", color: "#b3faad"})
];
  date: Date = new Date();
  dateString: string = this.date.toDateString();
  _selectionObservable = new Subject<string>();
  _editIndexObservable = new Subject<number>();

  private _currentList = new BehaviorSubject<ToDo[]>([]);
  public currentList$: Observable<ToDo[]> = this._currentList.asObservable();

  constructor() {
    this.fetchTagsList();
    this.fetchTodoList();
    this.date.setHours(0, 0 ,0, 0);
  }

  fetchTodoList(){
    // localStorage.removeItem('todoList');
    // localStorage.removeItem('tagsList');
    const todoListJson: string | null = localStorage.getItem('todoList');
    if(todoListJson){
      this.todoList = JSON.parse(todoListJson);
      this.todoList.map(todo => todo.due_date = new Date(todo.due_date_string));

      this.filteredTodoList = this.todoList;
      this._currentList.next(this.filteredTodoList);

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

  updateCurrentView(message: string): void {
    switch(message){
      case "all-task-view":
        this.filteredTodoList = this.todoList;
        break;
      case "important-view":
        this.filteredTodoList = this.todoList.filter(s => s.is_important == true);
        break;
      case "this_week":
        this.filterByThisWeek();
        break;
      case "over_due":
        this.filterByOverDue();
        break;
      default:
        this.filteredTodoList = this.todoList;
    }
    this._currentList.next(this.filteredTodoList);
    console.log(`[DataService] Message updated to: "${message}"`);
  }

  filterByOverDue(){
    console.log("YOU SELECTED OVER DUE");
    let tempList = [];
    for (const element of this.todoList) {
      element.due_date.setHours(0, 0, 0, 0);
      if(element.due_date.getTime() < this.date.getTime()){
        tempList.push(element);
      }
    }
    // this.filteredTodoList = this.todoList.filter(s => s.due_date.getTime < this.date.getTime);
    this.filteredTodoList = tempList;
  }

  filterByThisWeek(){
    console.log("YOU SELECTED THIS WEEK");
    const today = new Date();
    const dayOfWeek = today.getDay();
    let firstDayOfWeek = today;
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
    let lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
    let tempList = [];
    for (const element of this.todoList) {
      if(element.due_date.getDate() >= firstDayOfWeek.getDate() && element.due_date.getDate() < lastDayOfWeek.getDate()){
        tempList.push(element);
      }
    }
    this.filteredTodoList = tempList;
    // this.todoList = this.todoList.filter(s => s.due_date.getDate >= firstDayOfWeek.getDate && s.due_date.getDate <= lastDayOfWeek.getDate);
  }
}
