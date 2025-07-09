import { Component, OnInit, output } from '@angular/core';
import { TodoService } from '../../service/todo-service';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css'
})
export class TagsList implements OnInit{
  tagsList: string[] = [];
  add_tag_selection = output<string>();
  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.setTagsList();
  }
  
  setTagsList(){
    this.tagsList = this.todoService.tagsList;
  }

  sendSelectionToSidebar(){
    this.add_tag_selection.emit("add_tag");
  }
}
