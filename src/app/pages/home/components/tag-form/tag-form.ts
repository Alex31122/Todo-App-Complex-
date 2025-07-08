import { TodoService } from './../../service/todo-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, NgForm, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './tag-form.html',
  styleUrl: './tag-form.css'
})
export class TagForm implements OnInit{
  tagsList: string[] = [];
  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.tagsList = this.todoService.fetchTagsList();
  }

  onSubmit(formData: NgForm) {
    this.tagsList.push(formData.value.name);
    this.todoService.addTagsListToLocalStorage(this.tagsList);
  }

}
