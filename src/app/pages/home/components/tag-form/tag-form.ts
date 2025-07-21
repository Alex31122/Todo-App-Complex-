import { TodoService } from './../../service/todo-service';
import { Component, inject} from '@angular/core';
import { FormControl, ReactiveFormsModule, NgForm, FormsModule} from '@angular/forms';
import { Tag } from '../../models/tagModel';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './tag-form.html',
  styleUrl: './tag-form.css'
})
export class TagForm {
  todoService = inject(TodoService);
  onSubmit(formData: NgForm) {
    if(formData.valid){
      const newTag = new Tag(formData.value);
      this.todoService.tagsList.push(newTag);
      this.todoService.addTagsListToLocalStorage(this.todoService.tagsList);
      formData.resetForm();
    }
    else{
      console.log("El Formulario no es valido");
    }
  }
}
