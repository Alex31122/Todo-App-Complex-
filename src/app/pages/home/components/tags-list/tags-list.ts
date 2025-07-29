import { Component, inject} from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { Tag } from '../../models/tagModel';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css'
})
export class TagsList{
  todoService = inject(TodoService);
  sendSelectionToService(message: string, tag?: Tag){
    this.todoService._selectionObservable.next(message);    
    if(message == "edit_tag" && tag){
      const index = this.todoService.tagsList.findIndex(tag2 => tag2.name == tag.name); 
      this.todoService._editIndexObservable.next(index);
    }
  }
}
