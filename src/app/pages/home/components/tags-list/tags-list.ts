import { Component, OnInit, output } from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { Tag } from '../../models/tagModel';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css'
})
export class TagsList implements OnInit{
  tagsList: Tag[] = [];
  add_tag_selection = output<string>();
  constructor(private todoService: TodoService){}
  colorDesdeTS: string = 'red';

  cambiarColor() {
    this.colorDesdeTS = this.colorDesdeTS === 'blue' ? 'red' : 'blue';
  }
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
