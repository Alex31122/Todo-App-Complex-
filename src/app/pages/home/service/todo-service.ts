import { TagsList } from './../components/tags-list/tags-list';
import { Injectable } from '@angular/core';
import { ToDo } from '../models/todoModel';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: ToDo[] = [];
  tagsList: string[] = ['home', 'study'];

  constructor() { }

  fetchTodoList(){
    // localStorage.removeItem('todoList');
    // localStorage.removeItem('tagsList');
    const todoListJson: string | null = localStorage.getItem('todoList');
    if(todoListJson){
      this.todoList = JSON.parse(todoListJson);
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
    }
  }

  addTodoListToLocalStorage(todoList: ToDo[]){
    const TodoListJson: string = JSON.stringify(todoList);
    localStorage.setItem('todoList', TodoListJson);
  }
  
  addTagsListToLocalStorage(tagsList: string[]){
    const tagsListJson = JSON.stringify(tagsList);
    localStorage.setItem('tagsList', tagsListJson);
    this.tagsList = tagsList;
  }

}
