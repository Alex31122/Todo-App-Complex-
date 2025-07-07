import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.html',
  styleUrl: './tag-form.css'
})
export class TagForm implements OnInit{
  tagsList: string[] = [];
  name = new FormControl('');
  tagsListJson = localStorage.getItem('tagsList');

  ngOnInit(){
    // localStorage.removeItem('todoList');
    if(this.tagsListJson){
      this.tagsList = JSON.parse(this.tagsListJson);
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
