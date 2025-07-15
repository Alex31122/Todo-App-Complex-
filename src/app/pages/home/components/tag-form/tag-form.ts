import { TodoService } from './../../service/todo-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, NgForm, FormsModule} from '@angular/forms';
import { Tag } from '../../models/tagModel';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './tag-form.html',
  styleUrl: './tag-form.css'
})
export class TagForm implements OnInit{
  tagsList: Tag[] = [];
  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.setTagsList();
  }

  onSubmit(formData: NgForm) {
    if(formData.valid){
      const newTag = new Tag(formData.value.name);
      this.tagsList.push(newTag);
      this.todoService.addTagsListToLocalStorage(this.tagsList);
      formData.resetForm();
    }
    else{
      console.log("El Formulario no es valido");
    }
  }

  setTagsList(){
    this.tagsList = this.todoService.tagsList;
  }

}
