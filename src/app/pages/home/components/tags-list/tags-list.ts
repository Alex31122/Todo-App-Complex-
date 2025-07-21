import { Component, inject} from '@angular/core';
import { TodoService } from '../../service/todo-service';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css'
})
export class TagsList{
  todoService = inject(TodoService);
  sendSelectionToService(){
    this.todoService._selectionObservable.next("add_tag");
  }
}
