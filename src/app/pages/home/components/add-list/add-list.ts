import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  imports: [ReactiveFormsModule],
  templateUrl: './add-list.html',
  styleUrl: './add-list.css'
})
export class AddList {
  tagsList: string[] = [];
  name = new FormControl('');
  tagsListJson = localStorage.getItem('tagsList');

  constructor(){
    // localStorage.removeItem('todoList');
    if(this.tagsListJson){
      this.tagsList = JSON.parse(this.tagsListJson);
      console.log("Tags List on local Storage");
      console.log(this.tagsList);
    }
  }

    addTagToTodoList(name: string){
      this.tagsList.push(name);
      this.addTagsListToLocalStorage();
    }

    addTagsListToLocalStorage(){
      const tagsList = JSON.stringify(this.tagsList);
      localStorage.setItem('tagsList', tagsList);
    }
}
