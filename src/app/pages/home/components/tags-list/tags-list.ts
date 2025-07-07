import { Component } from '@angular/core';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css'
})
export class TagsList {
  tagsList: string[] = [];
  tagsListJson = localStorage.getItem('tagsList');
  constructor(){
    if(this.tagsListJson){
      this.tagsList = JSON.parse(this.tagsListJson);
    }else{
      this.tagsList.push("home");
      this.tagsList.push("work");
      this.addTagsListToLocalStorage();
    }
  }
  addTagsListToLocalStorage(){
    const tagsList = JSON.stringify(this.tagsList);
    localStorage.setItem('tagsList', tagsList);
  }
}
